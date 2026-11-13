# T-MINUS ⏱️

> An interactive mobile lock-screen countdown and milestone wallpaper generator inspired by Teenage Engineering, Nothing OS, and aerospace telemetry HUDs.

Built with **React + Vite + Tailwind CSS**.

---

## 🚀 Overview

**T-MINUS** allows users to configure a critical deadline and 4 chronological milestone targets, inspect ergonomics against a simulated iOS/Android lock screen (avoiding clock/widget/flashlight/camera safe zone overlap), and export a razor-sharp **1170×2532px PNG** wallpaper ready to use on mobile devices.

---

## ⚡ Features

- **Split-Screen Studio Layout:**
  - **Left Panel:** Realistic phone frame with 9:19.5 aspect ratio, bezel styling, and toggleable simulated phone lock screen UI (clock "9:41", date, camera & flashlight buttons).
  - **Right Panel:** Tactile telemetry-inspired control deck.
- **Lock-Screen Ergonomics (Safe Zones):**
  - **Top 32%:** Clean negative space with subtle telemetry grid (reserves room for phone clock & date).
  - **Active Content Zone (Middle 54%):**
    - Telemetry status pill (`STATUS: IN PROGRESS // TRACKING`)
    - Mission title display
    - Large tabular-nums countdown display (days remaining + formatted target timestamp)
    - Segmented progress bar (% elapsed)
    - 4-milestone vertical spine track (`DONE` checkmark, `ACTIVE` glowing indicator, `UPCOMING` hollow node)
  - **Bottom 14%:** Negative space for quick action buttons (flashlight/camera).
- **3 Visual Themes:**
  1. **Obsidian Telemetry:** Deep matte black (`#09090B`), crisp white text, Signal Orange (`#FF4D00`) accents, dot-matrix grid.
  2. **Swiss Editorial:** Warm paper (`#F4F3EF`), ink black (`#111111`), International Klein Blue (`#002FA7`) accents, architectural hairlines.
  3. **Orbital Blueprint:** Midnight navy (`#070D19`), cyan wireframe (`#00E5FF`), coordinate ticks.
- **3 Quick Presets:**
  - *Hackathon / Software Launch*
  - *Finals Week Boss Fight*
  - *Half-Marathon Taper*
- **Export & Shareability:**
  - **1170×2532 PNG Download:** Exports pristine mobile wallpaper excluding phone bezel/overlays.
  - **Shareable URL Query State:** Encodes title, target, theme, and 4 milestones into URL parameters for instant loading.

---

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS v4**
- **html-to-image**
- Google Fonts: *Space Grotesk* & *JetBrains Mono*

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/mao-ovo/t-minus.git
cd t-minus

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```
