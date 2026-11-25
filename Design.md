# Design.md — visual rules for the LMS prototype

> Reference for every style in this repo. Source of truth: Figma file Foundation (`fkI3mGHWAToov6nhyWUZx5`), design system v2.1.0, live docs: https://lms-course-rho.vercel.app/docs/
> Status: AI draft, awaiting owner review.

## 1. Token architecture

Tokens are CSS custom properties. They come in four levels; a level may only reference levels below it.

| Level | Figma collection | CSS examples | Use in UI code? |
|---|---|---|---|
| Primitive | Global tokens, Type Global | `--colors-indigo-600`, `--spacing-4`, `--size-sm`, `--leading-2` | Colors: never. Spacing/type scale: only for fixed sizes and text styles with no semantic token |
| Theme palette | Brand tokens, Neutral tokens | `--brand-600`, `--neutral-200` | No |
| Semantic | ✨ Semantic color / spacing / radius / typography | `--surface-primary-default`, `--text-secondary`, `--gap-md`, `--padding-lg`, `--radius-md`, `--border-width-default` | Yes |
| Component | 🧩 Components token | `--button-filled-primary-background-hover`, `--input-border-error` | Yes, first choice |

**Naming formula.** CSS name = `--` + Figma name in lowercase with `/`, spaces and `_` turned into `-`.
`Nav item/background/active` → `--nav-item-background-active`. Semantic color names follow `Category/role/state` (`Surface/brand/soft/default`). Component tokens follow `Component/variant/role/property/state`.

**Files and load order** (`src/main.tsx`):
1. `src/styles/tokens.css` — generated from Figma, never edited.
2. `src/styles/tokens.ext.css` — prototype proposals built from existing tokens.
3. `src/styles/base.css` — reset, body, focus ring, helpers.
4. `src/styles/typography.css` — text style classes.
5. Component CSS (imported by each component), then `src/pages/pages.css`.

## 2. Hard rules

- No literal colors (`#…`, `rgb()`, `hsl()`) and no `px` values in `src/` outside the token files. Checked by `npm run lint:tokens`.
- Border widths come from Figma: `--border-width-default` (1) and `--border-width-thick` (2). Allowed raw values: motion durations, unitless numbers (opacity, z-index via `--layer-*`, line clamp), percentages, and breakpoints inside `@media` (CSS cannot read variables there).
- Hover, focus and dark mode come from the semantic layer. Components never contain `[data-theme]` rules.
- Pick the most specific token: component > semantic > prototype extension.

## 3. Color roles

Light / dark values with the default brand (indigo) and neutral (gray).

| Role | Token | Light | Dark | Used for |
|---|---|---|---|---|
| Page background | `--background-secondary` | gray-100 | gray-900 | `body`, content area |
| Field / control background | `--background-primary` | white | black | Inputs, outlined secondary buttons |
| Surface | `--surface-primary-default` | white | gray-900 | Cards, Sidebar, Topbar |
| Surface hover | `--surface-primary-hover` | gray-50 | gray-800 | Hover on rows, tabs |
| Subtle surface | `--surface-secondary-default` | gray-100 | gray-800 | Status row, disabled |
| Brand soft | `--surface-brand-soft-default` | indigo-50 | indigo-900 | Active nav, tips, cover, upload |
| Brand strong | `--surface-brand-medium-default` | indigo-600 | indigo-400 | Primary button, checked, toggle on |
| Text | `--text-primary` / `--text-secondary` / `--text-tertiary` | black / gray-600 / gray-500 | white / gray-300 / gray-400 | Titles / subtitles, labels, helper / captions, meta, axis (white or card surfaces only) |
| Brand text | `--text-brand` | indigo-600 | indigo-300 | Links, active states |
| Disabled text | `--text-disabled` | gray-400 | gray-500 | Disabled controls |
| Border | `--border-secondary` | gray-200 | gray-800 | Cards, dividers |
| Control border | `--border-primary-default` / `-hover` | gray-300 / 400 | gray-700 / 600 | Inputs |
| Brand border | `--border-brand` | indigo-300 | indigo-300 | Focused input, outlined primary |
| Focus ring | `--border-focus` | indigo-600 | indigo-300 | `:focus-visible` outline |
| Status | `--surface-{info,success,warning,error}`, `--text-…`, `--icon-…`, `--border-…` | 100 / 800 / 500 | 900 / 300 / 400 | Badges, alerts, toasts |
| Overlay | `--background-overlay` (proposal) | neutral-950 48% | neutral-950 72% | Dialog backdrop, drawer scrim |

Status colors always come as a set: surface + text + icon + border of the same tone.

## 4. Spacing

Semantic spacing aliases the 4px global scale.

| Token | px | Use |
|---|---|---|
| `--gap-2xs` | 4 | Title ↔ description inside a heading |
| `--gap-xs` | 6 | Label ↔ field ↔ helper; icon ↔ text in buttons |
| `--gap-sm` | 10 | Inside fields, checklist rows |
| `--gap-md` | 12 | Inside cards and rows, nav icon ↔ label |
| `--gap-lg` | 16 | Between form fields, card header ↔ content |
| `--gap-xl` | 24 | Between cards and sections, grid gutters |
| `--gap-2xl` | 32 | Large separations |
| `--padding-xs … --padding-xl` | 4 / 8 / 12 / 16 / 24 | Component padding (Card = XL, Button = MD×LG, Input = MD) |
| `--layout-section-gap` | 40 | Space above the footer action bar, empty-state padding |

Layout tokens (proposals in `tokens.ext.css`, built from the spacing scale):

| Token | Value | From Figma |
|---|---|---|
| `--layout-sidebar-width` | 264 | Sidebar 264×1024 |
| `--layout-aside-width` | 360 | Right column on wizard screens |
| `--layout-content-padding` | 24 (`--padding-xl`) | Content inset at 1440 |
| `--layout-content-padding-mobile` | 16 (`--padding-lg`) | Mobile 375 inset |
| `--layout-success-width` | 560 | Publish success card |
| `--layout-card-min-width` | 304 | Course grid min column (3 columns at 1128) |
| `--control-height` | 44 | Button, Input |
| `--control-height-sm` | 36 | Tab, Nav item |
| `--icon-size-sm / md / lg / xl` | 16 / 20 / 32 / 40 | Meta / controls / covers / preview cover |

## 5. Radius and typography

**Radius** (`✨ Semantic radius`): `--sm` 2, `--md` 12, `--lg` 16, `--xl` 20, `--full` 999. Mode `none-radius` sets sm–xl to 0. Components use their own radius token (`--button-radius` → `--md`, `--card-radius` → `--lg`, `--badge-radius` → `--full`).

**Typography.** Family: `--fontname` (Inter; mode `new-font` → Roboto Mono). Figma has only one semantic text token (`Label/MD`), so the text styles below are code-side classes in `typography.css` that compose Type Global tokens in one place.

| Class | Size / line height / weight | Used for |
|---|---|---|
| `.text-page-title` | 20 / 32 semibold | Topbar title, section headers |
| `.text-display` | 24 / 36 semibold | Course title in preview |
| `.text-stat` | 24 / 36 bold | Stat values |
| `.text-card-title` | 16 / 24 semibold | Card and course titles |
| `.text-label` | 14 / 20 medium | Labels, buttons, nav, tabs |
| `.text-label-strong` | 14 / 20 semibold | Step and session titles |
| `.text-body` | 14 / 20 regular | Values, descriptions |
| `.text-caption` | 12 / 16 regular | Helper text, meta |
| `.text-overline` | 12 / 16 medium | Badges, avatar, section labels |

Text never wraps inside Button, Badge, Tab or Nav item (ellipsis). Course titles clamp to 2 lines with a `title` tooltip.

## 6. Responsive rules

Designed at **1440** (desktop) and **375** (mobile). Breakpoints:

| Name | Width | Layout |
|---|---|---|
| Mobile | < 768 | One column. Mobile header (back or menu, title, step, avatar). Sticky bottom action bar, full-width buttons. Form rows stack. Session row actions on their own line. |
| Tablet | 768–1023 | Same shell as mobile (no sidebar), course grid 2 columns, form rows side by side. |
| Desktop | ≥ 1024 | Sidebar 264 + Topbar. Wizard = main column + 360 aside. Footer actions at the bottom of the content. |
| Wide | ≥ 1280 | Stats in 4 columns (2 columns below 1280). |

Rules:
- The Sidebar is never shown below 1024 (agent.md: "Not for narrow widths below 1024px"); it opens as a drawer from the menu button.
- The Stepper is desktop only; on mobile the header shows "Step n of 4 · Name".
- Primary actions: bottom right on desktop; full-width sticky bar on mobile (UX doc §8). Cancel/Back move to the header back button on mobile.
- Use `.only-desktop` / `.only-mobile` helpers for content that changes between layouts (e.g. Preview shows a Course card on mobile instead of the header + curriculum).
- Touch targets ≥ 44px on mobile; nothing scrolls horizontally except tab lists and the Stepper.
- Media queries use `max-width: 1023px`, `max-width: 767px`, `max-width: 1279px` literally (CSS variables cannot be used in `@media`).

## 7. Modes, dark mode and states

Modes are attributes on `<html>`, set by the Prototype panel or URL (`?theme=dark`):

| Attribute | Values | Effect |
|---|---|---|
| `data-theme` | (none) / `dark` | Semantic color light ↔ dark |
| `data-brand` | (none) / `red-brand` | Brand palette indigo ↔ red |
| `data-neutral` | (none) / `gray` | Neutral palette (current default is gray; `gray` mode maps to zinc) |
| `data-radius` | (none) / `none-radius` | Square corners |
| `data-font` | (none) / `new-font` | Roboto Mono |

Dark mode checklist for every change: no literal colors; text on brand surfaces uses `*-text-icon` / `--text-inverse`; borders still visible; focus ring visible (`--border-focus` switches to brand-300).

State mapping:

| State | Kind | How |
|---|---|---|
| Hover | Interactive | `:hover` + `*-hover` token |
| Focus | Interactive | Button / Icon button: soft ring (`--button-focus-<intent>-border` / `--icon-button-focus-border` at `--button-focus-opacity`, width `--button-focus-width`, radius `--button-focus-radius`, gap = width). Others: outline 2px `--border-focus`, offset 2px; inputs use `--input-border-focus` |
| Active / selected | Interactive | `*-active` token (nav, tab), `aria-current` / `aria-selected` |
| Disabled | Functional | `disabled` attribute + `--button-disabled-*`, `--input-background-disabled`, `--text-disabled` |
| Error | Functional | `--input-border-error`, `--input-text-error`, `role="alert"` |
| Loading | Functional | Skeleton (`--skeleton-*`) or Button `loading` (spinner + disabled) |

## 8. Open design questions (for review)

1. Dark `Background/primary` is pure black: inputs and outlined buttons look darker than cards (gray-900). Consider `Neutral/950` or `Neutral/900`.
2. Control borders (`Border/primary/default`, gray-300 on white) are below 3:1 (WCAG 1.4.11).
3. Missing Figma tokens used here as proposals: layout sizes, icon sizes, overlay, elevation, motion.
4. Missing component states: Button Loading, Toggle/Checkbox/Icon button Disabled, Checkbox Indeterminate; components Dialog and ActionBar.
