export const ship = async (sock, m, args) => {
    const remoteJid = m.key.remoteJid;
    if (!remoteJid.endsWith("@g.us")) return "❌ This command is only for group fun!";

    let target1, target2;
    const mentions = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];

    if (mentions.length >= 2) {
        target1 = mentions[0];
        target2 = mentions[1];
    } else if (mentions.length === 1) {
        target1 = m.key.participant || m.key.remoteJid;
        target2 = mentions[0];
    } else {
        // Randomly pick two people from the group
        try {
            const metadata = await sock.groupMetadata(remoteJid);
            const participants = metadata.participants;
            const shuffled = participants.sort(() => 0.5 - Math.random());
            target1 = shuffled[0].id;
            target2 = shuffled[1].id;
        } catch (err) {
            return "❌ Couldn't find victims... I mean, candidates!";
        }
    }

    const lovePercentage = Math.floor(Math.random() * 101);
    let comment = "";
    if (lovePercentage > 90) comment = "🔥 Soulmates! Just get married already.";
    else if (lovePercentage > 70) comment = "💖 High compatibility. Definitely something there!";
    else if (lovePercentage > 50) comment = "💓 There is hope, keep trying!";
    else if (lovePercentage > 30) comment = "💔 Friendzone detected. Ouch.";
    else comment = "💀 Toxic alert! Stay away.";

    const message = `
💘 *TERVUS MATCHMAKER* 💘
━━━━━━━━━━━━━━━━━━━━
👤 @${target1.split("@")[0]}
      &
👤 @${target2.split("@")[0]}

📈 *Compatibility:* ${lovePercentage}%
✨ *Verdict:* ${comment}
━━━━━━━━━━━━━━━━━━━━
    `;

    return {
        text: message,
        mentions: [target1, target2]
    };
};
