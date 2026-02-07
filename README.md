# 🤖 Tervux WhatsApp Bot

A self-hosted WhatsApp bot powered by [Baileys](https://github.com/WhiskeySockets/Baileys). No database required - just fork, deploy, and scan the QR code!

## ✨ Features

- **Always Online** - Stay visible 24/7
- **Auto Status Actions** - Auto-view and auto-like statuses
- **Anti-Delete** - Recover deleted messages
- **Anti-Call** - Automatically reject calls
- **Fun Commands** - Jokes, facts, dares, and more
- **Media Downloads** - Play music, search videos, get news
- **Utility Tools** - Calculator, QR generator, translator, weather

## 📋 Requirements

- Node.js 18+
- npm

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Tervux-WhatsApp-Bot.git
cd Tervux-WhatsApp-Bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the bot

```bash
npm start
```

### 4. Scan QR Code

When you start the bot, a QR code will be displayed in your terminal. Scan it with WhatsApp to connect!

## 🔧 Configuration

Bot settings are stored in `config.json` (created automatically on first run):

```json
{
  "phone": "",
  "name": "Bot User",
  "alwaysOnline": false,
  "autoLikeStatus": false,
  "autoViewStatus": false,
  "antiDelete": false,
  "antiCall": false,
  "autoReadMessages": false,
  "alwaysTyping": false,
  "alwaysRecording": false,
  "prefix": "!"
}
```

You can also change settings using commands like `!alwaysonline on`.

## 📝 Commands

| Command | Description |
|---------|-------------|
| `!help` | Show all commands |
| `!settings` | View current settings |
| `!botstats` | Show bot status |
| `!alwaysonline on/off` | Toggle always online |
| `!autolikestatus on/off` | Toggle auto-like status |
| `!antidelete on/off` | Toggle anti-delete |
| `!anticall on/off` | Toggle call blocking |
| `!play <song>` | Download and play audio |
| `!video <search>` | Download video |
| `!weather <city>` | Get weather info |
| `!translate <text>` | Translate text |

See `!help` for the full command list.

## ☁️ Deploy to Cloud

### Render

1. Fork this repository
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Deploy and access the logs to scan QR

### Heroku

1. Fork this repository
2. Create a new app on Heroku
3. Connect your GitHub repo
4. Deploy and run `heroku logs --tail` to see QR code

## 📁 Project Structure

```
├── app.js              # Express server
├── server.js           # Entry point
├── config.json         # User settings (auto-generated)
├── auth_info/          # WhatsApp session (auto-generated)
├── commands/           # Bot commands
│   ├── fun/
│   ├── general/
│   ├── media/
│   ├── status/
│   └── tools/
└── services/
    ├── configService.js    # Settings management
    ├── whatsappClient.js   # Baileys client
    └── whatsappService.js  # Service layer
```

## ⚠️ Important Notes

- **Session Files**: The `auth_info/` folder contains your WhatsApp credentials. Keep it secure!
- **Single User**: This bot is designed for personal use. One deployment = one WhatsApp account.
- **Rate Limits**: WhatsApp has rate limits. Avoid spamming commands.

## 🛠️ Development

```bash
# Start with hot reload
npm run dev
```

## 📜 License

MIT License - Feel free to fork and customize!

## 🤝 Credits

- [Baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API
- [Tervux Company](https://tervux.vercel.app) - Original development

---

**Need help?** Create an issue on GitHub!
