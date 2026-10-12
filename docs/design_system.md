# Design System — Orderful Command Deck Style Guide

> **Document ID:** DOC-105  
> **Source:** Orderful Style Reference  
> **Philosophy:** *Industrial command deck — a logistics dispatcher's printed control sheet in black ink and surgical vermillion, every page restrained enough to let a single CTA shout.*  
> **Theme:** Light (Paper & Vellum canvas, Ink Black & Slate typography, Surgical Vermillion action punctuation)

---

## 1. Core Visual Principles

1. **Achromatic Discipline**: Near-pure achromatic surface where black-and-white typography meets a single surgical vermillion accent. Most screens remain monochrome, letting the single red-orange mark function as the sole actionable signal.
2. **Universal 8px Radius**: Standardized 8px border-radius across all containers, cards, buttons, inputs, tags, and navbars. Strictly **never** use 4px, 6px, 12px, or pill (9999px) border radii.
3. **Restrained Editorial Typography**: Grotesk type spanning weights 100–700. Large display headlines (48–72px) use tight negative tracking (`−0.025em` to `−0.03em`) in light-to-regular weights (300–500) rather than heavy bold, giving authoritative restraint. Uppercase eyebrows expand with `0.025em` tracking for an industrial-label voice.
4. **Disciplined Elevation**: Single two-layer shadow stack used sparingly: `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px`.
5. **8px Grid Rhythm**: Base 8px spacing unit (8, 16, 24, 32, 40, 48, 64, 80, 96px). Section gap of 64px. Max width 1200px centered.

---

## 2. Design Tokens

### 2.1 Color Tokens
```css
:root {
  /* Action Punctuation */
  --color-vermillion-signal: #e42b0c;
  --gradient-vermillion-signal: linear-gradient(94deg, rgb(255, 2, 1) -33.85%, rgb(255, 120, 2) -1.54%, rgb(255, 2, 1) 73.55%);

  /* Neutrals & Typography */
  --color-ink-black: #000000;
  --color-carbon: #1f1f1f;
  --color-slate-900: #101828;  /* Display and heading text, dominant typographic color */
  --color-slate-700: #364153;  /* Navigation text, active items, secondary headings */
  --color-slate-600: #4a5565;  /* Body copy, sub-text, icon strokes, eyebrow labels */
  --color-steel: #676767;      /* Subdued text */
  --color-iron: #8a8a8a;       /* Tertiary helper text, dividers */
  --color-mist: #99a1af;       /* Icon borders, disabled states, placeholders */
  --color-cloud: #d4d4d4;      /* Button borders, input borders, dividers */
  --color-frost: #e5e7eb;      /* Card hairline borders, subtle container edges */

  /* Surfaces */
  --color-paper: #ffffff;      /* Card surfaces, primary content canvas */
  --color-vellum: #f5f5f5;     /* Page canvas base */
  
  /* Semantic Status Indicators */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #e42b0c;
}
```

### 2.2 Typography Scale
```css
:root {
  --font-primary: 'telegraf', Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-secondary: 'modernGothic', Inter, sans-serif;

  --text-micro: 12px;
  --leading-micro: 1.5;
  --tracking-micro: 0.3px;

  --text-caption: 14px;
  --leading-caption: 1.43;

  --text-body-sm: 16px;
  --leading-body-sm: 1.5;

  --text-body: 18px;
  --leading-body: 1.5;

  --text-body-lg: 20px;
  --leading-body-lg: 1.43;

  --text-subheading: 24px;
  --leading-subheading: 1.38;

  --text-heading-sm: 30px;
  --leading-heading-sm: 1.33;

  --text-heading: 48px;
  --leading-heading: 1.2;
  --tracking-heading: -1.2px;

  --text-heading-lg: 60px;
  --leading-heading-lg: 1.0;
  --tracking-heading-lg: -1.5px;

  --text-display: 72px;
  --leading-display: 1.0;
  --tracking-display: -2.16px;
}
```

### 2.3 Spacing & Geometry
```css
:root {
  --radius-universal: 8px;

  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;

  --page-max-width: 1200px;
  --section-gap: 64px;

  --shadow-subtle: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
}
```

---

## 3. Component Blueprints

### 3.1 Vermillion Filled Action Button (Primary CTA)
- Background: `#e42b0c`
- Text: `#ffffff`, 14–16px weight 500, uppercase, tracking `0.025em`
- Border-radius: `8px`
- Padding: `12px 24px` (compact) or `16px 24px` (comfortable)
- Trailing arrow icon: `→`
- Usage rule: *At most one per visible fold*.

### 3.2 Sunset Gradient Nav Button (Sole Conversion in Header)
- Background: `linear-gradient(94deg, #ff0201 -33.85%, #ff7802 -1.54%, #ff0201 73.55%)`
- Text: `#ffffff` uppercase, 14px weight 600, tracking `0.025em`
- Border-radius: `8px`, padding `12px 20px`

### 3.3 Carbon Dark Action Button (Secondary CTA)
- Background: `#1f1f1f`
- Text: `#ffffff`, 14px weight 500 uppercase, tracking `0.025em`
- Border-radius: `8px`, padding `16px 24px`

### 3.4 Outlined Eyebrow Pill Badge
- Border: `1px solid #d4d4d4`
- Background: transparent
- Border-radius: `8px`
- Padding: `4px 12px`
- Text: 12px weight 500 uppercase, `#4a5565`, tracking `0.3px`

### 3.5 Feature / Department Card
- Surface: `#ffffff`
- Border: `1px solid #e5e7eb`
- Border-radius: `8px`
- Padding: `32px`
- Shadow: `--shadow-subtle`
- Title: 24px weight 400 at `#101828`
- Body: 16px weight 400 at `#4a5565`, line-height `1.5`
- Trailing link: `Learn more →` in `#4a5565`

### 3.6 Stat Block
- Value: 60px weight 300 in `#101828`, tracking `−1.5px`
- Label: 14px weight 400 in `#4a5565`, line-height `1.43`
- Direct float on section surface without chrome

### 3.7 Form Text Inputs
- Surface: `#ffffff`
- Border: `1px solid #d4d4d4`
- Border-radius: `8px`
- Height: `48px`, padding `12px 16px`
- Focus: `1px solid #101828` (no glow)

---

## 4. Strict Do's and Don'ts

| Do | Don't |
| :--- | :--- |
| Use `#e42b0c` exclusively for filled primary action buttons & 1-2px action borders | **Never** use `#e42b0c` for text links, background decoration, or non-action elements |
| Apply `8px` border-radius uniformly to all elements | **Never** use 4px, 6px, 12px, or 9999px pill radii |
| Set display headlines at 48–72px with tight `−0.025em` to `−0.03em` tracking | **Never** set display text in weight 700 bold; prefer 300–500 light/regular |
| Maintain monochrome restraint with Vellum, Paper, and Slate | **Never** introduce secondary saturated chromatic colors |
| Keep body text at 16–18px with generous 1.5 line height | **Never** use body text below 14px (12px reserved for uppercase eyebrows only) |

---

*Adopted into UCEST One Design Architecture.*
