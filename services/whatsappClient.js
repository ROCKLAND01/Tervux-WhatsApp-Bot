import { default as makeWASocket, DisconnectReason, Browsers, useMultiFileAuthState } from "baileys";
import { existsSync, mkdirSync, rmSync, readFileSync } from "fs";
import { join } from "path";
import { commands } from "../commands/index.js";
import { getCachedConfig, updateConfig, invalidateConfigCache, AUTH_INFO_PATH } from "./configService.js";

export const messageCache = new Map();

// Memoized logo for efficiency
let logoBuffer = null;
try {
    logoBuffer = readFileSync(join(process.cwd(), "assets", "tervux-logo.png"));
} catch (e) {
    console.error("❌ Failed to load logo buffer:", e.message);
}

// Memory monitoring
setInterval(() => {
    const memory = process.memoryUsage();
    const rssMB = (memory.rss / 1024 / 1024).toFixed(1);
    const heapUsedMB = (memory.heapUsed / 1024 / 1024).toFixed(1);
    console.log(`📊 [Memory] RSS: ${rssMB}MB | Heap: ${heapUsedMB}MB`);

    if (memory.rss > 420 * 1024 * 1024 && global.gc) {
        console.warn(`🧹 CRITICAL: Memory RSS high. Triggering Manual GC...`);
        global.gc();
    }
}, 30000);

// Single client instance (single-user bot)
let activeClient = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;

export async function createWhatsAppClient() {
    // Use Baileys built-in file-based auth
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_INFO_PATH);

    console.log(`🔌 Creating WhatsApp socket...`);

    const sock = makeWASocket({
        auth: state,
        browser: Browsers.ubuntu("Chrome"),
        mobile: false,
        syncFullHistory: false,
        shouldSyncHistoryMessage: () => false,
        connectTimeoutMs: 120000,
        defaultQueryTimeoutMs: 90000,
        keepAliveIntervalMs: 30000,
        generateHighQualityLinkPreview: false,
        markOnlineOnConnect: false,
        msgRetryCounterCache: new Map(),
        retryRequestDelayMs: 2000,
        linkPreviewImageThumbnailWidth: 192,
        getMessage: async (key) => {
            const msg = messageCache.get(key.id);
            return msg?.message;
        }
    });

    sock.ev.on("creds.update", async () => {
        console.log(`💾 Credentials updated. Saving...`);
        await saveCreds();
    });

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log(`\n📱 Scan this QR code with WhatsApp to connect:\n`);
            // Simple ASCII QR representation - users can use external QR scanner
            import("qrcode-terminal").then(qrc => {
                qrc.generate(qr, { small: true });
            }).catch(() => {
                console.log(`QR Code: ${qr}`);
                console.log(`(Use an external QR generator if text is not rendering)`);
            });
        }

        if (connection === "connecting") {
            console.log(`🔌 Connecting to WhatsApp...`);
        }

        if (connection === "close") {
            if (sock.onlineInterval) clearInterval(sock.onlineInterval);

            const error = lastDisconnect?.error;
            const statusCode = error?.output?.statusCode;
            const errorMessage = error?.message || "";

            const isLoggedOut = statusCode === DisconnectReason.loggedOut;
            const isConflict = errorMessage.includes("conflict") ||
                statusCode === DisconnectReason.connectionReplaced;

            console.log(`❌ Connection closed. Code: ${statusCode}, Error: ${errorMessage}`);

            if (isLoggedOut) {
                console.log(`🔓 Logged out! Clearing session...`);
                try {
                    rmSync(AUTH_INFO_PATH, { recursive: true, force: true });
                    mkdirSync(AUTH_INFO_PATH, { recursive: true });
                } catch (e) {
                    console.error("Failed to clear auth:", e);
                }
                console.log(`📱 Please restart the bot and scan QR code again.`);
                reconnectAttempts = MAX_RECONNECT_ATTEMPTS; // Stop reconnection
            } else if (isConflict) {
                console.log(`⚠️ Session active on another device.`);
            } else if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                reconnectAttempts++;
                const delay = Math.min(5000 * Math.pow(1.5, reconnectAttempts), 60000);
                console.log(`🔄 Reconnecting in ${delay / 1000}s (Attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
                setTimeout(() => {
                    createWhatsAppClient().then(client => {
                        activeClient = client;
                    });
                }, delay);
            } else {
                console.log(`❌ Max reconnection attempts reached. Please restart manually.`);
            }
        }

        if (connection === "open") {
            console.log(`✅ WhatsApp connected successfully!`);
            reconnectAttempts = 0;

            // Update config with phone number
            const phoneNumber = sock.user?.id?.split(":")[0] || sock.user?.id?.split("@")[0];
            if (phoneNumber) {
                updateConfig({ phone: phoneNumber, name: sock.user?.name || "Bot User" });
                invalidateConfigCache();
            }

            // Send welcome message on first connect
            try {
                const config = getCachedConfig();
                const botJid = (sock.user.id.split("@")[0].split(":")[0]) + "@s.whatsapp.net";

                const welcomeMsg = `🎉 *Tervux Bot Connected!* 🎉

Your bot is now online and ready! 🚀

🤖 *Available Commands:*
• *!help* - Show all commands
• *!botstats* - Check system status
• *!alwaysonline on* - Stay online 24/7
• *!settings* - View/edit settings

💡 Type *!help* to see all available commands.

━━━━━━━━━━━━━━━━━━━━
    💠 *Powered by Tervux*`;

                await sock.sendMessage(botJid, { text: welcomeMsg });
                console.log(`📬 Welcome message sent!`);
            } catch (e) {
                console.error("Failed to send welcome:", e.message);
            }

            // Always Online heartbeat
            if (sock.onlineInterval) clearInterval(sock.onlineInterval);
            sock.onlineInterval = setInterval(async () => {
                const config = getCachedConfig();
                if (config.alwaysOnline && sock.ws?.readyState === 1) {
                    try {
                        await sock.sendPresenceUpdate("available");
                    } catch (e) { }
                }
            }, 30000);
        }
    });

    // Anti-Call Logic
    sock.ev.on("call", async (node) => {
        const config = getCachedConfig();
        if (config.antiCall) {
            for (const call of node) {
                if (call.status === "offer") {
                    try {
                        await sock.rejectCall(call.id, call.from);
                        await sock.sendMessage(call.from, {
                            text: "📵 *Tervux Bot*\n\nCalls are automatically rejected. Please send a text message instead."
                        });
                        console.log(`📵 Rejected call from ${call.from}`);
                    } catch (err) {
                        console.error("Anti-Call error:", err.message);
                    }
                }
            }
        }
    });

    // Status Auto-Actions
    sock.ev.on("messages.upsert", async ({ messages }) => {
        for (const m of messages) {
            // Status handling
            if (m.key.remoteJid === "status@broadcast" && !m.key.fromMe) {
                if (m.message?.protocolMessage || m.message?.reactionMessage) continue;

                const config = getCachedConfig();
                const participant = m.key.participant || m.participant;

                try {
                    if (config.autoViewStatus) {
                        await sock.readMessages([m.key]);
                    }

                    if (config.autoLikeStatus) {
                        const emojis = ["🦁", "🐯", "🦒", "🐘", "🦅", "🌲", "🌴", "⭐", "🌈", "🔥"];
                        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                        await sock.sendMessage(m.key.remoteJid, {
                            react: { text: randomEmoji, key: m.key }
                        }, { statusJidList: [participant] });
                    }
                } catch (err) {
                    console.error("Status Auto-Action Error:", err.message);
                }
            }
        }
    });

    // Anti-Delete Cache
    sock.ev.on("messages.upsert", async ({ messages }) => {
        for (const m of messages) {
            if (!m.message) continue;

            // Cache messages for anti-delete
            messageCache.set(m.key.id, m);

            // Limit cache size
            if (messageCache.size > 500) {
                const firstKey = messageCache.keys().next().value;
                messageCache.delete(firstKey);
            }
        }
    });

    // Anti-Delete Restoration
    sock.ev.on("messages.update", async (updates) => {
        const config = getCachedConfig();
        if (!config.antiDelete) return;

        for (const update of updates) {
            const protocolMsg = update.update?.protocolMessage ||
                update.update?.message?.protocolMessage;

            if (protocolMsg && (protocolMsg.type === 0 || protocolMsg.type === "REVOKE")) {
                const deletedId = protocolMsg.key?.id;
                const originalMsg = messageCache.get(deletedId);

                if (originalMsg) {
                    try {
                        const sender = originalMsg.key.participant || originalMsg.key.remoteJid;
                        const header = `🛡️ *ANTI-DELETE*\n\n👤 *Author:* @${sender.split("@")[0]}\n━━━━━━━━━━━━━━━━━━━━\n\n`;

                        let msgContent = originalMsg.message;
                        if (msgContent?.viewOnceMessage) msgContent = msgContent.viewOnceMessage.message;
                        if (msgContent?.viewOnceMessageV2) msgContent = msgContent.viewOnceMessageV2.message;

                        const type = Object.keys(msgContent || {})[0];
                        let restorationMsg;

                        if (type === "conversation" || type === "extendedTextMessage") {
                            const text = msgContent.conversation || msgContent.extendedTextMessage?.text || "";
                            restorationMsg = { text: header + text, mentions: [sender] };
                        } else {
                            restorationMsg = { forward: originalMsg, mentions: [sender] };
                        }

                        await sock.sendMessage(originalMsg.key.remoteJid, restorationMsg);
                        console.log(`🛡️ Restored deleted message: ${deletedId}`);
                    } catch (err) {
                        console.error("Anti-Delete Error:", err.message);
                    }
                }
            }
        }
    });

    // Command Handler
    sock.ev.on("messages.upsert", async ({ messages, type }) => {
        if (type !== "notify") return;

        for (const m of messages) {
            if (!m.message) continue;

            const messageText = m.message.conversation ||
                m.message.extendedTextMessage?.text ||
                m.message.imageMessage?.caption ||
                m.message.videoMessage?.caption || "";

            const config = getCachedConfig();
            const prefix = config.prefix || "!";

            if (!messageText.startsWith(prefix)) continue;

            // Only allow bot owner to use commands
            const senderJid = m.key.participant || m.key.remoteJid;
            const botJid = (sock.user?.id?.split("@")[0]?.split(":")[0]) + "@s.whatsapp.net";

            if (!m.key.fromMe && senderJid !== botJid) {
                await sock.sendMessage(m.key.remoteJid, {
                    text: `🚫 *Access Denied*\n\nThis bot is private. Only the owner can use commands.\n\n✨ *Want your own Tervux Bot?*\nFork it from GitHub and deploy your own!\n\n🔗 https://github.com/YOUR_REPO_HERE`
                }, { quoted: m });
                continue;
            }

            // Parse command
            const args = messageText.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            if (commands[commandName]) {
                try {
                    console.log(`⚡ Executing command: ${commandName}`);
                    const result = await commands[commandName](sock, m, args);

                    if (result) {
                        const footer = `\n\n━━━━━━━━━━━━━━━━━━━━\n    💠 *Powered by Tervux*`;

                        if (typeof result === "string") {
                            await sock.sendMessage(m.key.remoteJid, { text: result + footer });
                        } else if (typeof result === "object") {
                            if (result.caption) result.caption += footer;
                            else if (result.text) result.text += footer;
                            await sock.sendMessage(m.key.remoteJid, result);
                        }
                    }
                } catch (err) {
                    console.error(`❌ Command error (${commandName}):`, err.message);
                    await sock.sendMessage(m.key.remoteJid, {
                        text: `❌ Error executing command: ${err.message}`
                    });
                }
            }

            // Auto-read
            if (config.autoReadMessages && !m.key.fromMe) {
                sock.readMessages([m.key]).catch(() => { });
            }

            // Typing/Recording presence
            if (config.alwaysTyping && !m.key.fromMe) {
                sock.sendPresenceUpdate("composing", m.key.remoteJid).catch(() => { });
            } else if (config.alwaysRecording && !m.key.fromMe) {
                sock.sendPresenceUpdate("recording", m.key.remoteJid).catch(() => { });
            }
        }
    });

    activeClient = sock;
    return sock;
}

export function getClient() {
    return activeClient;
}

export function clearSession() {
    try {
        rmSync(AUTH_INFO_PATH, { recursive: true, force: true });
        mkdirSync(AUTH_INFO_PATH, { recursive: true });
        console.log(`🧹 Session cleared successfully!`);
        return true;
    } catch (e) {
        console.error("Failed to clear session:", e);
        return false;
    }
}
