# Brand HEAT — Marketing Landing Page

High-converting, responsive marketing landing page for **Brand HEAT**, crafted with React, Tailwind CSS, and Framer Motion.

## Features

- **Exact Visual Aesthetics**:
  - Deep neutral/black canvas (`#060709`) highlighting luminous ambient effects.
  - Multi-layered bottom ambient glow using the exact brand palette sequence: `#FF6637`, `#3E3183`, `#FF6637`, `#3E3183`, `#FF6637`, `#D70417`, `#3E3183`.
  - High Gaussian blur (`100px` – `140px`) with continuous asynchronous organic loop animations.
  - Dotted texture overlay (`mix-blend-mode: overlay` radial grid) positioned directly above the bottom glow to recreate the illuminated dot matrix from the design.
- **Word-by-Word Reveal Effect**:
  - Framer Motion word tokens with `opacity: 0, filter: blur(12px), y: 20` fading to `opacity: 1, filter: blur(0px), y: 0`.
  - Staggered by `0.08s` with easing curve `[0.22, 1, 0.36, 1]`.
  - Accessible via container `aria-label`.
  - Exact font weighting matching the design: "¿Cuánto tarda **tu marca** en subirse a una conversación que ya es **tendencia?**".
- **Animated Mouse Scroll Indicator**:
  - Slim rounded pill mouse container with subtle top/bottom direction cues.
  - Animated inner scroll wheel/dot sliding vertically (`y: [0, 8, 0]`, opacity pulse) looping infinitely with `ease: "easeInOut"`.
  - Click-to-scroll to feature content.
- **Top Navigation & Brand Assets**:
  - Official Brand HEAT logo in header with aspect ratio constraints.
  - Interactive language switcher (`EN | ES`) that switches headlines and re-triggers the word-by-word reveal effect.
  - Responsive mobile drawer navigation.
- **High-Converting Sections**:
  - Value proposition pillars: Cultural Radar, Reaction Velocity (From 72h to 15 min), and AI Content Studio.
  - Call to Action for Early Access / Demo booking.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

