# Design System & UI Direction Specification

> **Document ID:** DOC-105  
> **Phase:** Phase 1 — Requirements, Research & Content  
> **Role:** P4 (Research, Content & QA) / P3 (Frontend Lead)  
> **Note:** Exact fine-tuned design values and style prompts will be provided by the developer during Phase 3 frontend implementation.

---

## 1. Design Philosophy

**UCEST One** reflects the dignity, academic authority, and forward-looking technological excellence of JNTUH UCEST. The design bridges traditional prestige with modern digital speed:
- **Clean & Academic**: Generous whitespace, structured hierarchies, intentional typography.
- **Vibrant & Elevated**: Refined navy primary tones accented with gold highlights, avoiding muddy or flat colors.
- **Responsive & Tactile**: Smooth micro-interactions, subtle shadow elevations, and crisp focus rings.

---

## 2. Baseline Color Palette (Design Tokens)

*Subject to fine-tuning via developer's Phase 3 design prompt.*

```css
:root {
  /* Brand Primaries */
  --color-primary-navy-900: #0A192F;  /* Deepest navy, headers, dark mode bg */
  --color-primary-navy-800: #0F2042;  /* Core brand navy, navbar */
  --color-primary-navy-700: #1E3A8A;  /* Accent blue, interactive links */

  /* Brand Accents (Gold) */
  --color-accent-gold-500:  #D4AF37;  /* Metallic institutional gold */
  --color-accent-gold-400:  #E5C158;  /* Hover state gold */
  --color-accent-gold-600:  #B8860B;  /* Deep gold for borders/badges */

  /* Neutral Surface & Backgrounds */
  --color-neutral-50:       #F8FAFC;  /* Light page background */
  --color-neutral-100:      #F1F5F9;  /* Card subtle background */
  --color-neutral-200:      #E2E8F0;  /* Standard border */
  --color-neutral-700:      #334155;  /* Secondary text */
  --color-neutral-900:      #0F172A;  /* Primary body text */
  --color-white:            #FFFFFF;  /* Pure white cards / modals */

  /* Feedback & Indicators */
  --color-success:          #10B981;  /* Attendance >= 75%, passed exams */
  --color-warning:          #F59E0B;  /* Attendance 65%-74% condonation alert */
  --color-danger:           #EF4444;  /* Attendance < 65% detention risk, fee dues */
  --color-info:             #3B82F6;  /* Notice badges, general alerts */
}
```

---

## 3. Typography & Hierarchy

### Primary Font Families
- **Display & Headings**: Inter or Outfit (Google Fonts) with tight optical kerning.
- **Body & Data Tables**: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto.
- **Monospace (Roll numbers, Code)**: JetBrains Mono / Fira Code.

### Type Scale
- `Display Hero`: 2.5rem (40px) - 3.5rem (56px), Weight 700 / 800
- `H1 Page Title`: 2.0rem (32px) - 2.5rem (40px), Weight 700
- `H2 Section Title`: 1.5rem (24px) - 1.875rem (30px), Weight 600
- `H3 Card Title`: 1.25rem (20px), Weight 600
- `Body Large`: 1.125rem (18px), Weight 400 / 500
- `Body Standard`: 1.0rem (16px), Weight 400
- `Small / Badges`: 0.875rem (14px), Weight 500 / 600
- `Caption / Timestamps`: 0.75rem (12px), Weight 400

---

## 4. Breakpoints & Responsive Grid

Standard mobile-first breakpoint ladder:
- `sm`: 640px (Small tablets & landscape phones)
- `md`: 768px (Tablets portrait)
- `lg`: 1024px (Laptops / Small desktops)
- `xl`: 1280px (Standard desktops)
- `2xl`: 1536px (Large wide monitors)

---

## 5. Reusable Component Patterns

### 5.1 Navigation Bar
- Top alert banner for urgent circular ticker.
- Main sticky navbar with University Crest / Logo, College title, navigation dropdowns, and high-visibility "Portal Login" action button.
- Mobile slide-out drawer with high-contrast links.

### 5.2 Notice Card Component
- Date badge on left (`DD MMM YYYY`).
- Title with category tag (`EXAM`, `ACADEMIC`, `EVENTS`).
- Brief excerpt and expandable modal reader.
- "PINNED" ribbon for urgent notices.

### 5.3 Student Portal Attendance Meter
- Circular or bar progress gauge showing overall percentage.
- Color dynamic: Green (>= 75%), Amber (65-74%), Red (< 65%).
- Subject-by-subject expandable rows with attended / total classes count.

### 5.4 Timetable Grid
- Responsive tab selector (Monday through Friday).
- Period cards showing time slot (e.g. `09:30 - 10:30 AM`), subject code, faculty name, and room number.

---

*Authored by: P4 (Research, Content & QA Lead)*
