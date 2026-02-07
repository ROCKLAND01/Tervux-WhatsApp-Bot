export const botstats = async (sock, m, args) => {
    try {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

        const memory = process.memoryUsage();
        const rssMB = (memory.rss / 1024 / 1024).toFixed(1);
        const heapMB = (memory.heapUsed / 1024 / 1024).toFixed(1);

        return `📊 *BOT STATUS*
━━━━━━━━━━━━━━━━━━━━
✅ *Status:* Online
⏱️ *Uptime:* ${uptimeString}
💾 *Memory:* ${rssMB}MB (Heap: ${heapMB}MB)
━━━━━━━━━━━━━━━━━━━━

🤖 *Tervux WhatsApp Bot*
Self-hosted personal assistant`;

    } catch (error) {
        console.error("Stats command error:", error);
        return "❌ Failed to fetch system stats.";
    }
};
