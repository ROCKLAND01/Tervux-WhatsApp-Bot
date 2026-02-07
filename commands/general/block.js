export const block = async (sock, m, args) => {
    let target = m.key.remoteJid;

    if (m.key.remoteJid.endsWith("@g.us")) {
        if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            target = m.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (args[0]) {
            target = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        } else {
            return "❌ Please mention someone or provide a number in group chat.";
        }
    }

    try {
        await sock.updateBlockStatus(target, "block");
        return `🚫 Successfully blocked @${target.split("@")[0]}.`;
    } catch (error) {
        return "❌ Failed to block user.";
    }
};
