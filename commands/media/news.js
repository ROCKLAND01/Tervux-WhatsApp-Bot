import axios from "axios";

export const news = async (sock, m, args) => {
    try {
        // Primary API: Saurav Tech (NewsAPI wrapper)
        const response = await axios.get("https://saurav.tech/NewsAPI/top-headlines/category/general/us.json", { timeout: 10000 });
        const articles = response.data.articles;

        if (!articles || articles.length === 0) throw new Error("No articles found");

        let message = `📰 *LATEST WORLD NEWS*\n━━━━━━━━━━━━━━━━━━━━\n\n`;

        articles.slice(0, 5).forEach((item, i) => {
            message += `${i + 1}. *${item.title}*\n🔗 _${item.source.name}_\n\n`;
        });

        message += `━━━━━━━━━━━━━━━━━━━━\n_Stay informed with Tervux News_`;
        return {
            text: message,
            linkPreview: null
        };

    } catch (err) {
        console.error("Primary news API failed:", err.message);

        // Return a static fallback or try another source if available
        // For now, robust fallback message
        return `
📰 *NEWS UNAVAILABLE*
━━━━━━━━━━━━━━━━━━━━
⚠️ Unable to fetch live headlines due to network issues.
Please check:
1. Google News: https://news.google.com
2. BBC News: https://www.bbc.com/news
━━━━━━━━━━━━━━━━━━━━
        `;
    }
};
