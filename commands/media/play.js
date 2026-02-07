import yts from "yt-search";
import axios from "axios";

export const play = async (sock, m, args) => {
    const query = args.join(" ");
    if (!query) return "💡 Usage: !play [song name]\nExample: !play Burna Boy Last Last";

    try {
        const search = await yts(query);
        const video = search.videos[0];

        if (!video) return "❌ Song not found.";

        const message = `
🎵 *PLAYING MUSIC*
━━━━━━━━━━━━━━━━━━━━
📌 *Title:* ${video.title}
⏱️ *Duration:* ${video.timestamp}
👀 *Views:* ${video.views}
🔗 *Link:* ${video.url}
━━━━━━━━━━━━━━━━━━━━
_Downloading audio... please wait._
        `;

        const thinLine = "─── · 。ﾟ☆: *.☽ .* :☆ﾟ. ───";
        const footerText = `\n\n${thinLine}\n   💠 *Powered by Tervux Company*\n   🔗 https://tervux.vercel.app`;

        // SAFE MEDIA DELIVERY: Download thumbnail ourselves to prevent Baileys/Undici fetch crashes
        let thumbnailBuffer;
        try {
            const thumbRes = await axios.get(video.thumbnail, { responseType: 'arraybuffer', timeout: 5000 });
            thumbnailBuffer = Buffer.from(thumbRes.data);
        } catch (e) {
            console.warn("Failed to download thumbnail, proceeding without it.");
        }

        const sentMsg = await sock.sendMessage(m.key.remoteJid, {
            ...(thumbnailBuffer ? { image: thumbnailBuffer } : { text: message }),
            ...(thumbnailBuffer ? { caption: message + footerText } : {}),
            linkPreview: null
        }, { quoted: m });

        // Auto-react
        const impressiveEmojis = ["🦁", "🐯", "🐼", "🦊", "🦄", "🦅", "🦉", "🦋", "🐞", "🌲", "🌵", "🌸", "🌺", "🍁", "🍄", "🌴", "🍓", "🥑", "🍕", "🌮", "🍣", "🍩", "🧊", "🪐", "🚀", "🌠", "🌙", "⚡", "🔥", "🌈", "💎", "🔮"];
        const randomEmoji = impressiveEmojis[Math.floor(Math.random() * impressiveEmojis.length)];
        if (sentMsg?.key) {
            await sock.sendMessage(m.key.remoteJid, { react: { text: randomEmoji, key: sentMsg.key } });
        }

        // Try to download audio
        try {
            const apiUrl = `https://widipe.com/download/yts?url=${encodeURIComponent(video.url)}`;
            const response = await axios.get(apiUrl, { timeout: 40000 });

            let downloadUrl = response.data?.result?.mp3;

            if (!downloadUrl) {
                const fbUrl = `https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(video.url)}`;
                const fbRes = await axios.get(fbUrl, { timeout: 40000 });
                downloadUrl = fbRes.data?.result?.download;
            }

            if (!downloadUrl) throw new Error("No download URL found");

            const audioBuffer = await axios.get(downloadUrl, { responseType: 'arraybuffer', timeout: 60000 });
            await sock.sendMessage(m.key.remoteJid, {
                audio: Buffer.from(audioBuffer.data),
                mimetype: 'audio/mpeg',
                fileName: `${video.title}.mp3`
            }, { quoted: m });

        } catch (downloadErr) {
            console.error("Audio download failed:", downloadErr.message);
            await sock.sendMessage(m.key.remoteJid, {
                text: "⚠️ *Download failed:* The song is too long or the server is busy.\n👇 Please use the link above to listen."
            }, { quoted: m });
        }

    } catch (err) {
        console.error("Play error:", err.message);
        return "❌ Failed to process music request.";
    }
};
