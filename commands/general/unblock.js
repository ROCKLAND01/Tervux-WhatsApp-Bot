export const unblock = async (sock, m, args) => {
    let target = args[0] ? args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net" : null;

    if (!target) return "❌ Please provide a phone number to unblock.";

    try {
        await sock.updateBlockStatus(target, "unblock");
        return `✅ Successfully unblocked @${target.split("@")[0]}.`;
    } catch (error) {
        return "❌ Failed to unblock user.";
    }
};
