export const qr = async (sock, m, args) => {
    const text = args.join(" ");
    if (!text) return "💡 Usage: !qr [text/link]\nExample: !qr https://tervux.vercel.app";

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;

    try {
        return {
            image: { url: qrUrl },
            caption: `🖼️ *QR CODE GENERATED*\n━━━━━━━━━━━━━━━━━━━━\n📄 *Data:* ${text.length > 50 ? text.substring(0, 50) + "..." : text}\n━━━━━━━━━━━━━━━━━━━━`
        };
    } catch (err) {
        return "❌ Failed to generate QR code.";
    }
};
