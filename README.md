# 🪢 Royal Raksha Bandhan Surprise Website for Didi ❤️

A luxury, cinematic, Instagram-Reel style interactive digital gift built with **Next.js 15+**, **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Web Audio API**.

---

## ✨ Features & Story Journey

1. **Cinematic Landing Gate**: Dark royal atmospheric opening with breathing golden glow, ambient particles, and "Tap to Begin".
2. **3D Wax-Sealed Envelope**: Interactive wax seal break, flap unfolding animation, and glowing letter emergence.
3. **Parallax Memory Reel**: Tilted polaroid gallery connected by a continuous golden thread with dates, tags, and zoom effects.
4. **Interactive 3-Step Rakhi Ceremony (Flagship WOW moment)**:
   - **Step 1 (Tilak)**: Interactive forehead tap to apply sacred red kumkum & golden akshat rice with sparkle harmonics.
   - **Step 2 (Aarti)**: Circular finger/mouse gesture around the Diya thali with realistic temple bell resonant chimes.
   - **Step 3 (Rakhi Tying)**: Drag & drop the handcrafted Rakhi onto the brother's wrist with spring snap physics, gold confetti explosion, and haptic vibration.
5. **Sibling Banter Quiz**: 5 playful family argument questions with instant funny reactions and a custom "DIDI WINS 🏆" lifetime trophy verdict.
6. **"Things I Don't Say Enough"**: Deep emotional darkroom typography cards with slow-motion glowing transitions.
7. **3D Virtual Gift Box**: Untie the golden ribbon, pop the lid with sound effects and confetti, and reveal a secret gift location clue.
8. **Handwritten Typewriter Letter**: Royal parchment paper with progressive ink typing, wax stamps, and personal signature.
9. **Grand Celestial Finale**: 3D rotating Rakhi, floating illuminated diyas, continuous celebratory fireworks, and a "Replay Journey" CTA.
10. **Dual Audio Engine**: Built-in procedural Web Audio API synthesizer for crystal-clear SFX (temple bells, chimes, pops, sparkles) + background music player with zero-config ambient generative soundscape fallback!

---

## 🛠️ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser (optimized for mobile 390x844 & desktop)
http://localhost:3000
```

---

## 🎨 How to Personalize (No Coding Needed!)

Everything can be customized in a single configuration file:
👉 **[`src/data/rakhiConfig.ts`](src/data/rakhiConfig.ts)**

In this file, you can edit:
- **Names**: Sister's name, your name, nicknames
- **Memories**: Add or edit years, captions, stories, and photo tags
- **Quiz Questions**: Customize the funny multiple-choice questions & reaction jokes
- **Emotional Messages**: Write your own heartfelt sister quotes
- **Secret Gift Clue**: Set the clue for where her real present is waiting
- **Final Letter**: Customize the handwritten letter paragraphs and sign-off

---

## 📸 Adding Your Photos & Music

1. **Photos**: Place your photos in the `public/images/` folder:
   - `public/images/memory1.jpg`
   - `public/images/memory2.jpg`
   - `public/images/memory3.jpg`
   - `public/images/memory4.jpg`
   - `public/images/memory5.jpg`
   *(If you don't add photos, beautiful royal illustrated memory frames will display automatically!)*

2. **Music**: Place your sister's favorite song in:
   - `public/music/rakhi.mp3`
   *(If no MP3 is placed, the website automatically plays a soothing Indian classical ambient soundscape using Web Audio API)*

---

## 🚀 Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Click **Deploy**! (Zero configuration required).
4. Send the live link to your sister on Raksha Bandhan morning! 💌
