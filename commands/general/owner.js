export const owner = async (sock, m, args) => {
    const ownerId = sock.user.id.split("@")[0].split(":")[0].replace(/\D/g, "");
    const ownerName = sock.user.name || "Tervux User";

    return `
👑 *BOT OWNER INFORMATION*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${ownerName}
📱 *Number:* @${ownerId}

_This bot is currently running under this authorized session._
━━━━━━━━━━━━━━━━━━━━
    `;
};
