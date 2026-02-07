export const setbio = async (sock, m, args) => {
    const bio = args.join(" ");
    if (!bio) return "❌ *Error:* Please provide the new biography text.\n\n_Example: !setbio Hello from Tervux_";

    try {
        await sock.updateProfileStatus(bio);
        return `✅ *Profile Bio Updated*\n\n*New Bio:* ${bio}`;
    } catch (error) {
        return "❌ *Failed:* Could not update profile bio at this time.";
    }
};
