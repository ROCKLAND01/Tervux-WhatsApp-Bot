
/**
 * Helper: Get group metadata (cached if possible, but for now direct)
 */
export async function getGroupMetadata(sock, groupJid) {
    try {
        return await sock.groupMetadata(groupJid);
    } catch {
        return null;
    }
}

/**
 * Helper: Check if user is group admin
 */
export async function isAdmin(sock, groupJid, userJid) {
    try {
        const metadata = await getGroupMetadata(sock, groupJid);
        if (!metadata) return false;

        const admins = metadata.participants
            .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
            .map(p => p.id);

        return admins.includes(userJid);
    } catch {
        return false;
    }
}

/**
 * Helper: Check if bot is group admin
 */
export async function isBotAdmin(sock, groupJid) {
    try {
        const botJid = sock.user?.id?.split(":")[0] + "@s.whatsapp.net";
        if (!botJid) return false;
        return await isAdmin(sock, groupJid, botJid);
    } catch {
        return false;
    }
}
