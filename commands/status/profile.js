export const status = async (sock, m, args) => {
    const target = args[0] ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net" : m.key.remoteJid;

    try {
        const ppUrl = await sock.profilePictureUrl(target, "image").catch(() => null);
        const status = await sock.fetchStatus(target).catch(() => ({ status: "No status found" }));

        let response = `✨ *Status for ${target.split("@")[0]}*\n`;
        response += `📝 *About:* ${status.status || "N/A"}\n`;
        if (ppUrl) response += `🖼️ *Profile Link:* ${ppUrl}`;

        return response;
    } catch (error) {
        return "❌ Could not fetch status information.";
    }
};
