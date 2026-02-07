import axios from "axios";

export const sport = async (sock, m, args) => {
    const team = args.join(" ");
    if (!team) return "💡 Usage: !sport [team name]\nExample: !sport Manchester United";

    try {
        console.log(`⚽ Searching for team: ${team}`);

        // TheSportsDB public API search
        const url = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(team)}`;
        const { data } = await axios.get(url, { timeout: 15000 });

        if (!data || !data.teams || data.teams.length === 0) {
            return `❌ Team *"${team}"* not found. Try a different name (e.g., "Man United" instead of "MU").`;
        }

        const t = data.teams[0];

        const message = `
⚽ *SPORTS TEAM INFO*
━━━━━━━━━━━━━━━━━━━━
📌 *Team:* ${t.strTeam}
🏟️ *Stadium:* ${t.strStadium || "N/A"}
🏆 *League:* ${t.strLeague}
🌍 *Country:* ${t.strCountry}
📅 *Founded:* ${t.intFormedYear}

📝 *Description:* ${t.strDescriptionEN ? t.strDescriptionEN.substring(0, 450) + "..." : "No description available."}
━━━━━━━━━━━━━━━━━━━━
        `.trim();

        // Download badge to buffer to avoid Baileys fetch crashes
        if (t.strTeamBadge) {
            try {
                const badgeRes = await axios.get(t.strTeamBadge, { responseType: 'arraybuffer', timeout: 10000 });
                return {
                    image: Buffer.from(badgeRes.data),
                    caption: message
                };
            } catch (imgErr) {
                console.warn("Failed to download sport badge:", imgErr.message);
                return message;
            }
        }

        return message;

    } catch (err) {
        console.error("Sport error:", err.message);
        return "❌ Failed to fetch sports details. The service might be down.";
    }
};
