import axios from "axios";

export const movie = async (sock, m, args) => {
    const query = args.join(" ");
    if (!query) {
        return `╔══════════════════════════════════╗
║    🎬 *𝕋𝔼ℝ𝕍𝕌𝕏 𝕄𝕆𝕍𝕀𝔼𝕊* 🎬         ║
╚══════════════════════════════════╝

📝 *𝕌𝕤𝕒𝕘𝕖:* !movie [name]
📌 *𝔼𝕩𝕒𝕞𝕡𝕝𝕖:* !movie Avengers Endgame

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Search any movie from IMDB! 🎥`;
    }

    try {
        // Primary API: PopCat
        const response = await axios.get(`https://api.popcat.xyz/movie?title=${encodeURIComponent(query)}`, { timeout: 15000 });
        const data = response.data;

        if (data && data.title && !data.error) {
            const message = `╔══════════════════════════════════╗
║      🎬 *𝕄𝕆𝕍𝕀𝔼 𝕀ℕ𝔽𝕆* 🎬          ║
╚══════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *𝔻𝔼𝕋𝔸𝕀𝕃𝕊*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 *𝕋𝕚𝕥𝕝𝕖:* ${data.title}
📅 *ℝ𝕖𝕝𝕖𝕒𝕤𝕖𝕕:* ${data.released}
⏱️ *ℝ𝕦𝕟𝕥𝕚𝕞𝕖:* ${data.runtime}
🎭 *𝔾𝕖𝕟𝕣𝕖:* ${data.genres}
🎬 *𝔻𝕚𝕣𝕖𝕔𝕥𝕠𝕣:* ${data.director}
⭐ *ℝ𝕒𝕥𝕚𝕟𝕘:* ${data.rating} ⭐
🏆 *𝔸𝕨𝕒𝕣𝕕𝕤:* ${data.awards}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 *ℙ𝕃𝕆𝕋*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.plot}`;

            try {
                const posterRes = await axios.get(data.poster, { responseType: 'arraybuffer', timeout: 10000 });
                return {
                    image: Buffer.from(posterRes.data),
                    caption: message
                };
            } catch (e) {
                console.warn("Movie poster download failed, sending text:", e.message);
                return message;
            }
        }

        // Fallback API
        const fallbackRes = await axios.get(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(query)}`, { timeout: 15000 });
        if (fallbackRes.data && !fallbackRes.data.error) {
            const f = fallbackRes.data;
            return {
                image: { url: f.poster },
                caption: `╔══════════════════════════════════╗
║      🎬 *𝕀𝕄𝔻𝔹 𝕀ℕ𝔽𝕆* 🎬           ║
╚══════════════════════════════════╝

📌 *𝕋𝕚𝕥𝕝𝕖:* ${f.title}
📅 *𝕐𝕖𝕒𝕣:* ${f.year}
⭐ *ℝ𝕒𝕥𝕚𝕟𝕘:* ${f.rating}
⏱️ *ℝ𝕦𝕟𝕥𝕚𝕞𝕖:* ${f.runtime}
🎭 *𝔾𝕖𝕟𝕣𝕖:* ${f.genres}

📝 *ℙ𝕝𝕠𝕥:* ${f.plot}`
            };
        }

        return `╔══════════════════════════════════╗
║       ❌ *ℕ𝕆𝕋 𝔽𝕆𝕌ℕ𝔻* ❌          ║
╚══════════════════════════════════╝

Movie "${query}" not found.
Try a different search term.`;
    } catch (err) {
        console.error("Movie error:", err.message);
        return `╔══════════════════════════════════╗
║         ❌ *𝔼ℝℝ𝕆ℝ* ❌            ║
╚══════════════════════════════════╝

Failed to fetch movie details.
The database might be down.`;
    }
};
