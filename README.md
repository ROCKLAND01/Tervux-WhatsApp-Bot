<div align="center">

<!-- CIRCULAR LOGO WITH GLOW HACK -->
<svg width="220" height="220" viewBox="0 0 220 220">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <pattern id="logoPattern" x="10" y="10" width="200" height="200" patternUnits="userSpaceOnUse">
      <image x="0" y="0" width="200" height="200" href="https://raw.githubusercontent.com/JonniTech/Tervux-WhatsApp-Bot/main/public/tervus-logo.png" />
    </pattern>
  </defs>
  <!-- Glow effect circles -->
  <circle cx="110" cy="110" r="105" fill="none" stroke="#25D366" stroke-width="4" opacity="0.3" filter="url(#glow)" />
  <circle cx="110" cy="110" r="102" fill="none" stroke="#25D366" stroke-width="2" opacity="0.5" />
  <!-- Main Circular Logo -->
  <circle cx="110" cy="110" r="100" fill="url(#logoPattern)" stroke="#25D366" stroke-width="3" />
</svg>

<br>

<!-- PRIMARY ANIMATED HEADER -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=800&size=36&pause=1000&color=25D366&background=111&center=true&vCenter=true&width=600&height=70&lines=TERVUX+WHATSAPP+BOT;SIMPLE+SMART+SECURE;DEPLOY+IN+SECONDS" alt="Animated Header" />
</a>

<p align="center">
  <img src="https://img.shields.io/github/stars/JonniTech/Tervux-WhatsApp-Bot?style=for-the-badge&logo=github&color=FFD700&labelColor=1a1a1b" alt="Stars" />
  <img src="https://img.shields.io/github/forks/JonniTech/Tervux-WhatsApp-Bot?style=for-the-badge&logo=github&color=00BFFF&labelColor=1a1a1b" alt="Forks" />
  <img src="https://img.shields.io/github/issues/JonniTech/Tervux-WhatsApp-Bot?style=for-the-badge&logo=github&color=FF4500&labelColor=1a1a1b" alt="Issues" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js&logoColor=white&labelColor=333" alt="Node" />
  <img src="https://img.shields.io/badge/Baileys-Latest-blue?style=for-the-badge&logo=whatsapp&logoColor=white&labelColor=333" alt="Baileys" />
</p>

<!-- LANGUAGE SELECTOR -->
<table align="center" border="0">
  <tr>
    <td>
      <a href="#english-documentation">
        <img src="https://img.shields.io/badge/DOCUMENTATION-ENGLISH-3399FF?style=for-the-badge&labelColor=222" height="35">
      </a>
    </td>
    <td>
      <a href="#maelekezo-ya-kiswahili">
        <img src="https://img.shields.io/badge/MAELEKEZO-KISWAHILI-25D366?style=for-the-badge&labelColor=222" height="35">
      </a>
    </td>
  </tr>
</table>

</div>

---

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=28&pause=1000&color=3399FF&center=true&vCenter=true&width=500&height=50&lines=English+Documentation" alt="English Header" id="english-documentation">
</div>

### Overview

Tervux Bot is a high-performance WhatsApp automation framework designed for industrial-grade stability. It provides a comprehensive suite of media retrieval, group orchestration, and security management tools.

The system scales efficiently across various cloud environments and supports multi-device architecture for uninterrupted service.

<br>
<div align="center">
  <img src="https://raw.githubusercontent.com/JonniTech/Tervux-WhatsApp-Bot/main/public/welcome-message.jpeg" width="650" style="border: 2px solid #25D366; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
</div>
<br>

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=28&pause=1000&color=FFD700&center=true&vCenter=true&width=500&height=50&lines=Core+Capabilities" alt="Features Header">
</div>

| Capability | Specification |
| :--- | :--- |
| **Media Engine** | High-speed retrieval of content from YouTube, TikTok, and Instagram. |
| **Automation** | Context-aware responses and specialized text rendering modules. |
| **Security Layer** | Integrated protection against message deletion and unsolicited calls. |
| **Data Tools** | Real-time weather analytics, translation services, and QR generation. |
| **Persistence** | Persistent online status and automated status stream monitoring. |

<br>
<div align="center">
  <table border="0">
    <tr>
      <td><img src="https://raw.githubusercontent.com/JonniTech/Tervux-WhatsApp-Bot/main/public/help-menu-start.jpeg" width="320"></td>
      <td><img src="https://raw.githubusercontent.com/JonniTech/Tervux-WhatsApp-Bot/main/public/help-menu-end.jpeg" width="320"></td>
    </tr>
  </table>
</div>
<br>

---

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=28&pause=1000&color=25D366&center=true&vCenter=true&width=500&height=50&lines=Deployment+Protocols" alt="Deployment Header">
</div>

Technical instructions for successful system deployment.

#### Phase 1: Environment Setup
1. **GitHub Synchronization:** Create a branch/fork of this repository to your local profile.
2. **Identity Configuration:** Prepare the target WhatsApp number for authentication.

#### Phase 2: Implementation
Select the preferred execution environment.

**Method A: Railway Orchestration**
1. Access **Railway.app** and authorize via GitHub.
2. Select **New Project** and choose the `Tervux-WhatsApp-Bot` repository.
3. Establish Environment Variables: Add `PHONE` for Pairing Code authentication.
4. Execute Deployment. Access the terminal logs to finalize the linking process.

**Method B: Render Web Service**
1. Access **Render.com** and link your GitHub account.
2. Initiate a new **Web Service** connecting to this project.
3. Configure Runtime:
   - **Command:** `npm install`
   - **Start:** `npm start`
4. Confirm creation. Monitor deployment logs for the authentication QR code.

**Method C: Local Infrastructure**
1. Ensure Node.js Version 18 is installed.
2. Execute the following sequence:
   ```bash
   git clone https://github.com/JonniTech/Tervux-WhatsApp-Bot.git
   cd Tervux-WhatsApp-Bot
   npm install
   npm start
   ```

---

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=28&pause=1000&color=FF5733&center=true&vCenter=true&width=500&height=50&lines=System+FAQ" alt="FAQ Header">
</div>

**How is the authentication handled?**
The system generates a time-sensitive QR code or alphanumeric Pairing Code within the deployment logs for secure account linkage.

**Can I modify the configuration post-deployment?**
Adjustments can be applied via the `!settings` command directly in WhatsApp or by updating the `config.json` file.

**Is multi-device supported?**
Yes, the system utilizes the latest Baileys architecture for full multi-device compatibility.

---

<br>

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=28&pause=1000&color=25D366&center=true&vCenter=true&width=500&height=50&lines=Maelekezo+ya+Kiswahili" alt="Swahili Header" id="maelekezo-ya-kiswahili">
</div>

### Utangulizi

Tervux Bot ni mfumo wa kisasa wa WhatsApp ulioandaliwa kwa ajili ya usalama na ufanisi. Inatoa uwezo wa kupata media, kusimamia magroup, na kutoa ulinzi dhidi ya changamoto mbalimbali.

Mfumo huu umejengwa kwa Node.js na unaruhusu matumizi rahisi kwenye mitandao mbalimbali.

<br>
<div align="center">
  <img src="https://raw.githubusercontent.com/JonniTech/Tervux-WhatsApp-Bot/main/public/welcome-message.jpeg" width="650">
</div>
<br>

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=28&pause=1000&color=FFD700&center=true&vCenter=true&width=500&height=50&lines=Uwezo+wa+Mfumo" alt="Uwezo Header">
</div>

| Uwezo | Maelezo |
| :--- | :--- |
| **Download Media** | Kupata maudhui kutoka YouTube, TikTok, na Instagram bila watermark. |
| **Automation** | Majibu ya haraka na mwandiko wa mapambo kwa kila ujumbe. |
| **Usalama** | Ulinzi dhidi ya kufutwa kwa ujumbe na kuzuia simu zisizohitajika. |
| **Zana za Data** | Hali ya hewa mara moja, tafsiri ya lugha, na kutengeneza QR codes. |
| **Uimara** | Uwezo wa kuonekana online muda wote bila kuzima. |

---

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=28&pause=1000&color=25D366&center=true&vCenter=true&width=500&height=50&lines=Maelekezo+ya+Kuwasha" alt="Deployment Swahili Header">
</div>

#### Hatua ya 1: Maandalizi
1. **GitHub:** Fungua nakala yako ya mfumo huu kwenye akaunti yako.
2. **Namba:** Andaa namba ya WhatsApp unayotaka kuitumia kama bot.

#### Hatua ya 2: Utekelezaji

**Njia A: Railway**
1. Fungua Railway.app na unganisha na GitHub.
2. Chagua repository ya `Tervux-WhatsApp-Bot`.
3. Weka namba yako kwenye variable ya `PHONE`.
4. Washa mfumo na angalia logs kwa ajili ya kuunganisha.

**Njia B: Render**
1. Fungua Render.com na unganisha GitHub.
2. Chagua Web Service kwa ajili ya project hii.
3. Tumia amri hizi:
   - **Build:** `npm install`
   - **Start:** `npm start`
4. Angalia logs pindi mfumo utakapokuwa "Live".

---

<div align="center">
  <p>System Powered by Nyaganya Malima Nyaganya</p>
  <img src="https://media.giphy.com/media/L1R1TVThF8Ul39Z7X6/giphy.gif" width="100" height="auto">
  <br>
  <a href="https://github.com/JonniTech/Tervux-WhatsApp-Bot">
    <img src="https://img.shields.io/badge/DEVELOPER-GITHUB-black?style=for-the-badge&logo=github" />
  </a>
</div>
