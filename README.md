<div align="center">

<!-- HEADER LOGO -->
<p align="center">
  <img src="./public/tervus-logo.png" alt="Tervux Bot" width="180" style="border-radius: 50%; box-shadow: 0 0 30px rgba(37, 211, 102, 0.4); border: 4px solid #25D366;">
</p>

<!-- TYPING ANIMATION -->
<p align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=700&size=32&pause=1000&color=25D366&center=true&vCenter=true&width=500&lines=TERVUX+WHATSAPP+BOT;Simple.+Smart.+Secure.;Deploy+in+Seconds!🚀" alt="Typing Animation" />
  </a>
</p>

<!-- STATS SHIELDS -->
<p align="center">
  <img src="https://img.shields.io/github/stars/JonniTech/Tervux-WhatsApp-Bot?style=for-the-badge&logo=github&color=FFD700&labelColor=1a1a1b" alt="Stars" />
  <img src="https://img.shields.io/github/forks/JonniTech/Tervux-WhatsApp-Bot?style=for-the-badge&logo=github&color=00BFFF&labelColor=1a1a1b" alt="Forks" />
  <img src="https://img.shields.io/github/issues/JonniTech/Tervux-WhatsApp-Bot?style=for-the-badge&logo=github&color=FF4500&labelColor=1a1a1b" alt="Issues" />
</p>

<!-- LANGUAGE SELECTOR -->
<table align="center">
  <tr>
    <td align="center">
      <a href="#english-section">
        <img src="https://img.shields.io/badge/ENGLISH-CLICK_HERE-blue?style=for-the-badge&logo=google-translate&logoColor=white" width="180">
      </a>
    </td>
    <td align="center">
      <a href="#sehemu-ya-kiswahili">
        <img src="https://img.shields.io/badge/KISWAHILI-BOFYA_HAPA-green?style=for-the-badge&logo=google-translate&logoColor=white" width="180">
      </a>
    </td>
  </tr>
</table>

</div>

---

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=3399FF&center=true&vCenter=true&width=435&lines=English+Documentation" alt="English Header" id="english-section">
</div>

## Introduction

Tervux Bot is a high-performance WhatsApp assistant engineered for stability and ease of use. It allows users to automate tasks, download media content, and manage groups through a comprehensive set of commands. 

The project is built on Node.js using the Baileys library. It is designed to be lightweight and accessible for both technical and non-technical users.

<br>
<div align="center">
  <img src="./public/welcome-message.jpeg" width="600" style="border-radius: 15px; border: 2px solid #25D366; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
</div>
<br>

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=FFD700&center=true&vCenter=true&width=435&lines=Key+Features" alt="Features Header">
</div>

| Feature | Description |
| :--- | :--- |
| **Media Downloader** | Direct downloads from YouTube, TikTok, and Instagram without watermarks. |
| **Fun Zone** | Truth or Dare, ship compatibility, and stylized text generation. |
| **Security** | Advanced protection including Anti-Delete and Anti-Call features. |
| **Utilities** | Real-time weather, currency translation, and QR code generation. |
| **Always Online** | Optional 24/7 online presence and auto-viewing of status updates. |

<br>
<div align="center">
  <table border="0">
    <tr>
      <td><img src="./public/help-menu-start.jpeg" width="300" style="border-radius: 10px;"></td>
      <td><img src="./public/help-menu-end.jpeg" width="300" style="border-radius: 10px;"></td>
    </tr>
  </table>
</div>
<br>

---

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=25D366&center=true&vCenter=true&width=435&lines=Deployment+Guide" alt="Deployment Header">
</div>

Follow these steps carefully to host your own bot for free.

### Phase 1: Preparation
1. **GitHub Account:** Ensure you are logged into your GitHub account.
2. **Fork Project:** Click the "Fork" button at the top right of this repository. This creates a personal copy of the code in your account.
3. **WhatsApp Number:** Identify the phone number you wish to use as the bot.

### Phase 2: Cloud Hosting
Choose one of the platforms below.

#### Method A: Railway (Recommended)
1. Visit [Railway.app](https://railway.app) and create an account using GitHub.
2. Select **New Project** and then **Deploy from GitHub repo**.
3. Choose your forked repository: `Tervux-WhatsApp-Bot`.
4. (Optional) Go to the **Variables** tab and add a new secret named `PHONE` with your number (including country code) to receive a pairing code.
5. Click **Deploy**. Once the process is finished, go to the **Logs** tab to view your login QR code or Pairing Code.

#### Method B: Render
1. Visit [Render.com](https://render.com) and log in with GitHub.
2. Select **New +** and click on **Web Service**.
3. Connect the `Tervux-WhatsApp-Bot` repository.
4. Set the following configuration:
   - **Environment:** Node.js
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **Create Web Service**. Wait for the status to show "Live," then check the **Logs** to scan the QR code.

### Phase 3: Local Setup
For power users or those using Termux/PC.

1. Install [Node.js](https://nodejs.org) (Version 18 or higher).
2. Open your terminal or CMD and run:
   ```bash
   git clone https://github.com/JonniTech/Tervux-WhatsApp-Bot.git
   cd Tervux-WhatsApp-Bot
   npm install
   npm start
   ```

---

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=FF5733&center=true&vCenter=true&width=435&lines=Frequently+Asked+Questions" alt="FAQ Header">
</div>

**1. Where is the QR Code?**
The QR code is printed in the internal logs of your hosting service (Railway or Render) immediately after the build completes.

**2. How do I change settings?**
You can use the `!settings` command in WhatsApp or modify the `config.json` file in your repository.

**3. What is a Pairing Code?**
A pairing code allows you to link the bot without scanning a QR code. It requires setting the `PHONE` variable in your hosting platform.

---

<br>

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=25D366&center=true&vCenter=true&width=435&lines=Maelekezo+ya+Kiswahili" alt="Swahili Header" id="sehemu-ya-kiswahili">
</div>

## Utangulizi

Tervux Bot ni msaidizi wa kisasa wa WhatsApp aliyetengenezwa kwa ajili ya kasi na wepesi wa kutumia. Inaruhusu watumiaji kufanya kazi kiotomatiki, kupakua maudhui, na kusimamia magroup kupitia amri mbalimbali.

Project hii imejengwa kwa kutumia Node.js na library ya Baileys. Imetengenezwa kuwa nyepesi na inayofaa kwa watumiaji wa kila aina, wawe na ufundi au wasio na ufundi.

<br>
<div align="center">
  <img src="./public/welcome-message.jpeg" width="600" style="border-radius: 15px; border: 2px solid #25D366; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
</div>
<br>

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=FFD700&center=true&vCenter=true&width=435&lines=Vipengele+Vikuu" alt="Vipengele Header">
</div>

| Kipengele | Maelezo |
| :--- | :--- |
| **Download Media** | Pakua video na miziki kutoka YouTube, TikTok, na Instagram bila watermark. |
| **Burudani** | Michezo ya Truth or Dare, vipimo vya upendo, na mwandiko wa mapambo. |
| **Usalama** | Ulinzi wa hali ya juu ikiwemo Anti-Delete na kuzuia simu (Anti-Call). |
| **Zana** | Hali ya hewa kwa nchi zote, kutengeneza QR code, na mkalimani wa lugha. |
| **Online Muda Wote** | Uwezo wa kuonekana uko online saa 24 na kuangalia status za watu kiotomatiki. |

---

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=25D366&center=true&vCenter=true&width=435&lines=Hatua+za+Kuwasha+(Deploy)" alt="Maelekezo Header">
</div>

Fuata hatua hizi kwa umakini ili kumiliki bot yako mwenyewe.

### Hatua ya 1: Matayarisho
1. **Akaunti ya GitHub:** Hakikisha umeingia kwenye akaunti yako ya GitHub.
2. **Fork Project:** Bonyeza kitufe cha "Fork" juu kulia mwa ukurasa huu. Hii itatengeneza nakala yako binafsi ya code hizi.
3. **Namba ya WhatsApp:** Chagua namba unayotaka iwe bot.

### Hatua ya 2: Kuweka Mtandaoni
Chagua mmoja kati ya mitandao hapa chini.

#### Njia A: Railway (Inashauriwa)
1. Fungua [Railway.app](https://railway.app) na tengeneza akaunti ukitumia GitHub.
2. Chagua **New Project** kisha bonyeza **Deploy from GitHub repo**.
3. Chagua repository uliyofanya fork: `Tervux-WhatsApp-Bot`.
4. (Hialo) Nenda kwenye sehemu ya **Variables** na ongeza jina la siri kama `PHONE` ukiweka namba yako ili kupata Pairing Code.
5. Bonyeza **Deploy**. Baada ya muda, nenda kwenye tab ya **Logs** kuona QR code ya kuscan.

#### Njia B: Render
1. Fungua [Render.com](https://render.com) na ingia kwa kutumia GitHub.
2. Chagua **New +** kisha bonyeza **Web Service**.
3. Unganisha repository ya `Tervux-WhatsApp-Bot`.
4. Weka mipangilio ifuatayo:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Bonyeza **Create Web Service**. Subiri ionyeshe "Live," kisha angalia **Logs** kuscan QR code.

### Hatua ya 3: Kufunga Kwenye Kompyuta
Kwa watumiaji wenye kompyuta au wanaotumia Termux.

1. Weka [Node.js](https://nodejs.org) (Version 18 au zaidi).
2. Fungua terminal yako na andika:
   ```bash
   git clone https://github.com/JonniTech/Tervux-WhatsApp-Bot.git
   cd Tervux-WhatsApp-Bot
   npm install
   npm start
   ```

---

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=FF5733&center=true&vCenter=true&width=435&lines=Maswali+ya+Kila+Siku" alt="Maswali Header">
</div>

**1. QR Code nitapata wapi?**
QR code inapatikana kwenye sehemu ya "Logs" ya mtandao uliotumia kuwasha bot yako mara tu baada ya kumaliza build.

**2. Nawezaje kubadili mipangilio?**
Tumia amri ya `!settings` ndani ya WhatsApp au badili file la `config.json` kwenye repository yako.

**3. Pairing Code ni nini?**
Ni namba unayotumia kuunganisha bot bila kuscan QR. Lazima uweke variable ya `PHONE` kwenye mtandao wako wa hosting.

---

<div align="center">
  <p>Made with Power by Nyaganya Malima Nyaganya</p>
  <img src="https://media.giphy.com/media/L1R1TVThF8Ul39Z7X6/giphy.gif" width="100" height="auto">
  <br>
  <a href="https://github.com/JonniTech/Tervux-WhatsApp-Bot">
    <img src="https://img.shields.io/badge/VISIT-GITHUB-black?style=for-the-badge&logo=github" />
  </a>
</div>
