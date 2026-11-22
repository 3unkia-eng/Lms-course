# agent.md — LMS Design System v1.4.0

> Status: AI draft — awaiting review by the design system owner. Source of truth: Figma file Foundation (`fkI3mGHWAToov6nhyWUZx5`), page `LMS DASHBOARD` (239:1782). Snapshot 2026-11-22. Generated from the same data as `tokens.css` and the live docs site. Do not edit by hand; regenerate.

## 0. How to use this file

- Read sections 1–3 before any design or code task. Look up exact numbers in sections 4–6. Never estimate a value that is listed here.
- Product UI is English, left-to-right. Font: Inter (token `Fontname`).
- Work in small steps: one component or one screen per task. After each step, report what you changed.
- Every AI draft (design, code, docs) must be reviewed by the design system owner or the component owner before release. Mark output as `AI draft` until approved.

## 1. Hard rules (MUST)

1. Use tokens for 100% of fills, strokes, text colors, spacing, gaps, radii and type. Literal hex, rgb, px or font names in UI code or Figma layers = defect. Only exception: border width 1px/2px and icon size 16/20px, which have no tokens yet.
2. In Figma, use instances of the components in section 5. Never detach. If a need is not covered, stop and request a change (section 7).
3. In code, use CSS variables from `tokens.css` (`var(--…)`). Pick the most specific level available: component token > semantic token. Never use primitive (`--colors-*`, `--spacing-*`) or theme-palette (`--brand-*`, `--neutral-*`) tokens directly in UI.
4. Hover and dark mode come from the semantic layer. Do not create new component tokens just for dark mode.
5. Separate interactive states (hover, focus) from functional states (disabled, error).
6. Names describe purpose, not look or screen. Forbidden in names: colors (blue), screens (login), looks (big). Lowercase everything except the first letter of a component name (`Button/filled/primary/background/hover`).
7. Exactly one filled primary Button per view.
8. Text contrast ≥ 4.5:1; large text (≥ 24px, or ≥ 18.66px bold), icons and control borders ≥ 3:1, checked in both light and dark.
9. Touch targets ≥ 44×44 for primary controls; never below 24×24 including the label hit area.
10. Text never wraps inside Button, Badge, Tab, Nav item; truncate with ellipsis or shorten.

## 2. Decisions (pick exactly one)

| Situation | Do |
|---|---|
| Structure or behavior changes | New component |
| Overall look changes, same structure | New variant |
| Small content change or showing/hiding a part | Property (Boolean, Text, Instance swap) |
| Optional icon or focus ring | Boolean + Instance swap, not a variant |
| Structural container (Card, Modal) | Slot |
| Base control (Input) | No slot; every state is a variant |
| Same combination of Core components in ≥ 3 places with fixed behavior | New Composite component |
| Combination used in 1–2 places | Compose instances on the screen; no new component |

## 3. Tokens

Levels (a token may alias only lower levels; any brand or neutral color must go through `Brand/*` or `Neutral/*`, never straight to `Colors/*`): **Primitive** (Global tokens, Type Global) → **Theme palette** (Brand, Neutral) → **Semantic** (color, spacing, radius, typography) → **Component**.

CSS name = `--` + Figma name, lowercase, with `/`, space and `_` replaced by `-`. Example: `Nav item/background/active` → `--nav-item-background-active`.

Modes are HTML attributes on any element: `data-theme="dark"`, `data-brand="red-brand"`, `data-neutral="gray"`, `data-radius="none-radius"`, `data-font="new-font"`. Defaults: light, default brand, blue neutral, default radius, Inter. A nested element with one mode attribute resets the others; repeat all of them.

### 3.1 Semantic color (resolved, default brand & neutral)

| Token | CSS | Light | Dark |
|---|---|---|---|
| Background/primary | `--background-primary` | #ffffff | #000000 |
| Background/secondary | `--background-secondary` | #f3f4f6 | #111827 |
| Background/tertiary | `--background-tertiary` | #e5e7eb | #1f2937 |
| Background/brand | `--background-brand` | #4f46e5 | #818cf8 |
| Background/error | `--background-error` | #fee2e2 | #7f1d1d |
| Background/success | `--background-success` | #dcfce7 | #14532d |
| Background/warning | `--background-warning` | #fef9c3 | #713f12 |
| Background/info | `--background-info` | #dbeafe | #1e3a8a |
| Surface/primary/default | `--surface-primary-default` | #ffffff | #111827 |
| Surface/primary/hover | `--surface-primary-hover` | #f9fafb | #1f2937 |
| Surface/secondary/default | `--surface-secondary-default` | #f3f4f6 | #1f2937 |
| Surface/secondary/hover | `--surface-secondary-hover` | #e5e7eb | #374151 |
| Surface/tertiary/default | `--surface-tertiary-default` | #e5e7eb | #374151 |
| Surface/tertiary/hover | `--surface-tertiary-hover` | #d1d5db | #4b5563 |
| Surface/brand/soft/default | `--surface-brand-soft-default` | #eef2ff | #312e81 |
| Surface/brand/subtle/default | `--surface-brand-subtle-default` | #e0e7ff | #312e81 |
| Surface/brand/medium/default | `--surface-brand-medium-default` | #4f46e5 | #818cf8 |
| Surface/brand/medium/hover | `--surface-brand-medium-hover` | #4338ca | #818cf8 |
| Surface/error | `--surface-error` | #fee2e2 | #7f1d1d |
| Surface/success | `--surface-success` | #dcfce7 | #14532d |
| Surface/warning | `--surface-warning` | #fef9c3 | #713f12 |
| Surface/info | `--surface-info` | #dbeafe | #1e3a8a |
| Border/primary/default | `--border-primary-default` | #d1d5db | #374151 |
| Border/primary/hover | `--border-primary-hover` | #9ca3af | #4b5563 |
| Border/secondary | `--border-secondary` | #e5e7eb | #1f2937 |
| Border/brand | `--border-brand` | #a5b4fc | #a5b4fc |
| Border/error | `--border-error` | #ef4444 | #f87171 |
| Border/success | `--border-success` | #22c55e | #4ade80 |
| Border/warning | `--border-warning` | #eab308 | #facc15 |
| Border/info | `--border-info` | #3b82f6 | #60a5fa |
| Text/primary | `--text-primary` | #000000 | #ffffff |
| Text/secondary | `--text-secondary` | #374151 | #9ca3af |
| Text/brand | `--text-brand` | #4f46e5 | #a5b4fc |
| Text/error | `--text-error` | #991b1b | #fca5a5 |
| Text/success | `--text-success` | #166534 | #86efac |
| Text/warning | `--text-warning` | #854d0e | #fde047 |
| Text/info | `--text-info` | #1e40af | #93c5fd |
| Text/inverse | `--text-inverse` | #ffffff | #000000 |
| Icon/primary | `--icon-primary` | #000000 | #ffffff |
| Icon/secondary | `--icon-secondary` | #374151 | #9ca3af |
| Icon/brand | `--icon-brand` | #4f46e5 | #a5b4fc |
| Icon/error | `--icon-error` | #991b1b | #fca5a5 |
| Icon/success | `--icon-success` | #166534 | #86efac |
| Icon/warning | `--icon-warning` | #854d0e | #fde047 |
| Icon/info | `--icon-info` | #1e40af | #93c5fd |
| Icon/inverse | `--icon-inverse` | #ffffff | #000000 |
| Text/disabled | `--text-disabled` | #9ca3af | #6b7280 |
| Border/focus | `--border-focus` | #4f46e5 | #a5b4fc |

### 3.2 Spacing

| Token | CSS | px |
|---|---|---|
| Gap/2XS | `--gap-2xs` | 4 |
| Gap/XS | `--gap-xs` | 6 |
| Gap/SM | `--gap-sm` | 10 |
| Gap/MD | `--gap-md` | 12 |
| Gap/LG | `--gap-lg` | 16 |
| Gap/XL | `--gap-xl` | 24 |
| Gap/2XL | `--gap-2xl` | 32 |
| Padding/XS | `--padding-xs` | 4 |
| Padding/SM | `--padding-sm` | 8 |
| Padding/MD | `--padding-md` | 12 |
| Padding/LG | `--padding-lg` | 16 |
| Padding/XL | `--padding-xl` | 24 |
| Layout/Section gap | `--layout-section-gap` | 40 |

Global scale (`Spacing/n` = n × 4px): 0=0, 0_5=2, 1=4, 1_5=6, 2=8, 2_5=10, 3=12, 3_5=14, 4=16, 5=20, 6=24, 7=28, 8=32, 9=36, 10=40, 11=44, 12=48, 14=56, 16=64, 20=80, 24=96, 28=112, 32=128, 36=144, 40=160, 44=176, 48=192, 52=208, 56=224, 60=240, 64=256, 72=288, 80=320, 96=384.

### 3.3 Radius

| Token | CSS | px (Default) | px (None radius) |
|---|---|---|---|
| none | `--none` | 0 | 0 |
| sm | `--sm` | 2 | 0 |
| md | `--md` | 12 | 0 |
| lg | `--lg` | 16 | 0 |
| xl | `--xl` | 20 | 0 |
| full | `--full` | 999 | 999 |

### 3.4 Typography

Family: `Fontname` → Inter (mode `new font` → Roboto Mono). Sizes px: xs=12, sm=14, base=16, lg=18, xl=20, 2xl=24, 3xl=30, 4xl=36, 5xl=48, 6xl=60, 7xl=72, 8xl=96, 9xl=128.
Line heights px: 1=16, 2=20, 3=24, 4=28, 5=32, 6=36, 7=40, 8=48, 9=48, 10=60, 11=72, 12=96, 13=128.
Weights: thin=100, extralight=200, light=300, normal=400, medium=500, semibold=600, bold=700, extrabold=800, black=900.
Styles used by components: 20/32 semibold (page title), 16/24 semibold (card/course title), 14/20 medium (labels, buttons, nav, tabs), 14/20 semibold (step and session titles), 14/20 regular (values, descriptions), 12/16 medium (badge, avatar, section labels), 12/16 regular (helper, meta).

## 4. Contrast facts (computed)

| Pair | Light | Dark |
|---|---|---|
| Button/filled/primary/text icon on Button/filled/primary/background/default | 6.29 | 7.04 |
| Button/filled/secondary/text icon on Button/filled/secondary/background/default | 16.96 | 10.31 |
| Button/outlined/primary/text on Background/primary | 6.29 | 10.53 |
| Button/disabled/text icon on Button/disabled/background | 2.31 | 3.04 |
| Badge/draft/text on Badge/draft/background | 6.38 | 6.58 |
| Badge/published/text on Badge/published/background | 6.49 | 6.49 |
| Badge/info/text on Badge/info/background | 5.62 | 5.73 |
| Badge/neutral/text on Badge/neutral/background | 9.37 | 5.78 |
| Avatar/text on Avatar/background | 5.1 | 5.73 |
| Icon button/icon on Icon button/background/default | 21.0 | 21.0 |
| Icon button/border/default on Icon button/background/default | 1.24 | 1.43 |
| Input/text/value on Input/background/default | 21.0 | 21.0 |
| Input/text/placeholder on Input/background/default | 10.31 | 8.27 |
| Input/text/error on Background/primary | 8.31 | 11.06 |
| Input/border/default on Input/background/default | 1.47 | 2.04 |
| Toggle/thumb on Toggle/track/on | 6.29 | 7.04 |
| Toggle/track/off on Background/primary | 1.47 | 2.78 |
| Checkbox/icon on Checkbox/background/checked | 6.29 | 7.04 |
| Checkbox/border/unchecked on Checkbox/background/unchecked | 1.47 | 2.04 |
| Tab/text/active on Tab/background/active | 5.62 | 5.73 |
| Tab/text/default on Background/primary | 10.31 | 8.27 |
| Nav item/text icon/default on Nav item/background/default | 10.31 | 6.99 |
| Nav item/text icon/active on Nav item/background/active | 5.62 | 5.73 |
| Step/indicator/icon on Step/indicator/background/completed | 6.29 | 7.04 |
| Step/indicator/text/current on Step/indicator/background/current | 5.62 | 5.73 |
| Step/indicator/text/upcoming on Step/indicator/background/upcoming | 9.37 | 5.78 |
| Card/title/text on Card/background | 21.0 | 17.74 |
| Card/description/text on Card/background | 10.31 | 6.99 |
| Sidebar/section/text on Sidebar/background | 10.31 | 6.99 |
| Sidebar/user/name/text on Sidebar/user/background | 19.08 | 17.74 |
| Topbar/title/text on Topbar/background | 21.0 | 17.74 |
| Topbar/subtitle/text on Topbar/background | 10.31 | 6.99 |
| Step/title/text on Stepper/background | 21.0 | 17.74 |
| Course card/title/text on Course card/background | 21.0 | 17.74 |
| Course card/meta/text on Course card/background | 10.31 | 6.99 |
| Course card/cover/icon on Course card/cover/background | 5.62 | 5.73 |
| Session row/index/text on Session row/index/background | 5.62 | 5.73 |
| Session row/title/text on Session row/background | 21.0 | 17.74 |
| Session row/meta/text on Session row/background | 10.31 | 6.99 |

## 5. Components

### Button (Core, Figma 246:1816, 12 variants)

Triggers an action. One Button = one action. Use for: Primary actions on a page or form (Save draft, Publish course, Add session). Not for: Navigation between pages (use Nav item or a link). Toggling a setting (use Toggle).

- **size**: height 44 (12 + 20 + 12), hug width; outlined has a 1px border inside the same 44
- **padding**: Padding/MD 12 · Padding/LG 16
- **gap**: Gap/XS 6
- **radius**: Button/radius → md = 12
- **type**: 14 / 20 Medium (Inter)
- **properties**: `Label` Text = Button (any string); `Leading icon` Boolean = false (true / false); `Icon` Instance swap = plus (any icon from Icons page); `Type` Variant = filled (filled / outlined); `Appearance` Variant = primary (primary / secondary); `State` Variant = default (default / hover / disabled); `Focus ring` Boolean = false (true / false)
- **anatomy**: Container → Button/*/background/*; Leading icon → Button/*/text icon; Label → Button/*/text icon
- **tokens** (light / dark): `--button-filled-primary-background-default` #4f46e5/#818cf8; `--button-filled-primary-background-hover` #4338ca/#818cf8; `--button-filled-primary-text-icon` #ffffff/#000000; `--button-filled-secondary-background-default` #e5e7eb/#374151; `--button-filled-secondary-background-hover` #d1d5db/#4b5563; `--button-radius` 12px; `--button-filled-secondary-text-icon` #000000/#ffffff; `--button-outlined-primary-text` #4f46e5/#a5b4fc; `--button-outlined-primary-border-default` #a5b4fc/#a5b4fc; `--button-outlined-primary-background-hover` #eef2ff/#312e81; `--button-outlined-secondary-border-default` #e5e7eb/#1f2937; `--button-outlined-secondary-border-hover` #9ca3af/#4b5563; `--button-outlined-secondary-text-icon` #000000/#ffffff; `--button-outlined-secondary-background-hover` #f9fafb/#1f2937; `--button-disabled-background` #f3f4f6/#1f2937; `--button-disabled-text-icon` #9ca3af/#6b7280
- **must**: Use a native <button> element; type="button" unless it submits a form. Keyboard: Tab to focus, Enter and Space activate. Visible focus ring: Focus ring = true (2px Border/focus, 2px outside). In code: :focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px }. Icon-only use is not allowed here; use Icon button, which requires aria-label. Disabled: use the disabled attribute and keep the label readable; explain why nearby if the reason is not obvious. Height 44 meets the 44×44 touch target (WCAG 2.5.5 AAA, 2.5.8 AA).
- **never**: Don't detach the Button to change its color. Ask for a new Appearance instead. Don't use two filled primary Buttons side by side. Don't write all-caps labels or end them with a period.
- **limits**: Long labels: Button hugs its text; above ~24 characters rewrite the label rather than wrap it. Labels never wrap to two lines. Focus is a Boolean (Focus ring), not a variant, so it combines with every Type × Appearance × State. There is no Pressed state. There is no Loading state. Use disabled + a spinner icon until a Loading variant is added. Outlined primary has no own hover border token; it keeps Border/brand and changes only the background.

### Badge (Core, Figma 246:1825, 4 variants)

Shows a short, read-only status such as Draft or Published. Use for: Course and session status, counts that do not need interaction. Not for: Anything clickable (use Tab or Button). Long text.

- **size**: height 24, hug width
- **padding**: Padding/XS 4 · Padding/SM 8
- **gap**: 0
- **radius**: Badge/radius → full = 999
- **type**: 12 / 16 Medium
- **properties**: `Label` Text = Draft (any string); `Status` Variant = draft (draft / published / info / neutral)
- **anatomy**: Container → Badge/{status}/background; Label → Badge/{status}/text
- **tokens** (light / dark): `--badge-draft-background` #fef9c3/#713f12; `--badge-draft-text` #854d0e/#fde047; `--badge-published-background` #dcfce7/#14532d; `--badge-published-text` #166534/#86efac; `--badge-info-background` #eef2ff/#312e81; `--badge-info-text` #4f46e5/#a5b4fc; `--badge-neutral-background` #f3f4f6/#1f2937; `--badge-neutral-text` #374151/#9ca3af; `--badge-radius` 999px
- **must**: Badge is not interactive: no tabindex, no hover. Color is never the only signal: the label always names the status. If the badge updates live, announce it with a polite live region in the parent.
- **never**: Don't add icons by detaching. Request a property instead. Don't invent new colors per screen; map new statuses to the 4 existing ones first.
- **limits**: Max label length ~16 characters; beyond that, truncate in code with title attribute. Dark mode (since 1.1.0): status surfaces use the 900 step and text the 300 step, so badges stay above 5.2:1.

### Avatar (Core, Figma 246:1830, 2 variants)

Represents a person with their initials. Use for: Instructor and student identity in Topbar, Sidebar user row, lists. Not for: Course or brand images (use Course card cover).

- **size**: sm 32×32 · md 40×40
- **padding**: 0 (centered)
- **gap**: 0
- **radius**: Avatar/radius → full
- **type**: 12 / 16 Medium
- **properties**: `Initials` Text = SK (1–2 letters); `Size` Variant = sm (sm / md)
- **anatomy**: Container → Avatar/background; Initials → Avatar/text
- **tokens** (light / dark): `--avatar-background` #e0e7ff/#312e81; `--avatar-text` #4f46e5/#a5b4fc; `--avatar-radius` 999px
- **must**: Decorative next to a visible name: aria-hidden="true". Alone: role="img" with aria-label set to the full name.
- **never**: Don't put more than 2 letters. Don't use it as a button without wrapping it in Icon button behaviour.
- **limits**: No photo variant yet. Adding one is a minor release (new boolean 'Photo' + image fill). Non-Latin names: use the first two grapheme clusters.

### Icon button (Core, Figma 246:1837, 2 variants)

An action shown only as an icon, such as notifications or more options. Use for: Toolbar actions where the icon is universally understood (bell, more, close). Not for: Primary actions; anything where an icon alone is ambiguous.

- **size**: 46×46 (20 icon + 2×12 padding + 1px border)
- **padding**: Padding/MD 12
- **gap**: 0
- **radius**: Icon button/radius → md = 12
- **type**: —
- **properties**: `Icon` Instance swap = bell (any icon); `State` Variant = default (default / hover); `Focus ring` Boolean = false (true / false)
- **anatomy**: Container → Icon button/background/*, Icon button/border/default; Icon → Icon button/icon
- **tokens** (light / dark): `--icon-button-background-default` #ffffff/#000000; `--icon-button-background-hover` #f9fafb/#1f2937; `--icon-button-border-default` #e5e7eb/#1f2937; `--icon-button-icon` #000000/#ffffff; `--icon-button-radius` 12px
- **must**: Keyboard focus shows the Focus ring (2px Border/focus, 2px outside); in code use :focus-visible. aria-label is required and describes the action ("Open notifications"). Keyboard: Tab, Enter, Space. 46×46 exceeds the 44×44 target.
- **never**: Don't use for destructive actions without confirmation.
- **limits**: No disabled state in Figma yet. Border/secondary on Background/primary is below 3:1; the icon, not the border, carries meaning.

### Input (Core, Figma 247:1844, 10 variants)

Lets people enter or pick a single value. Also covers Textarea (Multiline) and Select (Trailing icon = chevron). Use for: Course title, description, price, search, and dropdown pickers. Not for: Yes/no choices (use Toggle or Checkbox).

- **size**: width 320 (fills parent); field 46 high (1px border), 48 in focus (2px border); multiline field 112
- **padding**: Field: 12 all sides
- **gap**: Gap/XS 6 between Label, Field, Helper; 10 inside Field
- **radius**: Input/radius → md = 12
- **type**: Label 14/20 Medium · Value 14/20 Regular · Helper 12/16 Regular
- **properties**: `Label` Text = Label (string); `Show label` Boolean = true; `Value` Text = Value (string); `Helper text` Text = Helper text (string); `Show helper` Boolean = false; `Leading icon` Boolean = false; `Leading icon swap` Instance swap = search (icon); `Trailing icon` Boolean = false; `Trailing icon swap` Instance swap = chevron-down (icon); `Multiline` Variant = false (false / true); `State` Variant = default (default / placeholder / focus / error / disabled)
- **anatomy**: Label → Input/text/label; Field (Container) → Input/background/*, Input/border/*; Leading icon → Input/icon; Value / Placeholder → Input/text/value, Input/text/placeholder; Trailing icon → Input/icon; Helper text → Input/text/helper, Input/text/error
- **tokens** (light / dark): `--input-background-default` #ffffff/#000000; `--input-background-disabled` #f3f4f6/#1f2937; `--input-border-default` #d1d5db/#374151; `--input-border-hover` #9ca3af/#4b5563; `--input-border-focus` #a5b4fc/#a5b4fc; `--input-border-error` #ef4444/#f87171; `--input-text-label` #000000/#ffffff; `--input-text-value` #000000/#ffffff; `--input-text-placeholder` #374151/#9ca3af; `--input-text-helper` #374151/#9ca3af; `--input-text-error` #991b1b/#fca5a5; `--input-icon` #374151/#9ca3af; `--input-radius` 12px; `--input-text-disabled` #9ca3af/#6b7280
- **must**: Every field has a visible <label for>. Placeholder never replaces the label. Error: aria-invalid="true" and aria-describedby pointing to the helper text. Error is shown by text, not only by the red border. Focus: border becomes 2px Border/brand (State=focus variant, as in Figma). Select: use native <select> or a combobox with listbox semantics.
- **never**: Don't make a new 'Login Input' or 'Search Input' component. Use properties. Don't put a slot inside Input.
- **limits**: Field border (Border/primary/default) is below 3:1 against white; consider Neutral/400 for 1.4.11 (major-impact token change, needs review). Long values: single line scrolls horizontally; Multiline grows to max 5 lines then scrolls.

### Toggle (Core, Figma 247:1849, 2 variants)

Turns a setting on or off immediately. Use for: Settings that take effect at once (Free preview, Allow comments). Not for: Choices that need a Save button (use Checkbox).

- **size**: 40×24 track, 16×16 thumb
- **padding**: Padding/XS 4
- **gap**: 0
- **radius**: Toggle/radius → full
- **type**: —
- **properties**: `State` Variant = on (on / off); `Focus ring` Boolean = false (true / false)
- **anatomy**: Track (Container) → Toggle/track/on, Toggle/track/off; Thumb → Toggle/thumb
- **tokens** (light / dark): `--toggle-track-on` #4f46e5/#818cf8; `--toggle-track-off` #d1d5db/#4b5563; `--toggle-thumb` #ffffff/#000000; `--toggle-radius` 999px
- **must**: Keyboard focus shows the Focus ring (2px Border/focus, 2px outside); in code use :focus-visible. role="switch" with aria-checked. Keyboard: Space toggles. Always pair with a visible text label. Hit area must be at least 44×24 including label (track alone is 40×24).
- **never**: Don't use a Toggle inside a form that has a Submit button.
- **limits**: No disabled state yet. Off track (neutral/300) on white is ~1.5:1; the thumb position and label carry meaning.

### Checkbox (Core, Figma 247:1854, 2 variants)

Selects one or more options from a list. Use for: Multi-select lists, agreeing to terms, bulk selection. Not for: Instant on/off settings (use Toggle).

- **size**: 20×20
- **padding**: 0
- **gap**: 0
- **radius**: Checkbox/radius → sm = 2
- **type**: —
- **properties**: `State` Variant = unchecked (checked / unchecked); `Focus ring` Boolean = false (true / false)
- **anatomy**: Container → Checkbox/background/*, Checkbox/border/unchecked; Check icon → Checkbox/icon
- **tokens** (light / dark): `--checkbox-background-checked` #4f46e5/#818cf8; `--checkbox-background-unchecked` #ffffff/#000000; `--checkbox-border-unchecked` #d1d5db/#374151; `--checkbox-icon` #ffffff/#000000; `--checkbox-radius` 2px
- **must**: Keyboard focus shows the Focus ring (2px Border/focus, 2px outside); in code use :focus-visible. Native <input type="checkbox"> with a <label>. 20×20 is below the 24×24 minimum (WCAG 2.5.8); the clickable label must extend the target. Keyboard: Space.
- **never**: Don't use for a single instant setting.
- **limits**: No indeterminate state; needed for 'select all' (minor release). No disabled or error state yet.

### Tab (Core, Figma 247:1859, 2 variants)

Switches between views of the same content. Use for: Courses list filters (All, Draft, Published), course detail sections. Not for: Moving to another page (use Nav item).

- **size**: height 36, hug width
- **padding**: Padding/SM 8 · Padding/MD 12
- **gap**: 0
- **radius**: Tab/radius → md = 12
- **type**: 14 / 20 Medium
- **properties**: `Label` Text = Tab (string); `State` Variant = default (default / active); `Focus ring` Boolean = false (true / false)
- **anatomy**: Container → Tab/background/active; Label → Tab/text/*
- **tokens** (light / dark): `--tab-text-default` #374151/#9ca3af; `--tab-text-active` #4f46e5/#a5b4fc; `--tab-background-active` #eef2ff/#312e81; `--tab-radius` 12px
- **must**: Keyboard focus shows the Focus ring (2px Border/focus, 2px outside); in code use :focus-visible. role="tablist" on the group, role="tab" with aria-selected on each, role="tabpanel" on content. Arrow keys move between tabs; Tab moves into the panel. Height 36 is below 44; keep 8px between tabs for touch.
- **never**: Don't wrap tabs to two rows; scroll horizontally instead.
- **limits**: No hover state in Figma; code uses Surface/primary/hover.

### Nav item (Core, Figma 247:1881, 3 variants)

A link to a top-level page in the Sidebar. Use for: Dashboard, Courses, Students, Analytics. Not for: Actions (use Button).

- **size**: 232×36 (fills Sidebar)
- **padding**: Padding/SM 8 · Padding/MD 12
- **gap**: Gap/MD 12
- **radius**: Nav item/radius → md = 12
- **type**: 14 / 20 Medium
- **properties**: `Label` Text = Nav item (string); `Icon` Instance swap = home (icon); `State` Variant = default (default / hover / active); `Focus ring` Boolean = false (true / false)
- **anatomy**: Container → Nav item/background/*; Icon → Nav item/text icon/*; Label → Nav item/text icon/*
- **tokens** (light / dark): `--nav-item-background-default` #ffffff/#111827; `--nav-item-background-hover` #f9fafb/#1f2937; `--nav-item-background-active` #eef2ff/#312e81; `--nav-item-text-icon-default` #374151/#9ca3af; `--nav-item-text-icon-active` #4f46e5/#a5b4fc; `--nav-item-radius` 12px
- **must**: Keyboard focus shows the Focus ring (2px Border/focus, 2px outside); in code use :focus-visible. Render as <a href>. The active item gets aria-current="page". Wrap the group in <nav aria-label="Main">.
- **never**: Don't nest Nav items more than one level.
- **limits**: Long labels truncate with ellipsis at 232px width. Collapsed (icon-only) Sidebar is not designed yet.

### Step (Core, Figma 247:1906, 3 variants)

One step of a multi-step flow, with its number and title. Use for: Inside Stepper only. Not for: Standalone progress or lists.

- **size**: hug, indicator 32×32
- **padding**: 0
- **gap**: Gap/MD 12
- **radius**: Step/radius → full (indicator)
- **type**: Number & Title 14/20 Semi Bold · Description 12/16 Regular
- **properties**: `Number` Text = 1 (1–9); `Title` Text = Step title (string); `Description` Text = Description (string); `State` Variant = completed (completed / current / upcoming)
- **anatomy**: Indicator → Step/indicator/*; Title → Step/title/text; Description → Step/description/text
- **tokens** (light / dark): `--step-indicator-background-completed` #4f46e5/#818cf8; `--step-indicator-background-current` #eef2ff/#312e81; `--step-indicator-background-upcoming` #f3f4f6/#1f2937; `--step-indicator-border-current` #a5b4fc/#a5b4fc; `--step-indicator-text-current` #4f46e5/#a5b4fc; `--step-indicator-text-upcoming` #374151/#9ca3af; `--step-indicator-icon` #ffffff/#000000; `--step-title-text` #000000/#ffffff; `--step-description-text` #374151/#9ca3af; `--step-radius` 999px
- **must**: Current step: aria-current="step". Completed state must also be announced in text (visually hidden "completed").
- **never**: Don't use Step outside Stepper.
- **limits**: No error state for a step with problems (proposal for a later minor release).

### Card (Core, Figma 247:1907, 1 variant)

A structural container with optional header and a Content slot. Use for: Grouping form sections, stats, summaries. Not for: Making a new card component for each screen; put the layout in the Content slot.

- **size**: width 480 default (fills parent), hug height
- **padding**: Padding/XL 24
- **gap**: Gap/LG 16
- **radius**: Card/radius → lg = 16
- **type**: Title 16/24 Semi Bold · Description 14/20 Regular
- **properties**: `Content` Slot = — (any instances); `Title` Text = Card title (string); `Description` Text = Supporting description (string); `Show header` Boolean = true; `Show description` Boolean = true
- **anatomy**: Container → Card/background, Card/border; Header → Card/title/text, Card/description/text; Content (Slot) → —
- **tokens** (light / dark): `--card-background` #ffffff/#111827; `--card-border` #e5e7eb/#1f2937; `--card-title-text` #000000/#ffffff; `--card-description-text` #374151/#9ca3af; `--card-radius` 16px
- **must**: If the card has a title, use a heading element at the right level. A clickable card is a single link wrapping the title, not nested buttons.
- **never**: Don't nest a Card inside a Card.
- **limits**: Slot content must use the same tokens; the Card does not restyle children.

### Sidebar (Composite, Figma 248:1770, 1 variant)

Main app navigation with logo, nav groups and the user row. Use for: Every app screen (left side). Not for: Inside modals or narrow widths below 1024px. Built from: Nav item, Avatar.

- **size**: 264×1024 (full height)
- **padding**: Padding/XL 24 · Padding/LG 16
- **gap**: Gap/XL 24
- **radius**: 0
- **type**: Name 16/24 Semi Bold · Section 12/16 Medium · Nav 14/20
- **properties**: `User name` Text = Sanaz Kiani (string); `User role` Text = Instructor (string); `Nav item State (exposed)` Variant = — (default / hover / active)
- **anatomy**: Logo → Sidebar/logo/*; Navigation → Sidebar/section/text; Spacer → —; User → Sidebar/user/*
- **tokens** (light / dark): `--sidebar-background` #ffffff/#111827; `--sidebar-border` #e5e7eb/#1f2937; `--sidebar-logo-background` #4f46e5/#818cf8; `--sidebar-logo-icon` #ffffff/#000000; `--sidebar-section-text` #374151/#9ca3af; `--sidebar-user-background` #f3f4f6/#111827; `--sidebar-user-icon` #374151/#9ca3af; `--sidebar-user-name-text` #000000/#ffffff; `--sidebar-user-role-text` #374151/#9ca3af
- **must**: <nav aria-label="Main"> landmark. Settings icon in user row needs aria-label.
- **never**: Don't detach to reorder items; edit the main component.
- **limits**: Used on 7 of 7 screens (meets the 3+ reuse rule). No collapsed/mobile variant yet.

### Topbar (Composite, Figma 248:1857, 1 variant)

Page header with title, subtitle, search, notifications and avatar. Use for: Top of every app screen. Not for: Inside cards. Built from: Input, Icon button, Avatar.

- **size**: 1176×85 (fills content area)
- **padding**: Padding/LG 16 · Padding/XL 24
- **gap**: Gap/LG 16
- **radius**: 0
- **type**: Title 20/32 Semi Bold · Subtitle 14/20 Regular
- **properties**: `Title` Text = Page title (string); `Subtitle` Text = Page subtitle (string); `Show search` Boolean = true
- **anatomy**: Heading → Topbar/title/text, Topbar/subtitle/text; Search → Input/*; Notifications → Icon button/*; Avatar → Avatar/*
- **tokens** (light / dark): `--topbar-background` #ffffff/#111827; `--topbar-border` #e5e7eb/#1f2937; `--topbar-title-text` #000000/#ffffff; `--topbar-subtitle-text` #374151/#9ca3af
- **must**: Title is the page <h1>. Search input has a label (visually hidden is fine) and role="search" on its form.
- **never**: Don't add page actions into the Topbar; put them in the page header area.
- **limits**: Used on 7 of 7 screens. Title truncates at one line.

### Stepper (Composite, Figma 248:2023, 4 variants)

Shows progress through the 4-step Create course flow. Use for: Create course flow: Details, Sessions, Preview, Publish. Not for: Flows with more than 5 steps. Built from: Step.

- **size**: 1112×70
- **padding**: Padding/LG 16 · Padding/XL 24
- **gap**: Gap/LG 16
- **radius**: Stepper/radius → lg = 16
- **type**: from Step
- **properties**: `Current` Variant = 1 (1 / 2 / 3 / 4)
- **anatomy**: Container → Stepper/background, Stepper/border; Step ×4 → Step/*; Connector ×3 → Stepper/connector/*
- **tokens** (light / dark): `--stepper-background` #ffffff/#111827; `--stepper-border` #e5e7eb/#1f2937; `--stepper-connector-default` #e5e7eb/#1f2937; `--stepper-connector-completed` #a5b4fc/#a5b4fc; `--stepper-radius` 16px
- **must**: <ol> with each step as <li>; current gets aria-current="step".
- **never**: Don't edit Step states inside the Stepper by hand.
- **limits**: Used on 4 screens (meets the 3+ rule). Fixed to 4 steps; a 3- or 5-step flow needs a new variant set (minor).

### Course card (Composite, Figma 248:2024, 1 variant)

A course summary with cover, status, title and stats. Use for: Dashboard, Courses list, Publish confirmation. Not for: Session-level items (use Session row). Built from: Badge.

- **size**: 320×282
- **padding**: Body: Padding/LG 16
- **gap**: Gap/MD 12
- **radius**: Course card/radius → lg = 16
- **type**: Title 16/24 Semi Bold · Meta 12/16 Regular
- **properties**: `Title` Text = Course title (string); `Sessions` Text = 8 sessions (string); `Students` Text = 0 students (string); `Cover icon` Instance swap = book (icon); `Badge Status (exposed)` Variant = draft (draft / published / info / neutral)
- **anatomy**: Cover → Course card/cover/*; Status badge → Badge/*; Title → Course card/title/text; Meta → Course card/meta/*
- **tokens** (light / dark): `--course-card-background` #ffffff/#111827; `--course-card-border` #e5e7eb/#1f2937; `--course-card-cover-background` #eef2ff/#312e81; `--course-card-cover-icon` #4f46e5/#a5b4fc; `--course-card-title-text` #000000/#ffffff; `--course-card-meta-text` #374151/#9ca3af; `--course-card-meta-icon` #374151/#9ca3af; `--course-card-radius` 16px
- **must**: Whole card is one link (title is the link text). Cover icon is decorative (aria-hidden).
- **never**: Don't put buttons inside the card.
- **limits**: Title over 2 lines truncates with ellipsis. No image cover yet.

### Session row (Composite, Figma 248:2052, 1 variant)

One session in a course outline, editable or read-only. Use for: Add sessions, Preview, Publish. Not for: Course-level lists. Built from: Badge, icons.

- **size**: 720×66 (fills parent)
- **padding**: Padding/MD 12 · Padding/LG 16
- **gap**: Gap/MD 12
- **radius**: Session row/radius → md = 12
- **type**: Title 14/20 Semi Bold · Meta 12/16 Regular
- **properties**: `Number` Text = 01 (2 digits); `Title` Text = Session title (string); `Meta` Text = Video · 12 min (type · duration); `Type icon` Instance swap = video (icon); `Show drag handle` Boolean = true; `Show actions` Boolean = true; `Show badge` Boolean = false
- **anatomy**: Drag handle → Session row/icon; Index → Session row/index/*; Text → Session row/title/text, Session row/meta/text; Free preview badge → Badge/info/*; Actions → Session row/icon
- **tokens** (light / dark): `--session-row-background` #ffffff/#111827; `--session-row-border` #e5e7eb/#1f2937; `--session-row-index-background` #eef2ff/#312e81; `--session-row-index-text` #4f46e5/#a5b4fc; `--session-row-title-text` #000000/#ffffff; `--session-row-meta-text` #374151/#9ca3af; `--session-row-icon` #374151/#9ca3af; `--session-row-radius` 12px
- **must**: Drag handle needs a keyboard alternative (Move up / Move down buttons). Action icons need aria-labels ("Edit session 1").
- **never**: Don't detach to hide parts; use the booleans.
- **limits**: Used on 3 screens (meets the 3+ rule). Title truncates at one line.

## 6. Known issues (do not copy these patterns into new work)

1. **Naming duplicates** (low). Background/* and Surface/* status tokens (error, success, warning, info) are duplicates with identical values in both modes. Fix proposed: Merge Background/* status tokens into Surface/*. Major for code (CSS names change), so ship with deprecated aliases.
2. **Missing interactive states** (low). Focus ring added in 1.4.0. Still missing: Disabled on Toggle, Checkbox, Icon button; Loading on Button; Indeterminate on Checkbox; Pressed state. Fix proposed: Add as variants (functional states) one component at a time. Minor release each.

## 7. Change process and versioning

- Version format MAJOR.MINOR.PATCH, shared by Figma library and git tag.
- PATCH: fix with no visual or API change (typo in token name inside Figma only, wrong binding). MINOR: backward-compatible addition (new variant, state, component, token). MAJOR: breaking change (rename/remove a CSS variable, remove a variant, change a public property such as Disabled, redesign).
- Steps: 1 Request (problem, proposal, affected tokens/components) → 2 Impact & risk analysis (list dependents, choose version type, check contrast in both themes and brands) → 3 Change design and code together → 4 Owner review → 5 Changelog entry per component and system → 6 Publish Figma library + git tag + regenerate tokens.css, agent.md, docs site.
- Current version: 1.4.0.
