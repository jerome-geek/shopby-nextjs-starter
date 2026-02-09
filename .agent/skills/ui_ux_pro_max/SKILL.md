---
name: UI/UX Pro Max
description: A comprehensive guide to building premium, high-end web interfaces with smooth interactions and modern aesthetics.
---

# UI/UX Pro Max Skill

## 🎯 Goal

Create web applications that feel **"Premium"**, **"Alive"**, and **"Fluid"**. Don't just build functional UI; build _experiences_.

## 💎 Core Principles

### 1. Motion & Interaction (The "Feel")

- **Smooth Scrolling**: Must use `lenis` or similar for momentum-based scrolling.
- **Micro-interactions**:
    - Buttons should scale down slightly on click (`scale: 0.98`).
    - Hover states should smooth transition (`transition-all duration-300`).
    - Lists should stagger-animate in (`framer-motion` variants).
- **Page Transitions**: No abrupt jumps. Use fade-ins or slide-ins between routes.

### 2. Aesthetics (The "Look")

- **Typography**:
    - Use `Inter`, `Geist Sans`, or `Outfit`.
    - Tight tracking (letter-spacing) for large headings (`-0.02em`).
    - Relaxed line-height for body text (`1.6`).
- **Glassmorphism**:
    - Use `backdrop-filter: blur(12px)` for sticky headers, modals, and floaters.
    - Subtle borders: `border: 1px solid rgba(255, 255, 255, 0.1)`.
- **Shadows**:
    - Never use default black shadows. Use colored, multi-layered shadows for depth.
    - Example: `shadow-[0_8px_30px_rgb(0,0,0,0.12)]`.

### 3. Mobile Experience

- **Touch-First**:
    - Tap targets must be at least 44px.
    - Use **Bottom Sheets (Drawers)** instead of centered modals on mobile (`vaul`).
- **Haptics**: (If applicable via Web Vibration API) provide subtle feedback.

## 🛠️ Tech Stack Recommendations

- **Styling**: Tailwind CSS (with `cntl` or `clsx`) or Vanilla Extract.
- **Animation**: `framer-motion` (complex), CSS Transitions (simple).
- **Icons**: `lucide-react` (stroke-width: 1.5px for elegance).
- **Components**: `radix-ui` (headless accessibility).

## 🚫 Anti-Patterns (What NOT to do)

- **Generic Colors**: Avoid pure `#000000` or `#blue`. Use dark charcoal (`#111`) or slate 900.
- **Janky Animations**: Avoid animating `width`, `height`, `top`, `left`. Animate `transform` and `opacity` only.
- **Scroll Hijacking**: Never mess with native scroll unless using a proven library like `lenis`.
- **Loading Spinners**: Avoid full-screen spinners. Use **Skeleton Loaders** or **Blur-up** images.

## 📋 Checklist for Every Component

1. [ ] Is it responsive?
2. [ ] Does it have a hover state?
3. [ ] Does it have a focus state (visible but pretty ring)?
4. [ ] Does it animate in?
5. [ ] Is the contrast ratio accessible?
