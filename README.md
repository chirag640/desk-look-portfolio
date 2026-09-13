# desk-look-portfolio

> **Chirag Chaudhary** — Software Engineer | 3D Interactive Studio & Cupertino Desktop Portfolio  
> Built with Next.js 16 (Turbopack), React 19, Three.js, React Three Fiber, Web Audio API, and Tailwind CSS.

---

## 🌟 Overview

**desk-look-portfolio** is an immersive, photorealistic 3D web experience that bridges physical studio ambiance with a fully interactive macOS Cupertino desktop operating system (**ChiragOS**).

Visitors can navigate around an executive American walnut studio desk with acoustic slat walls, interact with physical desk elements (warm coffee mug steam, 3M handwritten post-it note scratchpad, vinyl turntable), or zoom directly into the Studio Display to explore Chirag's engineering career, enterprise Flutter & NestJS projects, and open-source contributions.

---

## ✨ Flagship Features

### ☕ 1. 3D Architectural Walnut Studio Desk
* **Acoustic Slat Wall & Grazing LED**: 36 vertically spaced American walnut slats with warm top-grazing LED strip lighting and ambient felt backing.
* **Warm Ceramic Coffee Mug**: Clickable mug that emits realistic rising steam particles and ceramic acoustic clinks.
* **Handwritten 3M Post-It Note**: Rendered with Google Font *Caveat* cursive handwriting directly onto the 3D paper mesh, greeting visitors and opening the desk scratchpad.
* **Dual Acoustic Studio Monitors**: High-frequency tweeters and bass woofers with vinyl audio visualizer pulsing.

### 💻 2. ChiragOS — Cupertino macOS Desktop
* **Full macOS Window Management**: Multi-window system supporting Finder, Terminal.app, Music.app, and Notes scratchpad with traffic lights (close, minimize, maximize), drag-and-drop, and z-index depth layering.
* **Spotlight Search (`⌘K`)**: Instant search index across 70+ GitHub repositories, technical skills (Flutter, NestJS, TypeScript, Docker), and terminal commands.
* **Stage Manager / Mission Control (`F3` / `⌘+Tab`)**: Smooth 3D perspective tiling of all open desktop windows.
* **Dynamic Lock Screen**: Activates after 60 seconds of inactivity or via `Alt + L`. Features Apple TV aerial ambient flow, local Gandhinagar IST time, password unlock (`Press ⏎ to Unlock`), and Touch ID simulation without accidental mouse dismissals.

### ⌨️ 3. Realistic Mechanical Keyboard Switch Audio
* Web Audio API synthesized switch profiles with natural pitch modulation (`±8%`) and dedicated Spacebar / Enter resonances:
  * **Cherry MX Blue**: Tactile high-frequency crisp snap.
  * **Gateron Yellow**: Creamy butter thock.
  * **Boba U4T**: Deep wooden acoustic thock.
* Switchable directly from the macOS Control Center slider.

### 📻 4. Retro Studio Vinyl Player & Analog Warmth
* Curated nostalgic old Hindi classics & timeless English playlists.
* Analog tube tape saturation, vinyl groove crackle, and room acoustics toggle.

### 🏆 5. Interactive Terminal.app Easter Eggs
* `matrix`: Falling green digital matrix code stream.
* `snake`: Fully playable retro arcade snake game with high score tracking.
* `hire chirag`: Confetti celebration overlay modal with direct email and LinkedIn connect links.

---

## 🛠️ Tech Stack & Architecture

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Static HTML Export)
* **UI & 3D**: [React 19](https://react.dev/), [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei)
* **Styling & Fonts**: Tailwind CSS, Geist Mono, Inter, Caveat
* **State Management**: [Zustand](https://github.com/pmndrs/zustand)
* **Audio**: Native Web Audio API procedural synthesis (zero audio asset latency)
* **Deployment**: GitHub Pages via GitHub Actions workflow

---

## 🚀 Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/chirag640/desk-look-portfolio.git
   cd desk-look-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production build**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to GitHub Pages

This repository is pre-configured with a zero-config GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/chirag640/desk-look-portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. In your GitHub repository:
   * Go to **Settings** > **Pages**.
   * Under **Build and deployment** > **Source**, select **GitHub Actions**.
   * On every push to `main`, GitHub Actions will automatically build and publish the static site.

---

## 👨‍💻 Author

**Chirag Chaudhary**  
*Software Engineer · Tata Consultancy Services (TCS Digital)*  
*Gandhinagar, Gujarat, India*

* **GitHub**: [@chirag640](https://github.com/chirag640) (70+ Repositories)
* **LinkedIn**: [chiragchaudhary1910](https://www.linkedin.com/in/chiragchaudhary1910/)
* **Flagship Package**: [`flutter_blueprint`](https://pub.dev/packages/flutter_blueprint) (20★ on Pub.dev)
