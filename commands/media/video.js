import yts from "yt-search";
import axios from "axios";

export const video = async (sock, m, args) => {
    const query = args.join(" ");
    if (!query) {
        return `╔══════════════════════════════════╗
║    📹 *𝕋𝔼ℝ𝕍𝕌𝕏 𝕍𝕀𝔻𝔼𝕆* 📹          ║
╚══════════════════════════════════╝

📝 *𝕌𝕤𝕒𝕘𝕖:* !video [video name]
📌 *𝔼𝕩𝕒𝕞𝕡𝕝𝕖:* !video funny cats

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Download videos instantly! 🎬`;
    }

    try {
        const search = await yts(query);
        const vid = search.videos[0];

        if (!vid) {
            return `╔══════════════════════════════════╗
║       ❌ *ℕ𝕆𝕋 𝔽𝕆𝕌ℕ𝔻* ❌          ║
╚══════════════════════════════════╝

Video not found.
Try a different search term.`;
        }

        const message = `╔══════════════════════════════════╗
║    📹 *𝕍𝕀𝔻𝔼𝕆 𝔻𝕆𝕎ℕ𝕃𝕆𝔸𝔻* 📹        ║
╚══════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *𝕍𝕀𝔻𝔼𝕆 𝕀ℕ𝔽𝕆*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 *𝕋𝕚𝕥𝕝𝕖:* ${vid.title}
⏱️ *𝔻𝕦𝕣𝕒𝕥𝕚𝕠𝕟:* ${vid.timestamp}
👀 *𝕍𝕚𝕖𝕨𝕤:* ${vid.views}
🔗 *𝕃𝕚𝕟𝕜:* ${vid.url}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_Downloading video... please wait._ ⏳`;

        // SAFE MEDIA DELIVERY
        let thumbBuffer;
        try {
            const res = await axios.get(vid.thumbnail, { responseType: 'arraybuffer', timeout: 5000 });
            thumbBuffer = Buffer.from(res.data);
        } catch (e) {
            console.warn("Video thumbnail download failed.");
        }

        const sentMsg = await sock.sendMessage(m.key.remoteJid, {
            ...(thumbBuffer ? { image: thumbBuffer } : { text: message }),
            ...(thumbBuffer ? { caption: message } : {}),
            linkPreview: null
        }, { quoted: m });

        const impressiveEmojis = ["🦁", "🐯", "🐼", "🦊", "🦄", "🦅", "🦉", "🦋", "🐞", "🌲", "🌵", "🌸", "🌺", "🍁", "🍄", "🌴", "🍓", "🥑", "🍕", "🌮", "🍣", "🍩", "🧊", "🪐", "🚀", "🌠", "🌙", "⚡", "🔥", "🌈", "💎", "🔮"];
        const randomEmoji = impressiveEmojis[Math.floor(Math.random() * impressiveEmojis.length)];
        if (sentMsg?.key) {
            await sock.sendMessage(m.key.remoteJid, { react: { text: randomEmoji, key: sentMsg.key } });
        }

        // Try download
        try {
            const apiUrl = `https://widipe.com/download/yts?url=${encodeURIComponent(vid.url)}`;
            const response = await axios.get(apiUrl, { timeout: 60000 });

            let dlUrl = response.data?.result?.mp4;

            if (!dlUrl) {
                const fUrl = `https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(vid.url)}`;
                const fRes = await axios.get(fUrl, { timeout: 60000 });
                dlUrl = fRes.data?.result?.download;
            }

            if (!dlUrl) throw new Error("No download URL found");

            const videoBuffer = await axios.get(dlUrl, {
                responseType: 'arraybuffer',
                timeout: 120000,
                maxContentLength: 50 * 1024 * 1024
            });

            await sock.sendMessage(m.key.remoteJid, {
                video: Buffer.from(videoBuffer.data),
                caption: vid.title,
                mimetype: 'video/mp4'
            }, { quoted: m });

        } catch (downloadErr) {
            console.error("Video download failed:", downloadErr.message);
            await sock.sendMessage(m.key.remoteJid, {
                text: `╔══════════════════════════════════╗
║        ❌ *𝔼ℝℝ𝕆ℝ* ❌             ║
╚══════════════════════════════════╝

⚠️ *Download failed:*
The video is too large or server busy.
👇 Please watch using the link above.`
            }, { quoted: m });
        }

    } catch (err) {
        console.error("Video error:", err.message);
        return `╔══════════════════════════════════╗
║         ❌ *𝔼ℝℝ𝕆ℝ* ❌            ║
╚══════════════════════════════════╝

Failed to process video request.`;
    }
};
