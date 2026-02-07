import { readFileSync } from "fs";

let cachedLogo = null;
let logoChecked = false;

export const help = async (sock, m, args) => {
  if (!logoChecked) {
    try {
      let path = process.cwd() + "/assets/tervux-logo.png";
      cachedLogo = readFileSync(path);
    } catch (e) {
      console.error("Logo not found for help menu:", e.message);
    }
    logoChecked = true;
  }
  const logo = cachedLogo;

  const caption = `
╭─────────────── ✦ ✧ ✦ ───────────────╮
        🤖  TERVUX BOT  🤖         
╰─────────────── ✦ ✧ ✦ ───────────────╯
      ✨  Self-Hosted Assistant  ✨         

🚀 *Your Personal WhatsApp Automation*

━━━━━━━━━━━━━━━━━━━━

╭───『 ⚙️ *SETTINGS* 』───╮
│ ⚙️ ➾ *!settings* - View all settings
│ ⚙️ ➾ *!alwaysonline* on/off
│ ⚙️ ➾ *!autolikestatus* on/off
│ ⚙️ ➾ *!autoviewstatus* on/off
│ ⚙️ ➾ *!autoread* on/off
│ ⚙️ ➾ *!antidelete* on/off
│ ⚙️ ➾ *!anticall* on/off
│ ⚙️ ➾ *!alwaystyping* on/off
│ ⚙️ ➾ *!alwaysrecording* on/off
╰──────────────────────────────╯

╭───『 ⚡ *GENERAL* 』───╮
│ 📊 ➾ *!botstats* - System status
│ 📖 ➾ *!help* - Show this menu
│ 🏓 ➾ *!ping* - Check latency
│ 👤 ➾ *!owner* - Bot owner info
│ 🚫 ➾ *!block* @user
│ ✅ ➾ *!unblock* @user
╰──────────────────────────────╯

╭───『 🎮 *FUN* 』───╮
│ 💕 ➾ *!ship* @user1 @user2
│ ✨ ➾ *!fancy* <text>
│ 😂 ➾ *!joke*
│ 🧠 ➾ *!fact*
│ 🎯 ➾ *!dare*
│ 🔮 ➾ *!truth*
╰──────────────────────────────╯

╭───『 👤 *STATUS* 』───╮
│ 👁️ ➾ *!status*
│ 📝 ➾ *!setbio* <text>
│ ✏️ ➾ *!setname* <name>
╰──────────────────────────────╯

╭───『 🎬 *MEDIA* 』───╮
│ 🎬 ➾ *!movie* <name>
│ 📰 ➾ *!news*
│ 🎵 ➾ *!play* <song>
│ ⚽ ➾ *!sport*
│ 📹 ➾ *!video* <search>
╰──────────────────────────────╯

╭───『 🛠️ *TOOLS* 』───╮
│ 🔢 ➾ *!calc* <expression>
│ 📱 ➾ *!qr* <text>
│ 🌐 ➾ *!translate* <text>
│ 🌤️ ➾ *!weather* <city>
╰──────────────────────────────╯

   💠 _Powered by Tervux_
`;

  if (logo) {
    return { image: logo, caption, linkPreview: null };
  }
  return caption;
};
