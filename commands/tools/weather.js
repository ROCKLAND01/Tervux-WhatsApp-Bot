import axios from "axios";

export const weather = async (sock, m, args) => {
    const city = args.join(" ");
    if (!city) return "💡 Usage: !weather [city name]\nExample: !weather Nairobi";

    try {
        const response = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=%c+%t+%w+%h`, { timeout: 8000 });
        const data = response.data;

        if (data.includes("Unknown location")) return "❌ City not found.";

        // Basic parsing for wttr.in simple format
        // Expected: "☁️ +18°C ↙19km/h 68%"

        return `
🌍 *WEATHER REPORT: ${city.toUpperCase()}*
━━━━━━━━━━━━━━━━━━━━
${data.trim()}
━━━━━━━━━━━━━━━━━━━━
        `;
    } catch (err) {
        console.error("Weather error:", err.message);
        return "❌ Failed to fetch weather data. Network busy/timeout.";
    }
};
