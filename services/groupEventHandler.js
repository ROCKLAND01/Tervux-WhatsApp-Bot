import { loadGroupSettings, saveGroupSettings } from "./groupSettingsService.js";
import { isAdmin, isBotAdmin, getGroupMetadata } from "../utils/groupUtils.js";

/**
 * Handle Group Participants Update (Welcome/Goodbye)
 */
export async function handleGroupParticipantsUpdate(sock, update) {
    const { id, participants, action } = update;

    // Only handle add/remove
    if (action !== "add" && action !== "remove") return;

    try {
        const settings = loadGroupSettings(id);
        const metadata = await getGroupMetadata(sock, id);
        const groupName = metadata?.subject || "Group";
        const desc = metadata?.desc?.toString() || "";

        for (const participant of participants) {
            let messageText = "";
            let isWelcome = false;

            if (action === "add" && settings.welcome.enabled) {
                messageText = settings.welcome.message;
                isWelcome = true;
            } else if (action === "remove" && settings.goodbye.enabled) {
                messageText = settings.goodbye.message;
            }

            if (messageText) {
                // Replace placeholders
                const user = `@${participant.split("@")[0]}`;
                const count = metadata?.participants?.length || "?";

                messageText = messageText
                    .replace(/{group}/g, groupName)
                    .replace(/{desc}/g, desc)
                    .replace(/{count}/g, count)
                    .replace(/@user/g, user);

                // Send message
                await sock.sendMessage(id, {
                    text: messageText,
                    mentions: [participant]
                });
                console.log(`📢 Sent ${isWelcome ? 'Welcome' : 'Goodbye'} message to ${id}`);
            }
        }
    } catch (err) {
        console.error("Error handling group participants update:", err.message);
    }
}

/**
 * Handle Group Messages (Antilink, Antispam)
 */
export async function handleGroupMessage(sock, m) {
    if (!m.message || m.key.fromMe) return;

    const remoteJid = m.key.remoteJid;
    if (!remoteJid.endsWith("@g.us")) return;

    const settings = loadGroupSettings(remoteJid);

    // 1. Antilink Check
    if (settings.antilink?.enabled) {
        const msgText = m.message.conversation ||
            m.message.extendedTextMessage?.text ||
            m.message.imageMessage?.caption || "";

        // Check for WhatsApp links
        if (msgText.includes("chat.whatsapp.com")) {
            // Check if sender is admin (exempt)
            const sender = m.key.participant;
            const senderIsAdmin = await isAdmin(sock, remoteJid, sender);

            if (!senderIsAdmin) {
                console.log(`🛡️ Antilink triggered for ${sender} in ${remoteJid}`);

                // Delete message
                await sock.sendMessage(remoteJid, { delete: m.key });

                // Check action
                if (settings.antilink.action === "kick") {
                    if (await isBotAdmin(sock, remoteJid)) {
                        await sock.groupParticipantsUpdate(remoteJid, [sender], "remove");
                        await sock.sendMessage(remoteJid, {
                            text: `🚫 *Link Detected!* @${sender.split("@")[0]} has been kicked.`,
                            mentions: [sender]
                        });
                    } else {
                        await sock.sendMessage(remoteJid, {
                            text: `🚫 *Link Detected!* I need admin privileges to kick users.`
                        });
                    }
                } else {
                    // Just warn
                    await sock.sendMessage(remoteJid, {
                        text: `⚠️ @${sender.split("@")[0]}, links are not allowed in this group!`,
                        mentions: [sender]
                    });
                }
                return true; // Stop processing command/other things
            }
        }
    }

    // 2. Antispam (basic placeholder for now)
    // if (settings.antispam?.enabled) { ... }

    return false; // Continue processing
}
