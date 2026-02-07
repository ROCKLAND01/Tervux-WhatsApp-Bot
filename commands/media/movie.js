import axios from "axios";

export const movie = async (sock, m, args) => {
    const query = args.join(" ");
    if (!query) return "💡 Usage: !movie [movie name]\nExample: !movie Avengers Endgame";

    try {
        // Primary API: PopCat
        const response = await axios.get(`https://api.popcat.xyz/movie?title=${encodeURIComponent(query)}`, { timeout: 15000 });
        const data = response.data;

        if (data && data.title && !data.error) {
            const message = `
🎬 *MOVIE INFORMATION*
━━━━━━━━━━━━━━━━━━━━
📌 *Title:* ${data.title}
📅 *Released:* ${data.released}
⏱️ *Runtime:* ${data.runtime}
🎭 *Genre:* ${data.genres}
🎬 *Director:* ${data.director}
⭐ *Rating:* ${data.rating}
🏆 *Awards:* ${data.awards}

📝 *Plot:* ${data.plot}
━━━━━━━━━━━━━━━━━━━━
            `;

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

        // Fallback API: OMDb (using a public key or mirror if available, here we try a search mirror)
        const fallbackRes = await axios.get(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(query)}`, { timeout: 15000 });
        if (fallbackRes.data && !fallbackRes.data.error) {
            const f = fallbackRes.data;
            return {
                image: { url: f.poster },
                caption: `🎬 *IMDB INFO*\n━━━━━━━━━━━━━━━━━━━━\n📌 *Title:* ${f.title}\n📅 *Year:* ${f.year}\n⭐ *Rating:* ${f.rating}\n⏱️ *Runtime:* ${f.runtime}\n🎭 *Genre:* ${f.genres}\n\n📝 *Plot:* ${f.plot}\n━━━━━━━━━━━━━━━━━━━━`
            };
        }

        return "❌ Movie not found.";
    } catch (err) {
        console.error("Movie error:", err.message);
        return "❌ Failed to fetch movie details. The database might be down.";
    }
};
