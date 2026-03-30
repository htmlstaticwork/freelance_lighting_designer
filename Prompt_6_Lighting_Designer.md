# Prompt — Freelance Lighting Designer (Theatre/Film) Portfolio

> **Dashboard: No** — Pure visual portfolio. No admin panel.

---

## IDENTITY & CONCEPT

Build a complete multipage portfolio for **"LuxFrame"** — a freelance lighting designer working across theatrical productions and film sets. The site must feel like **stepping into a dark theatre just before the lights hit** — atmospheric, dramatic, cinematic. Not a generic creative portfolio. Every section should make the visitor feel the emotional power of light.

**Technology**: Bootstrap 5 + Bootstrap Icons + Vanilla JS only.  
**Branding**: Single SVG logo (spotlight-beam icon + "LuxFrame" text). Reuse everywhere. Favicon from SVG.

---

## ANTI-REDUNDANCY RULES (MANDATORY)

- ❌ No generic portfolio grids (square thumbnails, hover-to-reveal title).
- ❌ No "About Me" paragraph + headshot as the first section.
- ❌ No repeated card styles across pages.
- ✔ Every section must reflect **lighting design** — cue sheets, color temperatures, intensity, mood.
- ✔ Visual tone must use **actual light/shadow contrast** as a design element — not decoration, structure.
- ✔ If a section could belong to a web designer or photographer portfolio, **redesign it**.

---

## FOLDER STRUCTURE (STRICT — DO NOT CHANGE)

```
luxframe/
├── index.html
├── home-2.html
├── about.html
├── services.html
├── service-details.html
├── blog.html
├── blog-details.html
├── pricing.html
├── contact.html
├── 404.html
├── coming-soon.html
└── assets/
    ├── css/
    │   ├── style.css
    │   ├── dark-mode.css
    │   └── rtl.css
    ├── js/
    │   └── main.js
    ├── images/
    └── fonts/
```

❌ No extra folders. ❌ No nested page directories.

---

## DESIGN SYSTEM

**Palette** (STRICT — 3 colors only):
- **Black** (#000) → text in light mode.
- **White** (#FFF) → backgrounds in light mode, text in dark mode.
- **Accent: Stage Gold** (#D4A017) → buttons, links, hover glows, spotlight accents, all highlights.
- ❌ NO other colors. No Deep Midnight accent, no grey, no muted tones.

**Typography**:
- H1: 40–48px. Elegant serif or geometric sans-serif.
- H2: 32–36px. H3: 24–28px. Body: 16–18px.
- Line height: 1.25–1.5. Max 2–3 font families. Use Google Fonts.

**Dark Mode**: Separate `dark-mode.css` file. Near-black (#0A0A0F) as default feel. Light mode available. Theme toggle in header.

**RTL**: Separate `rtl.css` file. Full support.

---

## RESPONSIVE BREAKPOINTS (NON-NEGOTIABLE)

- **280px – 1100px** → Hamburger ONLY, Offcanvas, centered logo.
- **1100px+** → Full desktop nav.

Test at: 320px, 480px, 768px, 1024px, 1440px.

Mobile-specific:
- Touch-friendly buttons (minimum 44px).
- Reduced animations on mobile.
- Optimized image sizes for mobile data.

---

## HEADER (ALL PAGES IDENTICAL)

Logo, Nav (Home, Portfolio, Productions, Services, Blog, Contact), Login/Register (same color), Theme toggle (top-right).

## FOOTER (ALL PAGES IDENTICAL)

4 columns (Brand/Social, Productions, Resources, Newsletter). © 2026. Back-to-top.

---

## HOME 1 (`index.html`) — "Light Tells the Story"

**S1 — Blackout-to-Reveal** (NOT a standard hero): The page loads to a **completely black viewport**. After 1.5 seconds, a single CSS spotlight animation "fades up" from center, illuminating the H1: "Light Tells the Story." Below, a sub-line appears: "Theatrical & Film Lighting Design by LuxFrame." Then CTA appears: "View Productions." The entire sequence is choreographed like a lighting cue — JS-timed fade classes. No stock image. The page IS the portfolio piece.

**S2 — Production Reel Strip** (NOT a thumbnail grid): A **horizontal scrolling strip** of 6 production "frames" — each frame is a tall card showing: production title, venue/studio, year, role (Lighting Designer / LD Associate), and a genre badge (Drama, Musical, Horror Film, Dance). On hover, the card's background shifts from dark to a warm amber glow (CSS transition simulating a light wash). Desktop: horizontal scroll. Mobile: vertical stack. Even count.

**S3 — The Cue Sheet** (Domain-specific): A section styled as an actual **lighting cue sheet** — a formatted table showing: Cue #, Description ("Sunrise over Act 2 balcony"), Intensity (%), Color Temp (3200K / 5600K), Fade Time (3s / 0s snap). 6 rows from an actual production. Styled as a clean, monospaced data table with subtle row highlights.

**S4 — "Light vs. No Light" Comparison**: A **2-column split** — left shows a "scene without design" (flat, evenly lit stage description in text), right shows "scene with LuxFrame" (dramatic, sculpted, emotional — described with specific techniques: "cross-key at 45°, CTO gel on face, blue cyc wash"). The contrast is in the words, not just images.

**S5 — Director Testimonials** (NOT a carousel): **2 stacked "director's notes"** — styled as handwritten notes on dark paper. Each: director name, production title, a 2-line quote. Overlapping layout with CSS transforms. Max 2.

**S6 — CTA**: Dark section. H2: "Every stage is a blank canvas. Let's paint it with light." Email + "Discuss Your Production."

---

## HOME 2 (`home-2.html`) — "Behind the Rig"

**S1 — Equipment Showcase**: A **2×2 grid** of gear categories: Moving Heads, Ellipsoidals, LED Wash, Haze & Atmospherics. Each card: equipment type, 1-line usage note, brand example.

**S2 — Process: From Script to Stage**: 4 phases in alternating left-right layout: "Read the Script" → "Design the Plot" → "Program the Cues" → "Tech Rehearsal."

**S3 — Genre Versatility**: A **tag cloud** of genres: Shakespeare, Immersive Theatre, Horror Film, Contemporary Dance, Opera, Music Video, Fashion Show. Styled as backlit tags.

**S4 — Blog Preview**: 2-column, 2 posts.
**S5 — CTA**: Same as Home 1 S6.

---

## OTHER PAGES

**about.html**: Career timeline → Philosophy blockquote → 2×2 training/certs → Collaborator logos.
**services.html**: 6 service cards (2×3): "Full Production LD," "Lighting Consultation," "Cue Programming," "Lighting Plot Design," "Tech Rehearsal Direction," "Festival/Event Lighting."
**service-details.html**: Hero → Process (4 steps) → Deliverables → FAQ → CTA.
**blog.html**: Search + filter (Theatre, Film, Technique, Gear Reviews). Full-width posts.
**blog-details.html**: Article + sidebar.
**pricing.html**: 2-column (Single Production vs. Retainer).
**contact.html**: Form (Name, Email, Production Type dropdown, Venue, Dates, Message).
**404.html**: "This page is in blackout. Cue not found." + Return Home.
**coming-soon.html**: "Standby… Stand by… GO." + countdown + email signup.

---

## FORM VALIDATION

All forms must include client-side validation with clear error messages, tooltips, and visual feedback.

## CRITICAL RULES

❌ No low contrast. ❌ No overlaps. ❌ No horizontal scroll. ❌ No inconsistent buttons. Even grids only (2×1, 2×2, 2×3).

## PERFORMANCE & SEO

- Optimize images (alt text, WebP). Minimal CSS/JS minified for production.
- SEO meta tags on every page. Unique title tags (60 chars max). Meta descriptions (150–160 chars).
- One H1 per page, proper heading hierarchy. JSON-LD structured data. PageSpeed 90+.

## CODE QUALITY

- HTML: Semantic markup, proper heading hierarchy. CSS: CSS variables for theming.
- JavaScript: ES6+, modular, no console logs. Code comments for sections and functions.

## FINAL CHECKLIST

✔ Readable text. ✔ Working buttons/nav. ✔ Dark mode. ✔ RTL. ✔ No spacing issues. ✔ Forms validated. ✔ Cross-browser tested. ✔ Accessibility tested. ✔ Images optimized with alt text.
