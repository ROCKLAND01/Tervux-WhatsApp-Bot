import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { getRepoStats } from "../../utils/githubStats.js";

export const help = async (sock, m, args) => {
  // Load Logo securely
  let logoBuffer = null;
  try {
    const logoPath = join(process.cwd(), "assets", "tervux-logo.png");
    if (existsSync(logoPath)) {
      logoBuffer = readFileSync(logoPath);
    }
  } catch (e) {
    console.error("❌ Failed to load logo for help command:", e.message);
  }

  // Fetch GitHub Stats
  const stats = await getRepoStats();

  // Fallback if stats fail
  const githubSection = stats ?
    `╭───『 📊 *𝔾𝕀𝕋ℍ𝕌𝔹 𝕊𝕋𝔸𝕋𝕊* 』───╮
│ ⭐ *Stars:* ${stats.stars}
│ 🍴 *Forks:* ${stats.forks}
│ 🐞 *Issues:* ${stats.issues}
│ 📅 *Created:* ${stats.createdAt}
│ 🔄 *Updated:* ${stats.updatedAt}
╰──────────────────────────────╯` : "";

  const caption = `╭───『 🤖 *𝕋𝔼ℝ𝕍𝕌𝕏 𝔹𝕆𝕋* 』───╮
│
│ ✨ *Prefix:* !
│ 📅 *Date:* ${new Date().toLocaleDateString()}
│ 👑 *Creator:* Nyaganya Malima
│
╰──────────────────────────────╯

${githubSection}

╭───『 🎮 *𝔽𝕌ℕ ℤ𝕆ℕ𝔼* 』───╮
│ 💘 ➾ *!ship* @user1 @user2
│ ✨ ➾ *!fancy* <text>
│ 😂 ➾ *!joke*
│ 🧠 ➾ *!fact*
│ 😇 ➾ *!truth*
│ 😈 ➾ *!dare*
╰──────────────────────────────╯

╭───『 ⚙️ *𝔾𝔼ℕ𝔼ℝ𝔸𝕃* 』───╮
│ 🏓 ➾ *!ping*
│ 📊 ➾ *!botstats*
│ 👑 ➾ *!owner*
│ 🚫 ➾ *!block* <@user>
│ ✅ ➾ *!unblock* <number>
│ ℹ️ ➾ *!help*
╰──────────────────────────────╯

╭───『 🎬 *𝕄𝔼𝔻𝕀𝔸* 』───╮
│ 🎵 ➾ *!play* <song name>
│ 📹 ➾ *!video* <video name>
│ 🎬 ➾ *!movie* <movie name>
│ ⚽ ➾ *!sport* <team name>
│ 📰 ➾ *!news*
╰──────────────────────────────╯

╭───『 👤 *𝕊𝕋𝔸𝕋𝕌𝕊* 』───╮
│ 🕵️ ➾ *!status* <@user/num>
│ 📝 ➾ *!setbio* <text>
│ ✏️ ➾ *!setname* <name>
╰──────────────────────────────╯

╭───『 🛠️ *𝕋𝕆𝕆𝕃𝕊* 』───╮
│ 🔢 ➾ *!calc* <expression>
│ 📱 ➾ *!qr* <text>
│ 🌐 ➾ *!translate* <text>
│ 🌤️ ➾ *!weather* <city>
╰──────────────────────────────╯

╭───『 ⚙️ *𝕊𝔼𝕋𝕋𝕀ℕ𝔾𝕊* 』───╮
│ 🔧 ➾ *!settings*
│ 🌐 ➾ *!alwaysonline*
│ ❤️ ➾ *!autolikestatus*
│ 👀 ➾ *!autoviewstatus*
│ 🛡️ ➾ *!antidelete*
│ 📵 ➾ *!anticall*
│ ✔️ ➾ *!autoread*
╰──────────────────────────────╯

💠 *ℙ𝕠𝕨𝕖𝕣𝕖𝕕 𝕓𝕪 𝕋𝔼ℝ𝕍𝕌𝕏 𝔹𝕠𝕥*
🔗 github.com/JonniTech/Tervux-WhatsApp-Bot
`;

  if (logoBuffer) {
    return { image: logoBuffer, caption, linkPreview: null };
  }
  return caption;
};
