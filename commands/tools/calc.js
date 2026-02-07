export const calc = async (sock, m, args) => {
    const expression = args.join("");
    if (!expression) return "💡 Usage: !calc [expression]\nExample: !calc 5 * (10 + 2)";

    try {
        // Basic sanitization to allow only math-related characters
        if (/[^-+/*().0-9 ]/g.test(expression)) {
            return "❌ Invalid characters in expression. Use only numbers and + - * / ( )";
        }

        // Use Function instead of eval for a slightly safer (though still restricted) execution
        const result = new Function(`return ${expression}`)();

        return `🔢 *CALCULATOR*\n━━━━━━━━━━━━━━━━━━━━\n📝 *Exp:* ${expression}\n✅ *Result:* ${result}\n━━━━━━━━━━━━━━━━━━━━`;
    } catch (err) {
        return "❌ Calculation error. Check your expression.";
    }
};
