import yts from "yt-search";
import axios from "axios";

export const video = async (sock, m, args) => {
    const query = args.join(" ");
    if (!query) return "💡 Usage: !video [video name]\nExample: !video funny cats";

    try {
        const search = await yts(query);
        const vid = search.videos[0];

        if (!vid) return "❌ Video not found.";

        const message = `
📹 *VIDEO DOWNLOADER*
━━━━━━━━━━━━━━━━━━━━
📌 *Title:* ${vid.title}
⏱️ *Duration:* ${vid.timestamp}
👀 *Views:* ${vid.views}
🔗 *Link:* ${vid.url}
━━━━━━━━━━━━━━━━━━━━
_Downloading video... please wait._
        `;

        const thinLine = "─── · 。ﾟ☆: *.☽ .* :☆ﾟ. ───";
        const footerText = `\n\n${thinLine}\n   💠 *Powered by Tervux Company*\n   🔗 https://tervux.vercel.app`;

        // SAFE MEDIA DELIVERY: Download thumbnail ourselves
        let thumbBuffer;
        try {
            const res = await axios.get(vid.thumbnail, { responseType: 'arraybuffer', timeout: 5000 });
            thumbBuffer = Buffer.from(res.data);
        } catch (e) {
            console.warn("Video thumbnail download failed.");
        }

        const sentMsg = await sock.sendMessage(m.key.remoteJid, {
            ...(thumbBuffer ? { image: thumbBuffer } : { text: message }),
            ...(thumbBuffer ? { caption: message + footerText } : {}),
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
                caption: vid.title + footerText,
                mimetype: 'video/mp4'
            }, { quoted: m });

        } catch (downloadErr) {
            console.error("Video download failed:", downloadErr.message);
            await sock.sendMessage(m.key.remoteJid, {
                text: "⚠️ *Download failed:* The video is too large or the server is busy.\n👇 Please watch using the link above."
            }, { quoted: m });
        }

    } catch (err) {
        console.error("Video error:", err.message);
        return "❌ Failed to process video request.";
    }
};
