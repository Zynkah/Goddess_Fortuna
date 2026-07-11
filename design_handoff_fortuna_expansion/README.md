# Handoff: Goddess Fortuna — Animation, Gamification & Mythic Expansion

## Overview
This package documents a set of improvements and a larger feature expansion for the Goddess Fortuna app (repo: `Zynkah/Goddess_Fortuna`, live at goddess-fortuna.vercel.app). The app currently does: Ask a question → Cast (coin flip) → Reveal (heads/tails outcome + optional USDC tip). This handoff adds animation polish, gamification layers, and a broader mythological identity (Wheel of Fortune, Oracle mode, offerings, daily fortune, Book of Fate, rare divine events) — while keeping everything backend-free (or with an optional minimal backend for shared/cross-device state).

## About the Design Files
The file `Fortuna Improvements.dc.html` in this bundle is a **design reference built in HTML** — an interactive mockup canvas showing look, motion, and behavior for each idea, labeled with ids (1a, 1b, 2a, 3a, 4a, etc.) matching the sections below. It is NOT production code to copy in directly — it uses a custom templating runtime that only exists in this design tool. Your task is to **recreate these behaviors in the existing React/TypeScript codebase** (Vite + React, Solana wallet-adapter, existing CSS files), matching its existing component patterns, CSS approach, and file structure — not port the HTML/inline-style markup verbatim.

## Fidelity
**High-fidelity for visual style and motion timing** (colors, fonts, animation curves/durations shown are intentional and should be matched closely). **Low-fidelity for exact layout/markup** — reproduce using the codebase's existing CSS files (`fortuna.css`, `components.css`, `buttons.css`, etc.) and class conventions rather than inline styles.

---

## Part 1 — Fixes & Polish to Existing Flow

Reference: mockups `1a`–`1d` in the design file.

1. **Remove dead CSS** left over from the Solana dApp scaffold this project was built from: `.jackpot-title`, `.ev-*` rules, `.json-section`, `.coin-switch`, unused color tokens (`--purpleBlue`, `--purple`, `--teal`, `--red`), `.btn--special`, `.btn--red`. Audit `src/styles/*.css` and delete anything not referenced by the Ask/Cast/Reveal flow.
2. **Tip UI (RevealStep)**: add a "custom amount" input alongside the fixed 1/5/10 USDC pills. When wallet is not connected, replace the current disabled/inert copy with an actionable "Connect Wallet to Offer" button that triggers wallet connect directly (mockup `1b`).
3. **Loss-screen copy**: when the flip result is a loss, don't show the same "leave an offering" tip prompt copy used on a win — either hide the tip block on loss, or soften the framing (mockup `1c`, e.g. "The wheel turns on. Ask again whenever you like.").
4. **Step indicator nav**: make completed steps ("01 Ask") in the step header clickable to navigate back, with a hover/underline affordance so it's clear they're interactive (mockup `1d`).
5. **Statue image treatment**: current `mix-blend-mode: multiply` over a dark radial background reads muddy — consider a cleaner cutout/silhouette treatment.

---

## Part 2 — Animation Layer

Reference: mockups `2a`–`2d`.

### 2a. Coin flip (Cast/Reveal transition)
Replace the current flat `rotateX` spin with a real 3D toss:
- `transform-style: preserve-3d`, animate `rotateY` (not X) through ~5 full spins (1800°) plus a final 0° (heads) or 180° (tails) to land face-up.
- Add a slight arc: `translateY(-30px)` at peak, back to `0` on landing, plus `scale(1.15)` mid-flight easing back to `1`.
- Duration: ~1.6s, `cubic-bezier(.2,.8,.3,1)`.
- Coin has two faces (`HEADS` / `TAILS` divs, each `backface-visibility: hidden`, one rotated 180° in place) so the correct face is showing after the spin resolves.
- Button/label states: `CAST THE COIN` → `CASTING...` (disabled while animating) → `CAST AGAIN`.

### 2b. Reveal text stagger
After the coin lands, animate in the result in 3 sequential steps rather than all at once:
1. Outcome word (e.g. "FORTUNE FAVOURS YOU") fades/rises in first (~100ms after landing).
2. Divider line fades in next (~500ms).
3. Quote text fades in last (~850ms).
Each step: `opacity 0→1`, `translateY(14px→0)`, `0.5s ease`.

### 2c. Ambient idle glow (Ask screen)
Behind the coin/statue on the Ask screen, add a slow pulsing radial glow to signal life before interaction: `@keyframes` scaling `0.9→1.15` and opacity `0.5→1` over 3s, `ease-in-out infinite`.

### 2d. Tip button confirm feedback
On the tip button, animate through states after a send: `"5 USDC — Send Offering"` → `"Confirm in Wallet..."` (while awaiting signature) → `"✓ Confirmed"` (brief scale-up 1.08x + background brighten) → `"Offering Sent"` (settles to a muted green state) → reverts to idle after a few seconds.

---

## Part 3 — Gamification Layer (client-side only)

Reference: mockups `3a`–`3g`.

All of this can run **entirely client-side using `localStorage`** — no backend needed:

| Feature | Storage | Notes |
|---|---|---|
| **3a. Streak counter** | `localStorage`: last-visit date + streak count | Increment if last visit was exactly yesterday; reset if a day was skipped. Show as a small pill badge, e.g. "◆ 4-DAY STREAK". |
| **3b. XP / Level bar** | `localStorage`: cumulative XP int | Award XP per cast (e.g. +10). Define level thresholds and titles: Novice → Seeker → Oracle → Sage → Fortune's Child. Render as a thin gradient progress bar with "LEVEL · XP / next" label. |
| **3c. Rare "critical" outcome** | Pure `Math.random()`, e.g. 1-in-20 | On a rare roll, render the coin/result with a gold border + glow (`box-shadow`), special label ("✦ GOLDEN FORTUNE ✦"), and a rarer quote pulled from a small dedicated pool. |
| **3d. Sound toggle + SFX** | `localStorage`: sound on/off boolean | Coin clink sound on cast start, chime sound on win reveal. Use small `.mp3`/`.ogg` assets, respect the toggle, default on but muted until first user gesture (browser autoplay policy). |
| **3e. Achievement toasts** | `localStorage`: array of unlocked achievement ids | Trigger toast component (top or bottom corner) on qualifying actions: "First Offering Given", "3 Casts Today", "7-Day Streak", etc. Auto-dismiss after ~4s. |
| **3f. Win particle burst** | No storage; pure animation | On a win reveal, spawn ~10 small particles radiating outward from the coin center at even angular offsets, animating `opacity 1→0` + `translate outward` over ~0.9s, `ease-out`, then removed from DOM. |
| **3g. Session history strip** | `localStorage`: array of last 5 outcomes | Render as a row of small coin-icon circles (gold=heads, dark=tails, glowing gold=rare) reflecting the most recent casts, most recent last or first — pick one and stay consistent. |

**Implementation note:** wrap all of this in a small `useFortunaProgress()` hook (or equivalent) that reads/writes a single namespaced `localStorage` key (e.g. `fortuna:progress`) as one JSON blob `{ streak, lastVisit, xp, history: [], achievements: [], soundOn }` — simpler to reason about and migrate than many separate keys.

---

## Part 4 — Mythic Identity Expansion

Reference: mockups `4a`–`4g`. This is the larger concept: shift from "coin flip randomizer" to a full Fortuna-themed experience with three modes.

### 4a. Mode select
Before "Ask," let the user choose how Fortuna answers:
- **The Coin** — existing yes/no flip.
- **The Wheel** — spin an 8-segment wheel (see 4c).
- **The Oracle** — cryptic single-sentence answer (see 4d).

### 4b. Offering ritual (optional pre-question step)
Let the user pick a symbolic offering (Gold Coin / Olive Branch / Laurel Wreath / Flower / Nothing) before asking. Purely atmospheric — does not affect odds (or, if you want it to subtly nudge rare-event odds, document that clearly so it's an intentional design decision, not hidden manipulation).

### 4c. The Wheel
8 weighted segments: Great Fortune, Good Fortune, Favorable Winds, Uncertain, Delay, Misfortune, Fate Changes, Destiny Calls. Spin animation: wheel rotates 5+ full turns plus an offset landing it on the chosen segment under a fixed pointer, `~2.2s`, decelerating easing. Optionally re-weight segments per day (seeded by date) so it "feels" different daily without being purely uniform.

### 4d. Oracle mode
Instead of yes/no, return one cryptic sentence from a curated pool (10–20 lines, mythologically flavored — see examples in the original pasted brief). Pair with a 1–5 star "Fortune Rating" (Very Unfavorable → Very Favorable) shown as filled/unfilled stars.

### 4e. Daily Fortune card
Once per day, generate a deterministic "Today's Fortune" — Lucky Color / Number / Hour / Element + one sentence — seeded from the date string (e.g. hash of `YYYY-MM-DD`) so it's stable for that day without needing a backend, and consistent if you want everyone to see the same daily fortune. Store "already seen today" in `localStorage` to avoid re-rolling on every visit.

### 4f. Book of Fate
A running journal of past questions + answers, stored as a `localStorage` array of `{ date, question, answer, mode, cameTrue? }`. Let the user optionally mark an entry "Came True" / "Did Not" after the fact — purely their own record. Render as a scrollable list, most recent first.

### 4g. Rare divine events
Very rarely (~1-in-100 sessions — check via a `localStorage`-tracked session counter or pure random roll on load), interrupt with a special full-screen moment: background shifts to gold, a unique message appears ("Fortuna herself has appeared"), optional coin-rain particle animation, unique answer artwork/copy. Designed to be screenshot-shareable — keep it visually distinct from normal reveals.

### 4h. Constellation rewards (mentioned in brief, no mockup built — flag as a stretch goal)
Each visit/day lights a star; completing a constellation (Virgo, Leo, Lyra, Orion, Cassiopeia) unlocks a cosmetic (alternate coin/wheel skin). Straightforward extension of the same `localStorage` progress object once 3a–3g exist.

---

## Data & Backend Notes

**Everything above works with zero backend**, using one namespaced `localStorage` JSON blob per browser/device. Tradeoffs: no cross-device sync, no way to verify/share a rare event beyond a screenshot, and no global counters (e.g. "X offerings given today across all users").

**If you later want shared/cross-device state** (global offering counter, leaderboard, server-verified rare events), the free-tier path on Vercel is:
- **Vercel KV (Upstash Redis)** or **Vercel Postgres** — free tier, credentials injected as env vars (`process.env.KV_REST_API_URL`, etc.) — safe to use with a public repo as long as you never hardcode the connection string/token in committed code.
- Any write access must go through a server-side API route (Next.js route handler) — never expose a write-capable token to client code. The client calls your own `/api/...` endpoint, which holds the secret.
- Rate-limit/validate that API route since it's public-facing.
- Confirm `.env.local` (or equivalent) is `.gitignore`d before pushing — that's the actual public-repo risk, not the hosting choice itself.

This is optional — recommend starting fully local-storage-based (Parts 1–4 above) and only adding a backend if cross-device/global state becomes a real requirement.

---

## Design Tokens (from existing app, keep consistent)
- Fonts: `Cinzel` (headers/labels, letter-spacing 2–4px, uppercase), `Cormorant Garamond` (body/quotes, italic for quotes).
- Palette: background near-black (`#070502`–`#1a1a1a`), gold accents (`#c9a227`, `#e6c34d`, `#e8d5a0`), muted gold/brown for secondary text (`#8a7a52`, `#6f6034`), a muted green (`#7ea87e`) for success/confirmed states.
- Borders: 1px, `rgba(201,162,39, 0.25–0.3)` for containers; solid `#c9a227` for active/emphasized elements.

## Files
- `Fortuna Improvements.dc.html` — interactive design reference covering all sections above (ids 1a–4g match this doc's headers).
