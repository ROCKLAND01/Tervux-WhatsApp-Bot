import axios from "axios";

export const translate = async (sock, m, args) => {
    let targetLang = "en";
    let textToTranslate;

    // 1. Handle command-line arguments for target language
    if (args[0] && args[0].startsWith("--")) {
        targetLang = args[0].replace("--", "");
        textToTranslate = args.slice(1).join(" ");
    } else {
        textToTranslate = args.join(" ");
    }

    // 2. Handle Quoted Message (Contextual Translation)
    const contextInfo = m.message?.extendedTextMessage?.contextInfo || m.message?.imageMessage?.contextInfo || m.message?.videoMessage?.contextInfo;
    const quoted = contextInfo?.quotedMessage;

    if (!textToTranslate && quoted) {
        textToTranslate = quoted.conversation || quoted.extendedTextMessage?.text || quoted.imageMessage?.caption || quoted.videoMessage?.caption;
    }

    if (!textToTranslate) return "💡 Usage: !translate [text] OR !translate --[lang] [text]\nExample: !translate --fr Hello\n_Or reply to a message with !translate_";

    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(textToTranslate)}`;
        const { data } = await axios.get(url);

        if (!data || !data[0]) throw new Error("Invalid response");

        // Google Translate API returns an array of phrases. We join them.
        const translatedText = data[0].map(item => item[0]).filter(Boolean).join("");

        return `🌐 *TRANSLATION*
━━━━━━━━━━━━━━━━━━━━
📥 *Original:* ${textToTranslate}
📤 *Translated (${targetLang}):* ${translatedText}
━━━━━━━━━━━━━━━━━━━━`;
    } catch (err) {
        console.error("Translation error:", err.message);
        return "❌ Translation failed. Service might be temporarily unavailable.";
    }
};
