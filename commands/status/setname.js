export const setname = async (sock, m, args) => {
    const name = args.join(" ");
    if (!name) return "❌ Please provide the new name.";

    try {
        await sock.updateProfileName(name);
        return "✅ Profile name updated successfully!";
    } catch (error) {
        return "❌ Failed to update name.";
    }
};
