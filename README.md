# For My Favourite Person ❤️

A premium, romantic, interactive birthday surprise website built with React, Vite, TypeScript, and Tailwind CSS.

## 🌟 Demo Content
- **Boyfriend:** Alex
- **Girlfriend:** Sophia
- **Nickname:** Princess
- **Birthday Date:** November 19
- **Language:** English + Hinglish
- **Theme:** Romantic pink, lavender, and warm cream

---

## 🎨 Complete Journey Overview

1. **🎁 Phase 1: Landing Page**
   - Full-screen soft pink, lavender, and cream gradient with ambient glowing orbs.
   - Floating animated hearts ❤️, glowing stars ✨, and flower petals 🌸.
   - Heading: `"Hey Princess ❤️"` with `"Someone has created something special just for you..."`.
   - Glowing 3D-styled animated gift box with breathing halo.
   - Interactive button: `"Open Your Surprise 🎁"` with shimmer, audio flourish, confetti burst, and smooth transition.

2. **🎂 Phase 2: Interactive Birthday Celebration**
   - Header: `"Happy Birthday, Sophia! ❤️"` and subtitle `"Today is all about you, Princess."`.
   - 3D-style CSS tiered birthday cake with scalloped cream borders, dripping frosting, sprinkles, and platter.
   - Three animated candles with flickering flames and glowing halos.
   - Interactive button: `"Make a Wish ✨"` that extinguishes flames with rising smoke puffs and fairy dust sparkles.
   - Displays `"May all your wishes come true! ❤️"`, multi-stage confetti, and side fireworks.
   - Animated typing birthday message with calligraphic quote box.
   - Navigation: `"Ready to see our beautiful memories?"` → `"Let's Go ❤️"`.

3. **📸 Phase 3: Our Little Memories**
   - Header: `"Our Little Memories ❤️"` and subtitle `"Every picture has a story, and every moment with you is special."`.
   - 6 Polaroid-style couple photo cards with authentic rotations (`-2.5°` to `+2.2°`), washi tape, and handwritten captions.
   - Full-screen photo lightbox with previous/next arrows, keyboard (`Escape`, `ArrowLeft`, `ArrowRight`), and mobile touch swipe.
   - Vertical glowing timeline featuring 4 key milestones.
   - Navigation: `"These memories are beautiful, but I have something more to tell you..."` → `"Read My Letter 💌"`.

4. **💌 Phase 4: A Letter From My Heart**
   - Header: `"A Letter From My Heart"`.
   - 3D CSS envelope with folding side flaps and heart-shaped wax seal.
   - Interactive button: `"Open Your Letter 💌"` with 3D flap flip, wax unseal sound, and confetti.
   - Sequential paragraph typing animation with a `"Skip Animation"` button for instant reveal.
   - Navigation: `"Still wondering why you're so special to me?"` → `"Let Me Tell You ❤️"`.

5. **💖 Phase 5: Reasons Why I Love You**
   - Header: `"Reasons Why You're My Favourite Person ❤️"`.
   - 8 interactive 3D flip cards (`rotateY(180deg)`) in a responsive grid.
   - Live progress indicator: `"You've discovered X of 8 reasons"` with smooth progress bar.
   - `"Reveal All Reasons ✨"` / `"Flip All Back"` toggle button.
   - Milestone celebration upon revealing all 8 reasons.
   - Navigation: `"And now... one last little surprise awaits you."` → `"Open Your Final Surprise 🎁"`.

6. **🌙❤️ Phase 6: The Final Surprise**
   - Full-screen cinematic night sky with crescent moon, glowing lunar corona, twinkling stars, and drifting clouds.
   - Final message reveal: `"If I could make one wish today, it would be to see you smile every single day..."`.
   - Large glowing animated heart with button: `"Send You All My Love ❤️"`.
   - Heart burst animation, fireworks, and message: `"Sending you endless love, hugs and happiness! ❤️"`.
   - Handwritten signature: `"Forever Your Favourite Person"` & `"With Love, Alex ❤️"`.
   - `"Replay Our Story ↻"` button resetting the experience cleanly to Phase 1 without browser refresh.

7. **🎶 Global Music System**
   - Single unified music instance across the entire website.
   - Persistent playback state that never restarts on section navigation.
   - Play / Pause button with live animated equalizer bars.
   - Visible Mute / Unmute volume toggle.
   - Supports local MP3 (`/audio/romantic-bgm.mp3`) with automatic fallback to pure synthesized Web Audio API romantic music box melody (100% offline, zero missing-file errors).
   - Strictly no autoplay before user interaction.

---

## 🛠️ Step-by-Step Customization Guide

Personalize this website for your special someone in just a few minutes:

### 1. Change Names, Nickname & Event Date
Open [src/config/siteConfig.ts](file:///home/raj/essensials/ankit/src/config/siteConfig.ts) and edit:
```typescript
export const SITE_CONFIG = {
  boyfriend: {
    name: 'Alex',           // ← Replace with your name
  },
  girlfriend: {
    name: 'Sophia',         // ← Replace with girlfriend's name
    nickname: 'Princess',   // ← Replace with her nickname
  },
  event: {
    title: 'Happy Birthday',
    date: 'November 19',    // ← Replace with her birthday date
    tagline: 'For My Favourite Person ❤️',
  },
  audio: {
    trackName: 'Romantic Melody',
    localFilePath: '/audio/romantic-bgm.mp3',
  },
} as const;
```

### 2. Customize the Love Letter
Open [src/data/letterData.ts](file:///home/raj/essensials/ankit/src/data/letterData.ts) and edit the greeting, paragraphs, closing, and signature:
```typescript
export const LOVE_LETTER: LoveLetterData = {
  greeting: 'My Dearest Princess,',
  paragraphs: [
    "Your custom paragraph 1...",
    "Your custom paragraph 2...",
  ],
  closing: 'Forever Yours,',
  signature: 'Alex',
};
```

### 3. Customize the 8 Reasons Cards
Open [src/data/reasonsData.ts](file:///home/raj/essensials/ankit/src/data/reasonsData.ts) and edit the titles, emojis, and messages.

### 4. Replace Demo Photos with Your Real Couple Photos
1. Place 6 photos into the folder `public/photos/` (or `public/images/memories/`):
   - `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
2. Open [src/data/memoriesData.ts](file:///home/raj/essensials/ankit/src/data/memoriesData.ts) and update `imageUrl`, `caption`, and `date`:
   ```typescript
   {
     id: 1,
     imageUrl: '/photos/photo1.jpg',
     caption: 'Our First Beautiful Memory',
     date: 'Summer 2024',
     rotation: -2.5,
   }
   ```
*(Note: Bundled romantic SVG illustrations are included out-of-the-box so the gallery works 100% offline without remote dependencies).*

### 5. Add Custom Background Music (Optional)
Place any MP3 audio file at:
```text
public/audio/romantic-bgm.mp3
```
If not added, the website automatically plays the gentle built-in romantic melody synthesized through the browser Web Audio API.

---

## 🚀 How to Run the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 📦 How to Build and Manually Deploy

```bash
# Type check without emitting files
npx tsc --noEmit

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

### Manual Deployment Options:
The production build outputs static HTML, CSS, and JavaScript files into the **`dist/`** directory.

You can deploy this directory to any modern static hosting service:
1. **Netlify:** Drag and drop the `dist/` folder into the Netlify dashboard.
2. **Vercel:** Run `vercel deploy` or link your repository with `npm run build` as build command and `dist` as output directory.
3. **Cloudflare Pages:** Upload the `dist/` folder.
4. **GitHub Pages:** Deploy the contents of the `dist/` folder.
5. **Any Apache / Nginx / Caddy server:** Copy `dist/` to your web root (`/var/www/html`).
# birthday_wish
