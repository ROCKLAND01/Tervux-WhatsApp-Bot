// Fun Commands
import { ship } from "./fun/ship.js";
import { fancy } from "./fun/fancy.js";
import { joke } from "./fun/joke.js";
import { fact } from "./fun/fact.js";
import { dare } from "./fun/dare.js";
import { truth } from "./fun/truth.js";

// General Commands
import { help } from "./general/help.js";
import { ping } from "./general/ping.js";
import { botstats } from "./general/botstats.js";
import { owner } from "./general/owner.js";
import { block } from "./general/block.js";
import { unblock } from "./general/unblock.js";

// Media Commands
import { movie } from "./media/movie.js";
import { sport } from "./media/sport.js";
import { news } from "./media/news.js";
import { play } from "./media/play.js";
import { video } from "./media/video.js";

// Status Commands
import { status } from "./status/profile.js";
import { setbio } from "./status/setbio.js";
import { setname } from "./status/setname.js";

// Tool Commands
import { calc } from "./tools/calc.js";
import { qr } from "./tools/qr.js";
import { weather } from "./tools/weather.js";
import { translate } from "./tools/translate.js";

// Settings Commands (implemented via config.json)
import { getCachedConfig, updateConfig, invalidateConfigCache } from "../services/configService.js";

// Settings commands - implemented inline
const settings = async (sock, m, args) => {
    const config = getCachedConfig();
    return `⚙️ *BOT SETTINGS*
━━━━━━━━━━━━━━━━━━━━
• *Prefix:* ${config.prefix || "!"}
• *Always Online:* ${config.alwaysOnline ? "✅" : "❌"}
• *Auto Like Status:* ${config.autoLikeStatus ? "✅" : "❌"}
• *Auto View Status:* ${config.autoViewStatus ? "✅" : "❌"}
• *Anti Delete:* ${config.antiDelete ? "✅" : "❌"}
• *Anti Call:* ${config.antiCall ? "✅" : "❌"}
• *Auto Read:* ${config.autoReadMessages ? "✅" : "❌"}
• *Always Typing:* ${config.alwaysTyping ? "✅" : "❌"}
• *Always Recording:* ${config.alwaysRecording ? "✅" : "❌"}

💡 Use toggle commands to change settings:
!alwaysonline on/off
!autolikestatus on/off
!antidelete on/off`;
};

// Toggle commands
const createToggle = (settingKey, displayName) => async (sock, m, args) => {
    const value = args[0]?.toLowerCase();
    if (value !== "on" && value !== "off") {
        return `❓ Usage: !${displayName.toLowerCase()} on/off`;
    }
    const newValue = value === "on";
    updateConfig({ [settingKey]: newValue });
    invalidateConfigCache();
    return `✅ *${displayName}* is now ${newValue ? "enabled" : "disabled"}!`;
};

const alwaysonline = createToggle("alwaysOnline", "Always Online");
const autolikestatus = createToggle("autoLikeStatus", "Auto Like Status");
const autoviewstatus = createToggle("autoViewStatus", "Auto View Status");
const antidelete = createToggle("antiDelete", "Anti Delete");
const anticall = createToggle("antiCall", "Anti Call");
const autoread = createToggle("autoReadMessages", "Auto Read");
const alwaystyping = createToggle("alwaysTyping", "Always Typing");
const alwaysrecording = createToggle("alwaysRecording", "Always Recording");

export const commands = {
    // Fun Commands
    ship,
    fancy,
    joke,
    fact,
    dare,
    truth,

    // General Commands
    help,
    ping,
    botstats,
    owner,
    block,
    unblock,

    // Media Commands
    movie,
    sport,
    news,
    play,
    video,

    // Status Commands
    status,
    setbio,
    setname,

    // Tool Commands
    calc,
    qr,
    weather,
    translate,

    // Settings & Toggle Commands
    settings,
    alwaysonline,
    autolikestatus,
    autoviewstatus,
    antidelete,
    anticall,
    autoread,
    alwaystyping,
    alwaysrecording
};
