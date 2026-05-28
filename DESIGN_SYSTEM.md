# DESIGN_SYSTEM.md — Beach House Moving

> Defines every design token, typographic rule, spacing system, and component pattern used across the site. Tailwind config must mirror this file. Agents must not deviate from these tokens.

---

## Design Philosophy

This is a **premium local service business** website. The aesthetic should feel:
- **Coastal but professional** — beachy without being kitschy
- **Clean and airy** — white space is your friend
- **Trust-building** — structured layouts, clear hierarchy, no visual chaos
- **Mobile-first** — the majority of visitors are on their phones

Inspiration: think luxury Florida real estate meets modern service business. Not a surf shop, not a corporate grey box.

---

## Color Palette

### Brand Colors

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `brand-navy` | `#1B2B4B` | `bg-brand-navy` | Primary backgrounds, navbar, footer |
| `brand-coral` | `#E85D3D` | `bg-brand-coral` | Primary CTA buttons, accents |
| `brand-coral-dark` | `#C94828` | `bg-brand-coral-dark` | CTA hover state |
| `brand-sand` | `#F5F0E8` | `bg-brand-sand` | Alternate section backgrounds |
| `brand-teal` | `#2A9D8F` | `bg-brand-teal` | Secondary accents, icons, badges |
| `brand-gold` | `#E9C46A` | `bg-brand-gold` | Star ratings, highlights |
| `brand-white` | `#FFFFFF` | `bg-white` | Primary section backgrounds |

### Text Colors

| Token | Hex | Usage |
|---|---|---|
| `text-primary` | `#1B2B4B` | Body copy, headings on light backgrounds |
| `text-secondary` | `#4A5568` | Subtext, descriptions, captions |
| `text-muted` | `#718096` | Placeholders, fine print |
| `text-on-dark` | `#FFFFFF` | Text on navy/dark backgrounds |
| `text-on-dark-muted` | `#CBD5E0` | Secondary text on dark backgrounds |

### Semantic Colors

| Usage | Color |
|---|---|
| Success | `#38A169` |
| Error | `#E53E3E` |
| Warning | `#D69E2E` |
| Info | `brand-teal` |

---

## Typography

### Font Stack

- **Headings:** `Playfair Display` (Google Fonts) — elegant, coastal, trustworthy
- **Body:** `Inter` (Google Fonts) — clean, readable, professional
- **Mono (code/labels):** `JetBrains Mono` (only if needed for technical content)

### Font Sizes (Tailwind Scale)

| Usage | Class | Size |
|---|---|---|
| Display / Hero H1 | `text-5xl md:text-7xl` | 48px / 72px |
| Page H1 | `text-4xl md:text-5xl` | 36px / 48px |
| Section H2 | `text-3xl md:text-4xl` | 30px / 36px |
| Card H3 | `text-xl md:text-2xl` | 20px / 24px |
| Body Large | `text-lg` | 18px |
| Body | `text-base` | 16px |
| Small / Caption | `text-sm` | 14px |
| Fine Print | `text-xs` | 12px |

### Font Weights

| Usage | Class |
|---|---|
| Display headings | `font-bold` (700) |
| Section headings | `font-semibold` (600) |
| Body | `font-normal` (400) |
| Labels / badges | `font-medium` (500) |

### Line Heights
- Headings: `leading-tight` (1.25)
- Body: `leading-relaxed` (1.625)
- Small text: `leading-normal` (1.5)

---

## Spacing System

Use Tailwind's default 4px base scale. Key spacings:

| Token | Value | Common Usage |
|---|---|---|
| `p-4` | 16px | Card internal padding (mobile) |
| `p-6` | 24px | Card internal padding (desktop) |
| `p-8` | 32px | Section horizontal padding |
| `py-16` | 64px | Section vertical padding (mobile) |
| `py-24` | 96px | Section vertical padding (desktop) |
| `gap-6` | 24px | Card grid gap |
| `gap-8` | 32px | Section gap |
| `max-w-7xl mx-auto` | 1280px max | All content containers |
| `px-4 md:px-8` | Content side padding | Container horizontal padding |

---

## Tailwind Config Extension

Add to `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      brand: {
        navy:       '#1B2B4B',
        coral:      '#E85D3D',
        'coral-dark': '#C94828',
        sand:       '#F5F0E8',
        teal:       '#2A9D8F',
        gold:       '#E9C46A',
      },
    },
    fontFamily: {
      heading: ['Playfair Display', 'Georgia', 'serif'],
      body:    ['Inter', 'system-ui', 'sans-serif'],
    },
    borderRadius: {
      'brand': '12px',    // Standard card radius
      'brand-lg': '20px', // Hero elements
    },
    boxShadow: {
      'brand':    '0 4px 24px rgba(27, 43, 75, 0.08)',
      'brand-lg': '0 8px 40px rgba(27, 43, 75, 0.12)',
      'brand-hover': '0 12px 48px rgba(27, 43, 75, 0.18)',
    },
  },
},
```

---

## Component Patterns

### CTA Button (Primary)
```
bg-brand-coral text-white font-semibold px-8 py-4 rounded-brand
hover:bg-brand-coral-dark transition-colors duration-200
text-base tracking-wide shadow-brand hover:shadow-brand-hover
```

### CTA Button (Secondary / Ghost)
```
border-2 border-brand-navy text-brand-navy font-semibold px-8 py-4 rounded-brand
hover:bg-brand-navy hover:text-white transition-colors duration-200
```

### Phone CTA Button (Sticky / Mobile)
```
bg-brand-teal text-white font-semibold px-6 py-3 rounded-full
hover:bg-teal-700 transition-colors duration-200
flex items-center gap-2
```

### Service Card
```
bg-white rounded-brand shadow-brand hover:shadow-brand-hover
transition-shadow duration-300 p-6 flex flex-col gap-4
border border-gray-100
```

### Trust Badge
```
flex items-center gap-3 text-brand-navy
icon: text-brand-teal w-6 h-6
label: text-sm font-semibold
```

### Section Container
```html
<section className="py-16 md:py-24 bg-[section-color]">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    <!-- content -->
  </div>
</section>
```

### Section Heading Block
```html
<div className="text-center mb-12 md:mb-16">
  <p className="text-brand-teal font-semibold text-sm uppercase tracking-widest mb-2">
    [Eyebrow Label]
  </p>
  <h2 className="font-heading text-3xl md:text-4xl text-brand-navy font-bold mb-4">
    [Section Headline]
  </h2>
  <p className="text-secondary text-lg max-w-2xl mx-auto">
    [Supporting description]
  </p>
</div>
```

---

## Animation Guidelines (Framer Motion)

### Scroll-triggered fade-up (standard section reveal)
```typescript
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};
```

### Stagger children (card grids)
```typescript
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};
```

### Rules
- Never animate on desktop if `prefers-reduced-motion` is set (use `useReducedMotion()`)
- Keep durations between 300ms–600ms
- Only animate `opacity`, `y` (transform), `scale` — never `width`, `height`, or layout properties
- No looping animations on the homepage (distracting)

---

## Imagery Guidelines

- **Hero image:** Aerial or ground-level shot of moving crew, truck, or coastal FL neighborhood. Warm, sunny, professional.
- **Service section icons:** lucide-react icons in `brand-teal` color
- **Photos:** Real-looking stock or actual team photos. No cheesy clipart.
- **Aspect ratios:** Hero 16:9, Service cards 4:3, Testimonial avatars 1:1 circle
- **All images via `next/image`** with explicit dimensions and `alt` text

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| `sm` | 640px | Still mobile-style |
| `md` | 768px | 2-column grids begin |
| `lg` | 1024px | 3-column grids, full nav |
| `xl` | 1280px | Max content width hit |
| `2xl` | 1536px | No layout changes needed |
