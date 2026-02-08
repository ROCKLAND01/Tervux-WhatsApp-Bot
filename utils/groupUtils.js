/**
 * Helper: Get group metadata (cached if possible, but for now direct)
 */
export async function getGroupMetadata(sock, groupJid) {
    try {
        return await sock.groupMetadata(groupJid);
    } catch (e) {
        console.error("❌ Failed to get group metadata:", e.message);
        return null;
    }
}

/**
 * Helper: Check if user is group admin
 */
export async function isAdmin(sock, groupJid, userJid) {
    try {
        const metadata = await getGroupMetadata(sock, groupJid);
        if (!metadata) {
            console.log("❌ isAdmin: No metadata found for group", groupJid);
            return false;
        }

        const admins = metadata.participants
            .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
            .map(p => p.id);

        // Exact match check
        let isUserAdmin = admins.includes(userJid);

        // Fuzzy match check (handle :12@s.whatsapp.net vs @s.whatsapp.net)
        if (!isUserAdmin) {
            const cleanUserJid = userJid.split(":")[0].split("@")[0];
            const found = admins.find(a => a.startsWith(cleanUserJid));
            if (found) {
                console.log(`⚠️ isAdmin: JID mismatch but found fuzzy match. Input: ${userJid}, Found: ${found}`);
                isUserAdmin = true;
            } else {
                // console.log(`ℹ️ isAdmin: User ${userJid} is NOT admin. Admins:`, admins); // Too noisy usually
            }
        }

        return isUserAdmin;
    } catch (e) {
        console.error("❌ isAdmin Error:", e);
        return false;
    }
}

/**
 * Helper: Check if bot is group admin
 */
export async function isBotAdmin(sock, groupJid) {
    try {
        // Handle different JID formats from sock.user
        const rawId = sock.user?.id || "";
        const botNumber = rawId.split(":")[0].split("@")[0];
        const botJid = `${botNumber}@s.whatsapp.net`;

        console.log(`🔍 Checking isBotAdmin: BotJID=${botJid}, Group=${groupJid}`);

        return await isAdmin(sock, groupJid, botJid);
    } catch (e) {
        console.error("❌ isBotAdmin Error:", e);
        return false;
    }
}
