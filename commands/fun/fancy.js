export const fancy = async (sock, m, args) => {
    const text = args.join(" ");
    if (!text) return "💡 Usage: !fancy [your text]\nExample: !fancy Tervux Bot";

    const styles = {
        bubble: (t) => {
            const map = "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ";
            const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            return t.split("").map(c => chars.indexOf(c) > -1 ? map[chars.indexOf(c)] : c).join("");
        },
        square: (t) => {
            const map = "🄰🄱🄲🄳🄴🄵🄿🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🄰🄱🄲🄳🄴🄵🄿🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉";
            const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            return t.split("").map(c => chars.indexOf(c) > -1 ? map[chars.indexOf(c)] : c).join("");
        },
        script: (t) => {
            const map = "𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵";
            const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            return t.split("").map(c => chars.indexOf(c) > -1 ? map[chars.indexOf(c)] : c).join("");
        }
    };

    let response = `✨ *FANCY TEXT STYLES* ✨\n\n`;
    response += `*Bubble:* ${styles.bubble(text)}\n\n`;
    response += `*Square:* ${styles.square(text)}\n\n`;
    response += `*Script:* ${styles.script(text)}\n\n`;
    response += `_Copy and paste your favorite!_`;

    return response;
};
