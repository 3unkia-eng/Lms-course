# agent.md — LMS Design System v2.1.0

> Status: AI draft — awaiting review by the design system owner. Source of truth: Figma file Foundation (`fkI3mGHWAToov6nhyWUZx5`), page `LMS DASHBOARD` (239:1782). Snapshot 2026-11-25. Generated from the same data as `tokens.css` and the live docs site. Do not edit by hand; regenerate.

## 0. How to use this file

- Read sections 1–3 before any design or code task. Look up exact numbers in sections 4–6. Never estimate a value that is listed here.
- Product UI is English, left-to-right. Font: Inter (token `font/family`).
- Work in small steps: one component or one screen per task. After each step, report what you changed.
- Every AI draft (design, code, docs) must be reviewed by the design system owner or the component owner before release. Mark output as `AI draft` until approved.

## 1. Hard rules (MUST)

1. Use tokens for 100% of fills, strokes, text colors, spacing, gaps, radii and type. Literal hex, rgb, px or font names in UI code or Figma layers = defect. Border widths come from `border width/default` (1) and `border width/thick` (2). Only exception: icon size 16/20px, which has no token yet.
2. In Figma, use instances of the components in section 5. Never detach. If a need is not covered, stop and request a change (section 7).
3. In code, use CSS variables from `tokens.css` (`var(--…)`). Pick the most specific level available: component token > semantic token. Never use primitive (`--colors-*`, `--spacing-*`) or theme-palette (`--brand-*`, `--neutral-*`) tokens directly in UI.
4. Hover and dark mode come from the semantic layer. Do not create new component tokens just for dark mode.
5. Separate interactive states (hover, focus) from functional states (disabled, error).
6. Names describe purpose, not look or screen. Forbidden in names: colors (blue), screens (login), looks (big). Lowercase everything except the component name (`Button/filled/brand/background/hover`, `surface/brand/subtle/default`).
7. Exactly one filled brand Button per view.
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

Levels (a token may alias only lower levels; any brand or neutral color must go through `brand/*` or `neutral/*`, never straight to `colors/*`): **Primitive** (Global tokens, Type tokens) → **Theme palette** (Brand, Neutral) → **Semantic** (color, spacing, radius, typography, stroke) → **Component**.

CSS name = `--` + Figma name, lowercase, with `/`, space and `_` replaced by `-`. Example: `Nav item/background/active` → `--nav-item-background-active`.

Modes are HTML attributes on any element: `data-theme="dark"`, `data-brand="red-brand"`, `data-neutral="gray"`, `data-radius="none-radius"`, `data-font="new-font"`. Defaults: light, default brand, blue neutral, default radius, Inter. A nested element with one mode attribute resets the others; repeat all of them.

### 3.1 Semantic color (resolved, default brand & neutral)

| Token | CSS | Light | Dark |
|---|---|---|---|
| background/primary | `--background-primary` | #ffffff | #000000 |
| background/secondary | `--background-secondary` | #f3f4f6 | #111827 |
| background/tertiary | `--background-tertiary` | #e5e7eb | #1f2937 |
| background/brand | `--background-brand` | #4f46e5 | #818cf8 |
| surface/primary/default | `--surface-primary-default` | #ffffff | #111827 |
| surface/primary/hover | `--surface-primary-hover` | #f9fafb | #1f2937 |
| surface/secondary/default | `--surface-secondary-default` | #f3f4f6 | #1f2937 |
| surface/secondary/hover | `--surface-secondary-hover` | #e5e7eb | #374151 |
| surface/tertiary/default | `--surface-tertiary-default` | #e5e7eb | #374151 |
| surface/tertiary/hover | `--surface-tertiary-hover` | #d1d5db | #4b5563 |
| surface/brand/subtle/default | `--surface-brand-subtle-default` | #e0e7ff | #312e81 |
| surface/brand/medium/default | `--surface-brand-medium-default` | #4f46e5 | #818cf8 |
| surface/brand/medium/hover | `--surface-brand-medium-hover` | #4338ca | #818cf8 |
| surface/error/soft/default | `--surface-error-soft-default` | #ffe9e6 | #68160e |
| surface/success/soft/default | `--surface-success-soft-default` | #e1f3de | #063e17 |
| surface/warning/soft/default | `--surface-warning-soft-default` | #ffebd4 | #4a2f00 |
| surface/info/soft/default | `--surface-info-soft-default` | #dbeafe | #1e3a8a |
| border/primary/default | `--border-primary-default` | #d1d5db | #374151 |
| border/primary/hover | `--border-primary-hover` | #9ca3af | #4b5563 |
| border/secondary | `--border-secondary` | #e5e7eb | #1f2937 |
| border/brand | `--border-brand` | #a5b4fc | #a5b4fc |
| border/error | `--border-error` | #e06f5f | #ff8a79 |
| border/success | `--border-success` | #689d6c | #82b885 |
| border/warning | `--border-warning` | #bd862e | #dba046 |
| border/info | `--border-info` | #3b82f6 | #60a5fa |
| text/primary | `--text-primary` | #000000 | #ffffff |
| text/secondary | `--text-secondary` | #4b5563 | #d1d5db |
| text/brand | `--text-brand` | #4f46e5 | #a5b4fc |
| text/error | `--text-error` | #80281e | #ffb4a8 |
| text/success | `--text-success` | #1d5128 | #a4d2a5 |
| text/warning | `--text-warning` | #624000 | #f3bd6f |
| text/info | `--text-info` | #1e40af | #93c5fd |
| text/inverse | `--text-inverse` | #ffffff | #000000 |
| icon/primary | `--icon-primary` | #000000 | #ffffff |
| icon/secondary | `--icon-secondary` | #374151 | #9ca3af |
| icon/brand | `--icon-brand` | #4f46e5 | #a5b4fc |
| icon/error | `--icon-error` | #80281e | #ffb4a8 |
| icon/success | `--icon-success` | #1d5128 | #a4d2a5 |
| icon/warning | `--icon-warning` | #624000 | #f3bd6f |
| icon/info | `--icon-info` | #1e40af | #93c5fd |
| icon/inverse | `--icon-inverse` | #ffffff | #000000 |
| text/disabled | `--text-disabled` | #9ca3af | #6b7280 |
| background/overlay | `--background-overlay` | #0f121a7a | #000000a3 |
| border/focus | `--border-focus` | #4f46e5 | #a5b4fc |
| surface/brand/subtle/hover | `--surface-brand-subtle-hover` | #c7d2fe | #3730a3 |
| surface/error/medium/default | `--surface-error-medium-default` | #b65042 | #e06f5f |
| surface/error/medium/hover | `--surface-error-medium-hover` | #9d3d30 | #ff8a79 |
| surface/error/medium/pressed | `--surface-error-medium-pressed` | #80281e | #ffb4a8 |
| surface/error/soft/hover | `--surface-error-soft-hover` | #ffd6d0 | #80281e |
| surface/warning/medium/default | `--surface-warning-medium-default` | #dba046 | #dba046 |
| surface/warning/medium/hover | `--surface-warning-medium-hover` | #bd862e | #f3bd6f |
| surface/warning/medium/pressed | `--surface-warning-medium-pressed` | #97660a | #ffdaaa |
| surface/warning/soft/hover | `--surface-warning-soft-hover` | #ffdaaa | #624000 |
| surface/info/medium/default | `--surface-info-medium-default` | #2563eb | #3b82f6 |
| surface/info/medium/hover | `--surface-info-medium-hover` | #1d4ed8 | #60a5fa |
| surface/info/medium/pressed | `--surface-info-medium-pressed` | #1e40af | #93c5fd |
| surface/info/soft/hover | `--surface-info-soft-hover` | #bfdbfe | #1e40af |
| surface/success/medium/default | `--surface-success-medium-default` | #477b4d | #689d6c |
| surface/success/medium/hover | `--surface-success-medium-hover` | #34673b | #82b885 |
| surface/success/medium/pressed | `--surface-success-medium-pressed` | #1d5128 | #a4d2a5 |
| surface/success/soft/hover | `--surface-success-soft-hover` | #cae8c8 | #1d5128 |
| surface/brand/medium/pressed | `--surface-brand-medium-pressed` | #3730a3 | #a5b4fc |
| surface/tertiary/pressed | `--surface-tertiary-pressed` | #9ca3af | #6b7280 |
| text/warning inverse | `--text-warning-inverse` | #311e00 | #311e00 |
| background/inverse | `--background-inverse` | #111827 | #f3f4f6 |
| text/tertiary | `--text-tertiary` | #6b7280 | #9ca3af |
| surface/disabled | `--surface-disabled` | #e5e7eb | #374151 |

### 3.2 Spacing

| Token | CSS | px |
|---|---|---|
| padding/none | `--padding-none` | 0 |
| gap/2xs | `--gap-2xs` | 4 |
| gap/xs | `--gap-xs` | 6 |
| gap/sm | `--gap-sm` | 10 |
| gap/md | `--gap-md` | 12 |
| gap/lg | `--gap-lg` | 16 |
| gap/xl | `--gap-xl` | 24 |
| padding/xs | `--padding-xs` | 4 |
| padding/sm | `--padding-sm` | 8 |
| padding/md | `--padding-md` | 12 |
| padding/lg | `--padding-lg` | 16 |
| padding/xl | `--padding-xl` | 24 |
| layout/section gap | `--layout-section-gap` | 40 |
| layout/page-gutter | `--layout-page-gutter` | 24 |
| layout/grid-gap | `--layout-grid-gap` | 16 |

Global scale (`spacing/n` = n × 4px; only the steps in use are kept): 0=0, 0_5=2, 1=4, 1_5=6, 2=8, 2_5=10, 3=12, 4=16, 6=24, 7=28, 8=32, 10=40, 28=112, 36=144.

### 3.3 Radius

| Token | CSS | px (Default) | px (None radius) |
|---|---|---|---|
| radius/none | `--radius-none` | 0 | 0 |
| radius/xs | `--radius-xs` | 4 | 0 |
| radius/sm | `--radius-sm` | 8 | 0 |
| radius/md | `--radius-md` | 12 | 0 |
| radius/lg | `--radius-lg` | 16 | 0 |
| radius/full | `--radius-full` | 999 | 999 |

### 3.4 Typography

Family: `font/family` → Inter (mode `new font` → Roboto Mono). Sizes px: xs=12, sm=14, base=16, lg=18, xl=20, 2xl=24, 3xl=30, 4xl=36, 5xl=48, 6xl=60, 7xl=72, 8xl=96, 9xl=128.
Line heights px: 1=16, 2=20, 3=24, 4=28, 5=32, 6=36, 7=40, 8=48, 9=48, 10=60, 11=72, 12=96, 13=128.
Weights: thin=100, extralight=200, light=300, normal=400, medium=500, semibold=600, bold=700, extrabold=800, black=900.
Styles used by components: 20/32 semibold (page title), 16/24 semibold (card/course title), 14/20 medium (labels, buttons, nav, tabs), 14/20 semibold (step and session titles), 14/20 regular (values, descriptions), 12/16 medium (badge, avatar), 12/16 regular (helper, meta). Text colour: titles text/primary, subtitles/labels/helper text/secondary, captions/meta/axis text/tertiary (white or card surfaces only).

## 4. Contrast facts (computed)

| Pair | Light | Dark |
|---|---|---|
| Button/filled/brand/foreground on Button/filled/brand/background/default | 6.29 | 7.04 |
| Button/filled/neutral/foreground on Button/filled/neutral/background/default | 16.96 | 10.31 |
| Button/filled/danger/foreground on Button/filled/danger/background/default | 4.98 | 6.61 |
| Button/filled/warning/foreground on Button/filled/warning/background/default | 6.94 | 6.94 |
| Button/filled/info/foreground on Button/filled/info/background/default | 5.17 | 5.71 |
| Button/filled/success/foreground on Button/filled/success/background/default | 4.99 | 6.63 |
| Button/outlined/brand/foreground on background/primary | 6.29 | 10.53 |
| Button/outlined/danger/foreground on background/primary | 9.37 | 12.35 |
| Button/disabled/foreground on Button/disabled/background | 2.05 | 2.13 |
| Badge/draft/text on Badge/draft/background | 8.03 | 7.26 |
| Badge/published/text on Badge/published/background | 8.0 | 7.22 |
| Badge/info/text on Badge/info/background | 5.1 | 5.73 |
| Badge/neutral/text on Badge/neutral/background | 6.87 | 9.96 |
| Avatar/text on Avatar/background | 5.1 | 5.73 |
| Icon button/icon on Icon button/background/default | 21.0 | 21.0 |
| Icon button/border/default on Icon button/background/default | 1.24 | 1.43 |
| Input/text/value on Input/background/default | 21.0 | 21.0 |
| Input/text/placeholder on Input/background/default | 4.83 | 8.27 |
| Input/text/error on background/primary | 9.37 | 12.35 |
| Input/border/default on Input/background/default | 1.47 | 2.04 |
| Toggle/thumb/background on Toggle/track/background/on | 6.29 | 7.04 |
| Toggle/track/background/off on background/primary | 1.47 | 2.78 |
| Checkbox/icon on Checkbox/background/checked | 6.29 | 7.04 |
| Checkbox/border/unchecked on Checkbox/background/unchecked | 1.47 | 2.04 |
| Tab/text/active on Tab/background/active | 6.29 | 10.53 |
| Tab/text/default on background/primary | 7.56 | 14.25 |
| Nav item/foreground/default on Sidebar/background | 6.76 | 1.32 |
| Nav item/foreground/active on Nav item/background/active | 6.29 | 8.9 |
| Step/indicator/icon on Step/indicator/background/completed | 6.29 | 7.04 |
| Step/indicator/text/current on Step/indicator/background/current | 5.1 | 5.73 |
| Step/indicator/text/upcoming on Step/indicator/background/upcoming | 6.87 | 9.96 |
| Card/title/text on Card/background | 21.0 | 17.74 |
| Card/description/text on Card/background | 7.56 | 12.04 |
| Sidebar/user/name/text on Sidebar/user/background | 21.0 | 17.74 |
| Topbar/title/text on Topbar/background | 21.0 | 17.74 |
| Topbar/subtitle/text on Topbar/background | 7.56 | 12.04 |
| Step/title/text on Card/background | 21.0 | 17.74 |
| Course card/title/text on Course card/background | 21.0 | 17.74 |
| Course card/meta/text on Course card/background | 4.83 | 6.99 |
| Course card/cover/icon on Course card/cover/background | 6.29 | 10.53 |
| Session row/index/text on Session row/index/background | 5.1 | 5.73 |
| Session row/title/text on Session row/background | 21.0 | 17.74 |
| Session row/meta/text on Session row/background | 4.83 | 6.99 |
| text/primary on surface/info/soft/default | 17.21 | 10.36 |
| text/secondary on surface/warning/soft/default | 6.51 | 8.39 |
| icon/error on surface/error/soft/default | 8.06 | 7.22 |
| text/primary on surface/success/soft/default | 18.08 | 12.29 |
| text/primary on surface/primary/default | 21.0 | 17.74 |
| text/brand on surface/primary/default | 6.29 | 8.9 |
| icon/warning on surface/primary/default | 9.32 | 10.41 |
| Table header/text on Table header/background | 17.04 | 11.42 |
| Table row/title/text on Table row/background | 21.0 | 17.74 |
| Table row/meta/text on Table row/background | 4.83 | 6.99 |

## 5. Components

### Button (Core, Figma 246:1816, 144 variants)

Triggers an action. One Button = one action. Use for: Actions on a page, form or dialog (Save draft, Publish course, Add session, Delete). Not for: Navigation between pages (use Nav item or a link). Toggling a setting (use Toggle).

- **size**: md: height 44 · sm: height 32; hug width; outlined keeps a 1px border inside the same height
- **padding**: md: Button/md/padding/horizontal → padding/lg 16, vertical → padding/md 12 · sm: padding/md 12, spacing/1_5 6
- **gap**: gap/xs 6
- **radius**: Button/radius → radius/md = 12
- **type**: label/md: 16 / 20 Medium (Inter)
- **properties**: `Label` Text = Button (any string); `Leading icon` Boolean = false (true / false); `Leading icon swap` Instance swap = plus (any icon from Icons page); `Trailing icon` Boolean = false (true / false); `Trailing icon swap` Instance swap = arrow-right-01 (any icon from Icons page); `Appearance` Variant = filled (filled / outlined); `Intent` Variant = brand (brand (Main) / neutral, danger, warning, info, success (Secondary)); `Size` Variant = md (md / sm); `State` Variant = default (default / hover / pressed / focus / loading / disabled)
- **anatomy**: Container → Button/{appearance}/{intent}/background/*, border/*; Leading Icon → Button/{appearance}/{intent}/foreground; Label → Button/{appearance}/{intent}/foreground; Trailing Icon → Button/{appearance}/{intent}/foreground; Spinner → Spinner/foreground; Focus Ring → Button/focus/{intent}/border, Button/focus/opacity, Button/focus/radius, Button/focus/width
- **tokens** (light / dark): `--button-filled-brand-background-default` #4f46e5/#818cf8; `--button-filled-brand-background-hover` #4338ca/#818cf8; `--button-filled-brand-foreground` #ffffff/#000000; `--button-filled-neutral-background-default` #e5e7eb/#374151; `--button-filled-neutral-background-hover` #d1d5db/#4b5563; `--button-filled-neutral-foreground` #000000/#ffffff; `--button-radius` 12px; `--button-outlined-brand-foreground` #4f46e5/#a5b4fc; `--button-outlined-brand-border-default` #a5b4fc/#a5b4fc; `--button-outlined-brand-background-hover` #e0e7ff/#312e81; `--button-outlined-neutral-border-default` #e5e7eb/#1f2937; `--button-outlined-neutral-border-hover` #9ca3af/#4b5563; `--button-outlined-neutral-foreground` #000000/#ffffff; `--button-outlined-neutral-background-hover` #f9fafb/#1f2937; `--button-disabled-background` #e5e7eb/#374151; `--button-disabled-foreground` #9ca3af/#6b7280; `--button-filled-brand-background-pressed` #3730a3/#a5b4fc; `--button-outlined-brand-background-pressed` #c7d2fe/#3730a3; `--button-outlined-brand-border-hover` #a5b4fc/#a5b4fc; `--button-filled-neutral-background-pressed` #9ca3af/#6b7280; `--button-outlined-neutral-background-pressed` #e5e7eb/#374151; `--button-filled-danger-background-default` #b65042/#e06f5f; `--button-filled-danger-background-hover` #9d3d30/#ff8a79; `--button-filled-danger-background-pressed` #80281e/#ffb4a8; `--button-filled-danger-foreground` #ffffff/#000000; `--button-outlined-danger-background-hover` #ffe9e6/#68160e; `--button-outlined-danger-background-pressed` #ffd6d0/#80281e; `--button-outlined-danger-border-default` #e06f5f/#ff8a79; `--button-outlined-danger-border-hover` #e06f5f/#ff8a79; `--button-outlined-danger-foreground` #80281e/#ffb4a8; `--button-filled-warning-background-default` #dba046/#dba046; `--button-filled-warning-background-hover` #bd862e/#f3bd6f; `--button-filled-warning-background-pressed` #97660a/#ffdaaa; `--button-filled-warning-foreground` #311e00/#311e00; `--button-outlined-warning-background-hover` #ffebd4/#4a2f00; `--button-outlined-warning-background-pressed` #ffdaaa/#624000; `--button-outlined-warning-border-default` #bd862e/#dba046; `--button-outlined-warning-border-hover` #bd862e/#dba046; `--button-outlined-warning-foreground` #624000/#f3bd6f; `--button-filled-info-background-default` #2563eb/#3b82f6; `--button-filled-info-background-hover` #1d4ed8/#60a5fa; `--button-filled-info-background-pressed` #1e40af/#93c5fd; `--button-filled-info-foreground` #ffffff/#000000; `--button-outlined-info-background-hover` #dbeafe/#1e3a8a; `--button-outlined-info-background-pressed` #bfdbfe/#1e40af; `--button-outlined-info-border-default` #3b82f6/#60a5fa; `--button-outlined-info-border-hover` #3b82f6/#60a5fa; `--button-outlined-info-foreground` #1e40af/#93c5fd; `--button-filled-success-background-default` #477b4d/#689d6c; `--button-filled-success-background-hover` #34673b/#82b885; `--button-filled-success-background-pressed` #1d5128/#a4d2a5; `--button-filled-success-foreground` #ffffff/#000000; `--button-outlined-success-background-hover` #e1f3de/#063e17; `--button-outlined-success-background-pressed` #cae8c8/#1d5128; `--button-outlined-success-border-default` #689d6c/#82b885; `--button-outlined-success-border-hover` #689d6c/#82b885; `--button-outlined-success-foreground` #1d5128/#a4d2a5; `--button-disabled-border` #e5e7eb/#1f2937; `--button-focus-brand-border` #4f46e5/#818cf8; `--button-md-padding-horizontal` 16px; `--button-md-padding-vertical` 12px; `--button-sm-padding-horizontal` 12px; `--button-sm-padding-vertical` 6px; `--button-focus-neutral-border` #4b5563/#d1d5db; `--button-focus-danger-border` #b65042/#e06f5f; `--button-focus-warning-border` #dba046/#dba046; `--button-focus-info-border` #2563eb/#3b82f6; `--button-focus-success-border` #477b4d/#689d6c; `--button-focus-opacity` 0.5; `--button-focus-radius` 16px; `--button-focus-width` 2px
- **must**: Use a native <button> element; type="button" unless it submits a form. Keyboard: Tab to focus, Enter and Space activate. Visible focus ring (State=focus): 2px ring in Button/focus/<intent>/border at Button/focus/opacity (50%), 2px gap, radius Button/focus/radius. In code: a ::after ring on :focus-visible using those variables. Loading: keep the button width, set aria-busy="true" and keep the label for screen readers (visually hidden). Disabled: use the disabled attribute and keep the label readable; explain why nearby if the reason is not obvious. md height 44 meets the 44×44 touch target; sm 32 is for desktop-dense areas only.
- **never**: Don't detach the Button to change its color. Pick another Intent instead. Don't use two filled brand Buttons side by side. Don't use warning/info/success Intents for the main action of a page; they are for contextual actions inside alerts and banners.
- **limits**: Long labels: Button hugs its text; above ~24 characters rewrite the label rather than wrap it. Labels never wrap to two lines. Loading keeps the width of the label so the layout does not jump. Outlined brand keeps border/brand on hover and changes only the background.

### Badge (Core, Figma 246:1825, 4 variants)

Shows a short, read-only status such as Draft or Published. Use for: Course and session status, counts that do not need interaction. Not for: Anything clickable (use Tab or Button). Long text.

- **size**: height 24, hug width
- **padding**: padding/xs 4 · padding/sm 8
- **gap**: 0
- **radius**: Badge/radius → radius/full = 999
- **type**: 12 / 16 Medium
- **properties**: `Label` Text = Draft (any string); `Status` Variant = draft (draft / published / info / neutral)
- **anatomy**: Container → Badge/{status}/background; Label → Badge/{status}/text
- **tokens** (light / dark): `--badge-draft-background` #ffebd4/#4a2f00; `--badge-draft-text` #624000/#f3bd6f; `--badge-published-background` #e1f3de/#063e17; `--badge-published-text` #1d5128/#a4d2a5; `--badge-info-background` #e0e7ff/#312e81; `--badge-info-text` #4f46e5/#a5b4fc; `--badge-neutral-background` #f3f4f6/#1f2937; `--badge-neutral-text` #4b5563/#d1d5db; `--badge-radius` 999px
- **must**: Badge is not interactive: no tabindex, no hover. Color is never the only signal: the label always names the status. If the badge updates live, announce it with a polite live region in the parent.
- **never**: Don't add icons by detaching. Request a property instead. Don't invent new colors per screen; map new statuses to the 4 existing ones first.
- **limits**: Max label length ~16 characters; beyond that, truncate in code with title attribute. Dark mode (since 1.1.0): status surfaces use the 900 step and text the 300 step, so badges stay above 5.2:1.

### Avatar (Core, Figma 246:1830, 2 variants)

Represents a person with their initials. Use for: Instructor and student identity in Topbar, Sidebar user row, lists. Not for: Course or brand images (use Course card cover).

- **size**: sm 32×32 · md 40×40
- **padding**: 0 (centered)
- **gap**: 0
- **radius**: Avatar/radius → radius/full
- **type**: 12 / 16 Medium
- **properties**: `Initials` Text = SK (1–2 letters); `Size` Variant = sm (sm / md)
- **anatomy**: Container → Avatar/background; Initials → Avatar/text
- **tokens** (light / dark): `--avatar-background` #e0e7ff/#312e81; `--avatar-text` #4f46e5/#a5b4fc; `--avatar-radius` 999px
- **must**: Decorative next to a visible name: aria-hidden="true". Alone: role="img" with aria-label set to the full name.
- **never**: Don't put more than 2 letters. Don't use it as a button without wrapping it in Icon button behaviour.
- **limits**: No photo variant yet. Adding one is a minor release (new boolean 'Photo' + image fill). Non-Latin names: use the first two grapheme clusters.

### Icon button (Core, Figma 246:1837, 4 variants)

An action shown only as an icon, such as notifications or more options. Use for: Toolbar actions where the icon is universally understood (bell, more, close). Not for: Primary actions; anything where an icon alone is ambiguous.

- **size**: 46×46 (20 icon + 2×12 padding + 1px border)
- **padding**: padding/md 12
- **gap**: 0
- **radius**: Icon button/radius → radius/md = 12
- **type**: —
- **properties**: `Icon` Instance swap = bell (any icon); `State` Variant = default (default / hover / pressed / disabled); `Focus ring` Boolean = false (true / false)
- **anatomy**: Container → Icon button/background/*, Icon button/border/default; Icon → Icon button/icon
- **tokens** (light / dark): `--icon-button-background-default` #ffffff/#000000; `--icon-button-background-hover` #f9fafb/#1f2937; `--icon-button-border-default` #e5e7eb/#1f2937; `--icon-button-icon` #000000/#ffffff; `--icon-button-radius` 12px; `--icon-button-background-pressed` #e5e7eb/#374151; `--icon-button-background-disabled` #f3f4f6/#1f2937; `--icon-button-border-hover` #9ca3af/#4b5563; `--icon-button-icon-disabled` #9ca3af/#6b7280; `--icon-button-focus-border` #4f46e5/#a5b4fc; `--icon-button-focus-opacity` 0.5; `--icon-button-focus-radius` 16px; `--icon-button-focus-width` 2px
- **must**: Keyboard focus shows the Focus ring (2px border/focus, 2px outside); in code use :focus-visible. aria-label is required and describes the action ("Open notifications"). Keyboard: Tab, Enter, Space. 46×46 exceeds the 44×44 target.
- **never**: Don't use for destructive actions without confirmation.
- **limits**: border/secondary on background/primary is below 3:1; the icon, not the border, carries meaning.

### Input (Core, Figma 247:1844, 12 variants)

Lets people enter or pick a single value. Also covers Textarea (Multiline) and Select (Trailing icon = chevron). Use for: Course title, description, price, search, and dropdown pickers. Not for: Yes/no choices (use Toggle or Checkbox).

- **size**: width 320 (fills parent); field 46 high (1px border), 48 in focus (2px border); multiline field 112
- **padding**: Field: 12 all sides
- **gap**: gap/xs 6 between Label, Field, Helper; 10 inside Field
- **radius**: Input/radius → radius/md = 12
- **type**: Label 14/20 Medium · Value 14/20 Regular · Helper 12/16 Regular
- **properties**: `Label` Text = Label (string); `Show label` Boolean = true; `Value` Text = Value (string); `Helper text` Text = Helper text (string); `Show helper` Boolean = false; `Leading icon` Boolean = false; `Leading icon swap` Instance swap = search (icon); `Trailing icon` Boolean = false; `Trailing icon swap` Instance swap = chevron-down (icon); `Multiline` Variant = false (false / true); `State` Variant = default (default / placeholder / focus / error / disabled)
- **anatomy**: Label → Input/text/label; Field (Container) → Input/background/*, Input/border/*; Leading icon → Input/icon; Value / Placeholder → Input/text/value, Input/text/placeholder; Trailing icon → Input/icon; Helper text → Input/text/helper, Input/text/error
- **tokens** (light / dark): `--input-background-default` #ffffff/#000000; `--input-background-disabled` #f3f4f6/#1f2937; `--input-border-default` #d1d5db/#374151; `--input-border-focus` #a5b4fc/#a5b4fc; `--input-border-error` #e06f5f/#ff8a79; `--input-text-label` #000000/#ffffff; `--input-text-value` #000000/#ffffff; `--input-text-placeholder` #6b7280/#9ca3af; `--input-text-helper` #4b5563/#d1d5db; `--input-text-error` #80281e/#ffb4a8; `--input-icon` #374151/#9ca3af; `--input-radius` 12px; `--input-text-disabled` #9ca3af/#6b7280; `--input-border-hover` #9ca3af/#4b5563
- **must**: Every field has a visible <label for>. Placeholder never replaces the label. Error: aria-invalid="true" and aria-describedby pointing to the helper text. Error is shown by text, not only by the red border. Focus: border becomes 2px border/brand (State=focus variant, as in Figma). Select: use native <select> or a combobox with listbox semantics.
- **never**: Don't make a new 'Login Input' or 'Search Input' component. Use properties. Don't put a slot inside Input.
- **limits**: Field border (border/primary/default) is below 3:1 against white; consider neutral/400 for 1.4.11 (major-impact token change, needs review). Long values: single line scrolls horizontally; Multiline grows to max 5 lines then scrolls.

### Toggle (Core, Figma 247:1849, 4 variants)

Turns a setting on or off immediately. Use for: Settings that take effect at once (Free preview, Allow comments). Not for: Choices that need a Save button (use Checkbox).

- **size**: 40×24 track, 16×16 thumb
- **padding**: padding/xs 4
- **gap**: 0
- **radius**: Toggle/radius → radius/full
- **type**: —
- **properties**: `State` Variant = on (on / off); `Focus ring` Boolean = false (true / false)
- **anatomy**: Track (Container) → Toggle/track/on, Toggle/track/off; Thumb → Toggle/thumb/background
- **tokens** (light / dark): `--toggle-track-background-on` #4f46e5/#818cf8; `--toggle-track-background-off` #d1d5db/#4b5563; `--toggle-thumb-background` #ffffff/#000000; `--toggle-radius` 999px; `--toggle-track-background-disabled` #e5e7eb/#374151; `--toggle-thumb-background-disabled` #f3f4f6/#1f2937
- **must**: Keyboard focus shows the Focus ring (2px border/focus, 2px outside); in code use :focus-visible. role="switch" with aria-checked. Keyboard: Space toggles. Always pair with a visible text label. Hit area must be at least 44×24 including label (track alone is 40×24).
- **never**: Don't use a Toggle inside a form that has a Submit button.
- **limits**: No disabled state yet. Off track (neutral/300) on white is ~1.5:1; the thumb position and label carry meaning.

### Checkbox (Core, Figma 247:1854, 6 variants)

Selects one or more options from a list. Use for: Multi-select lists, agreeing to terms, bulk selection. Not for: Instant on/off settings (use Toggle).

- **size**: 20×20
- **padding**: 0
- **gap**: 0
- **radius**: Checkbox/radius → radius/xs = 2
- **type**: —
- **properties**: `State` Variant = unchecked (checked / unchecked); `Focus ring` Boolean = false (true / false)
- **anatomy**: Container → Checkbox/background/*, Checkbox/border/unchecked; Check icon → Checkbox/icon
- **tokens** (light / dark): `--checkbox-background-checked` #4f46e5/#818cf8; `--checkbox-background-unchecked` #ffffff/#000000; `--checkbox-border-unchecked` #d1d5db/#374151; `--checkbox-icon` #ffffff/#000000; `--checkbox-radius` 4px; `--checkbox-background-checked-hover` #4338ca/#818cf8; `--checkbox-border-unchecked-hover` #9ca3af/#4b5563; `--checkbox-background-disabled` #e5e7eb/#374151; `--checkbox-border-disabled` #e5e7eb/#1f2937; `--checkbox-icon-disabled` #9ca3af/#6b7280
- **must**: Keyboard focus shows the Focus ring (2px border/focus, 2px outside); in code use :focus-visible. Native <input type="checkbox"> with a <label>. 20×20 is below the 24×24 minimum (WCAG 2.5.8); the clickable label must extend the target. Keyboard: Space.
- **never**: Don't use for a single instant setting.
- **limits**: No indeterminate state; needed for 'select all' (minor release). No disabled or error state yet.

### Tab (Core, Figma 247:1859, 3 variants)

Switches between views of the same content. Use for: Courses list filters (All, Draft, Published), course detail sections. Not for: Moving to another page (use Nav item).

- **size**: height 36, hug width
- **padding**: padding/sm 8 · padding/md 12
- **gap**: 0
- **radius**: Tab/radius → radius/md = 12
- **type**: 14 / 20 Medium
- **properties**: `Label` Text = Tab (string); `State` Variant = default (default / hover / active); `Focus ring` Boolean = false (true / false)
- **anatomy**: Container → Tab/background/active; Label → Tab/text/*
- **tokens** (light / dark): `--tab-text-default` #4b5563/#d1d5db; `--tab-text-active` #4f46e5/#a5b4fc; `--tab-background-active` #ffffff/#000000; `--tab-radius` 12px; `--tab-background-hover` #f9fafb/#1f2937; `--tab-text-hover` #000000/#ffffff
- **must**: Keyboard focus shows the Focus ring (2px border/focus, 2px outside); in code use :focus-visible. role="tablist" on the group, role="tab" with aria-selected on each, role="tabpanel" on content. Arrow keys move between tabs; Tab moves into the panel. Height 36 is below 44; keep 8px between tabs for touch.
- **never**: Don't wrap tabs to two rows; scroll horizontally instead.
- **limits**: Use Tabs in a plain row (gap/xs); TabsList (segmented) is not used on screens anymore. Put counts in the label: Drafts (2).

### Nav item (Core, Figma 247:1881, 3 variants)

A link to a top-level page in the Sidebar. Use for: Dashboard, Courses, Students, Analytics. Not for: Actions (use Button).

- **size**: 232×36 (fills Sidebar)
- **padding**: padding/sm 8 · padding/md 12
- **gap**: gap/md 12
- **radius**: Nav item/radius → radius/md = 12
- **type**: 14 / 20 Medium
- **properties**: `Label` Text = Nav item (string); `Icon` Instance swap = home (icon); `State` Variant = default (default / hover / active); `Focus ring` Boolean = false (true / false)
- **anatomy**: Container → Nav item/background/*; Icon → Nav item/foreground/*; Label → Nav item/foreground/*
- **tokens** (light / dark): `--nav-item-background-hover` #f9fafb/#1f2937; `--nav-item-background-active` #ffffff/#111827; `--nav-item-foreground-default` #4b5563/#d1d5db; `--nav-item-foreground-active` #4f46e5/#a5b4fc; `--nav-item-radius` 12px
- **must**: Keyboard focus shows the Focus ring (2px border/focus, 2px outside); in code use :focus-visible. Render as <a href>. The active item gets aria-current="page". Wrap the group in <nav aria-label="Main">.
- **never**: Don't nest Nav items more than one level.
- **limits**: Long labels truncate with ellipsis at 232px width. Collapsed (icon-only) Sidebar is not designed yet.

### Step (Core, Figma 247:1906, 3 variants)

One step of a multi-step flow, with its number and title. Use for: Inside Stepper only. Not for: Standalone progress or lists.

- **size**: hug, indicator 32×32
- **padding**: 0
- **gap**: gap/md 12
- **radius**: Step/radius → radius/full (indicator)
- **type**: Number & Title 14/20 Semi Bold · Description 12/16 Regular
- **properties**: `Number` Text = 1 (1–9); `Title` Text = Step title (string); `Description` Text = Description (string); `State` Variant = completed (completed / current / upcoming)
- **anatomy**: Indicator → Step/indicator/*; Title → Step/title/text; Description → Step/description/text
- **tokens** (light / dark): `--step-indicator-background-completed` #4f46e5/#818cf8; `--step-indicator-background-current` #e0e7ff/#312e81; `--step-indicator-background-upcoming` #f3f4f6/#1f2937; `--step-indicator-border-current` #a5b4fc/#a5b4fc; `--step-indicator-text-current` #4f46e5/#a5b4fc; `--step-indicator-text-upcoming` #4b5563/#d1d5db; `--step-indicator-icon` #ffffff/#000000; `--step-title-text` #000000/#ffffff; `--step-description-text` #4b5563/#d1d5db; `--step-radius` 999px; `--step-connector-border-default` #e5e7eb/#1f2937; `--step-connector-border-completed` #a5b4fc/#a5b4fc
- **must**: Current step: aria-current="step". Completed state must also be announced in text (visually hidden "completed").
- **never**: Don't use Step outside Stepper.
- **limits**: No error state for a step with problems (proposal for a later minor release).

### Card (Core, Figma 247:1907, 1 variant)

A structural container with optional header and a Content slot. Use for: Grouping form sections, stats, summaries. Not for: Making a new card component for each screen; put the layout in the Content slot.

- **size**: width 480 default (fills parent), hug height
- **padding**: padding/xl 24
- **gap**: gap/lg 16
- **radius**: Card/radius → radius/lg = 16
- **type**: Title 16/24 Semi Bold · Description 14/20 Regular
- **properties**: `Content` Slot = — (any instances); `Title` Text = Card title (string); `Description` Text = Supporting description (string); `Show header` Boolean = true; `Show description` Boolean = true
- **anatomy**: Container → Card/background, Card/border; Header → Card/title/text, Card/description/text; Content (Slot) → —
- **tokens** (light / dark): `--card-background` #ffffff/#111827; `--card-border` #e5e7eb/#1f2937; `--card-title-text` #000000/#ffffff; `--card-description-text` #4b5563/#d1d5db; `--card-radius` 16px
- **must**: If the card has a title, use a heading element at the right level. A clickable card is a single link wrapping the title, not nested buttons.
- **never**: Don't nest a Card inside a Card.
- **limits**: Slot content must use the same tokens; the Card does not restyle children.

### Sidebar (Composite, Figma 497:7995, 6 variants)

Main app navigation with logo, nav groups and the user row. Use for: Every app screen (left side). Not for: Inside modals or narrow widths below 1024px. Built from: Nav item, Avatar.

- **size**: 264×1024 (full height)
- **padding**: padding/xl 24 · padding/lg 16
- **gap**: gap/xl 24
- **radius**: 0
- **type**: Name 16/24 Semi Bold · Section 12/16 Medium · Nav 14/20
- **properties**: `User name` Text = Sanaz Kiani (string); `User role` Text = Instructor (string); `Active item` Variant = Dashboard (Dashboard / Courses / Students / Messages / Analytics / Earnings)
- **anatomy**: Logo → Sidebar/logo/*; Navigation → Nav item/*; Spacer → —; User → Sidebar/user/*
- **tokens** (light / dark): `--sidebar-background` #eef2ff/#eef2ff; `--sidebar-border` #e5e7eb/#1f2937; `--sidebar-logo-background` #4f46e5/#818cf8; `--sidebar-logo-icon` #ffffff/#000000; `--sidebar-user-background` #ffffff/#111827; `--sidebar-user-icon` #374151/#9ca3af; `--sidebar-user-name-text` #000000/#ffffff; `--sidebar-user-role-text` #4b5563/#d1d5db
- **must**: <nav aria-label="Main"> landmark. Settings icon in user row needs aria-label.
- **never**: Don't detach to reorder items; edit the main component.
- **limits**: Used on every app screen (meets the 3+ reuse rule). Sidebar background is surface/brand/soft/default; the active Nav item is white (surface/primary/default), the others have no fill. No collapsed/mobile variant yet.

### Topbar (Composite, Figma 248:1857, 1 variant)

Page header with title, subtitle, search, notifications and avatar. Use for: Top of every app screen. Not for: Inside cards. Built from: Input, Icon button, Avatar.

- **size**: 1176×85 (fills content area)
- **padding**: padding/lg 16 · padding/xl 24
- **gap**: gap/lg 16
- **radius**: 0
- **type**: Title 20/32 Semi Bold · Subtitle 14/20 Regular
- **properties**: `Title` Text = Page title (string); `Subtitle` Text = Page subtitle (string); `Show search` Boolean = true
- **anatomy**: Heading → Topbar/title/text, Topbar/subtitle/text; Search → Input/*; Notifications → Icon button/*; Avatar → Avatar/*
- **tokens** (light / dark): `--topbar-background` #ffffff/#111827; `--topbar-border` #e5e7eb/#1f2937; `--topbar-title-text` #000000/#ffffff; `--topbar-subtitle-text` #4b5563/#d1d5db
- **must**: Title is the page <h1>. Search input has a label (visually hidden is fine) and role="search" on its form.
- **never**: Don't add page actions into the Topbar; put them in the page header area.
- **limits**: Used on 7 of 7 screens. Title truncates at one line.

### Stepper (Composite, Figma 248:2023, 4 variants)

Shows progress through the 4-step Create course flow. Use for: Create course flow: Details, Sessions, Preview, Publish. Not for: Flows with more than 5 steps. Built from: Step.

- **size**: 1112×70
- **padding**: padding/lg 16 · padding/xl 24
- **gap**: gap/lg 16
- **radius**: Card/radius → radius/lg = 16 (no own tokens since 2.1.0)
- **type**: from Step
- **properties**: `Current` Variant = 1 (1 / 2 / 3 / 4)
- **anatomy**: Container → Card/background, Card/border; Step ×4 → Step/*; Connector ×3 → Step/connector/border/*
- **must**: <ol> with each step as <li>; current gets aria-current="step".
- **never**: Don't edit Step states inside the Stepper by hand.
- **limits**: Used on 4 screens (meets the 3+ rule). Fixed to 4 steps; a 3- or 5-step flow needs a new variant set (minor).

### Course card (Composite, Figma 144:160, 1 variant)

A course summary with cover, status, title and stats. Use for: Dashboard, Courses list, Publish confirmation. Not for: Session-level items (use Session row). Built from: Badge, Icon button.

- **size**: 320×282
- **padding**: Body: padding/lg 16
- **gap**: gap/md 12
- **radius**: Course card/radius → radius/lg = 16
- **type**: Title 16/24 Semi Bold · Meta 12/16 Regular
- **properties**: `Title` Text = Course title (string); `Category` Text = Design (string); `Sessions` Text = 8 sessions (string); `Duration` Text = 4h 30m (string); `Students` Text = 0 students (string); `Cover` Slot = Status badge + icon (Badge, icon or illustration)
- **anatomy**: Cover (slot) → Course card/cover/*; Category → Course card/category/text; Title → Course card/title/text; Meta → Course card/meta/*; Footer → Course card/meta/*, Icon button/*
- **tokens** (light / dark): `--course-card-background` #ffffff/#111827; `--course-card-border` #e5e7eb/#1f2937; `--course-card-cover-background` #ffffff/#000000; `--course-card-cover-icon` #4f46e5/#a5b4fc; `--course-card-title-text` #000000/#ffffff; `--course-card-meta-text` #6b7280/#9ca3af; `--course-card-meta-icon` #374151/#9ca3af; `--course-card-radius` 16px; `--course-card-category-text` #4f46e5/#a5b4fc
- **must**: Whole card is one link (title is the link text). Cover icon is decorative (aria-hidden).
- **never**: Don't put buttons inside the card.
- **limits**: Title over 2 lines truncates with ellipsis. No image cover yet.

### Session row (Composite, Figma 248:2052, 1 variant)

One session in a course outline, editable or read-only. Use for: Add sessions, Preview, Publish. Not for: Course-level lists. Built from: Badge, icons.

- **size**: 720×66 (fills parent)
- **padding**: padding/md 12 · padding/lg 16
- **gap**: gap/md 12
- **radius**: Session row/radius → radius/md = 12
- **type**: Title 14/20 Semi Bold · Meta 12/16 Regular
- **properties**: `Number` Text = 01 (2 digits); `Title` Text = Session title (string); `Meta` Text = Video · 12 min (type · duration); `Type icon` Instance swap = video (icon); `Show drag handle` Boolean = true; `Show actions` Boolean = true; `Show badge` Boolean = false
- **anatomy**: Drag handle → Session row/icon; Index → Session row/index/*; Text → Session row/title/text, Session row/meta/text; Free preview badge → Badge/info/*; Actions → Session row/icon
- **tokens** (light / dark): `--session-row-background` #ffffff/#111827; `--session-row-border` #e5e7eb/#1f2937; `--session-row-index-background` #e0e7ff/#312e81; `--session-row-index-text` #4f46e5/#a5b4fc; `--session-row-title-text` #000000/#ffffff; `--session-row-meta-text` #6b7280/#9ca3af; `--session-row-icon` #374151/#9ca3af; `--session-row-radius` 12px
- **must**: Drag handle needs a keyboard alternative (Move up / Move down buttons). Action icons need aria-labels ("Edit session 1").
- **never**: Don't detach to hide parts; use the booleans.
- **limits**: Used on 3 screens (meets the 3+ rule). Title truncates at one line.

### Alert (Core, Figma 263:2027, 4 variants)

An inline message about the page or a section: saved, failed, needs attention. Use for: Autosave status, validation summaries, offline notice, publish blockers. Not for: Short confirmations after an action (use Toast). Errors that belong to one field (use Input error).

- **size**: fills its container, hug height
- **padding**: padding/lg 16 · padding/md 12
- **gap**: gap/md 12 (icon to text) · gap/2xs 4 (title to description)
- **radius**: radius/md = 12
- **type**: Title 14/20 Semi Bold · Description 14/20 Regular
- **properties**: `Tone` Variant = info (info / success / warning / error); `Title` Text = Draft saved automatically (string); `Description` Text = … (string); `Show action` Boolean = true; `Show close` Boolean = true
- **anatomy**: Container → surface/{tone}/soft/default, border/{tone}; Leading Icon → icon/{tone}; Title → text/primary; Description → text/secondary; Action → Button/outlined/neutral/*; Close → icon/secondary
- **must**: Errors and warnings use role="alert"; info and success use role="status". The icon is decorative; the title names the problem in words. Close has aria-label="Dismiss".
- **never**: Don't stack more than one Alert per section.
- **limits**: Status colours come from the coral (error), amber (warning) and jade (success) palettes since 2.1.0.

### Toast (Core, Figma 263:2057, 4 variants)

A short, temporary confirmation after an action, with an optional action. Use for: Course published, session deleted (with Undo), upload failed (with Retry). Not for: Messages people must read to continue (use Alert or Dialog).

- **size**: hug width, height 40
- **padding**: padding/md 12 · padding/sm 8
- **gap**: gap/sm 10
- **radius**: radius/md = 12
- **type**: Message 14/20 Medium · Action 14/20 Semi Bold
- **properties**: `Tone` Variant = success (success / error / warning / info); `Message` Text = Course published (string); `Show action` Boolean = false
- **anatomy**: Container → surface/primary/default, border/primary/default; Leading Icon → icon/{tone}; Message → text/primary; Action → text/brand; Close → icon/secondary
- **must**: Render in a polite live region (role="status"); errors use role="alert". Stay at least 5 s; pause on hover and focus. Never put the only path to an action in a Toast.
- **never**: Don't use a Toast for errors that block the flow.
- **limits**: On mobile the Toast sits above the sticky action bar.

### Activity table (Composite, Figma 659:6120, 1 variant)

Recent learner activity: who, which course, progress, last active and status. Use for: Dashboard (Recent activity) and any short activity list (up to 5 rows). Not for: Long, sortable or paginated data (needs a data table, not designed yet). Built from: Card, Table header, Table row, Avatar, Progress bar, Badge.

- **size**: fills its column
- **padding**: Card padding/xl 24 · rows padding/sm 8
- **gap**: gap/lg 16 between columns
- **radius**: Card/radius; Table header/radius → radius/sm = 8
- **type**: Header 12/16 Semi Bold · Name 14/20 Medium · Meta 12/16
- **properties**: `Title` Text = Recent activity (string); `Rows` Instances = 4 (1–5)
- **anatomy**: Card → Card/*; Table header → Table header/*; Table row ×4 → Table row/*, Progress bar/*, Badge/*
- **must**: Use a real <table> with <th scope="col">. Progress bar has role="progressbar" with aria-valuenow, or the % text next to it. Status is a Badge with a word, not colour only.
- **never**: Don't add a column to one row only.
- **limits**: Below 768px the table scrolls horizontally inside the card.

### 3.5 Stroke, opacity, layout

Stroke: `--border-width-default` 1px, `--border-width-thick` 2px. Opacity: `--opacity-50` 0.5. Layout: `--layout-section-gap` 40px, `--layout-page-gutter` 24px, `--layout-grid-gap` 16px.

## 6. Known issues (do not copy these patterns into new work)

1. **2 component tokens alias deleted variables** (high). Button/outlined/brand/background/hover → deleted VariableID:118:519; Button/outlined/brand/background/pressed → deleted VariableID:471:1841. tokens.css uses the nearest live token until this is fixed: Button/outlined/brand/background/hover → surface/brand/subtle/default; Button/outlined/brand/background/pressed → surface/brand/subtle/hover. Fix proposed: Re-alias in Figma (e.g. outlined brand hover → surface/brand/subtle/default, pressed → surface/brand/subtle/hover).
2. **4 component tokens skip the semantic layer** (medium). These alias colors/indigo/* directly, so the 'red brand' mode and dark mode do not change them: Sidebar/background, Gauge/track/border, Heatmap cell/level 2/background, Heatmap cell/level 3/background. Fix proposed: Alias semantic tokens instead (e.g. Sidebar/background → a brand-soft semantic token through brand/50 | brand/950).
3. **Text contrast below 4.5:1** (medium). text/tertiary on background/secondary (light) = 4.39:1. Use text/tertiary only on white or card surfaces (background/primary, surface/primary/default). Fix proposed: Keep captions on white/card surfaces, or use text/secondary on gray and brand-soft surfaces.
4. **Control borders below 3:1** (medium). border/primary/default on background/primary (light) = 1.47:1; border/primary/default on background/primary (dark) = 2.04:1. WCAG 1.4.11 asks 3:1 for the boundary of form controls. Fix proposed: Point border/primary/default one step darker (neutral/400 light, neutral/600 dark). Minor release.
5. **Missing interactive states** (low). Added in 2.1.0: Icon button pressed/disabled, Checkbox and Toggle checked × default/hover/disabled, Tab hover, Input hover, Toast warning. Still missing: indeterminate on Checkbox; pressed on Tab and Nav item; Badge status names (draft/published → warning/success) and the Stepper axis are pending API renames. Fix proposed: Add as variants (functional states) one component at a time. Minor release each.
6. **Code syntax typo on padding/none** (low). In Figma, padding/none has WEB code syntax var(--padding-xl). Generated CSS uses the name (--padding-none), so code is right, but Dev Mode shows the wrong variable. Fix proposed: Set the WEB code syntax of padding/none to var(--padding-none).

## 7. Change process and versioning

- Version format MAJOR.MINOR.PATCH, shared by Figma library and git tag.
- PATCH: fix with no visual or API change (typo in token name inside Figma only, wrong binding). MINOR: backward-compatible addition (new variant, state, component, token). MAJOR: breaking change (rename/remove a CSS variable, remove a variant, change a public property such as Disabled, redesign).
- Steps: 1 Request (problem, proposal, affected tokens/components) → 2 Impact & risk analysis (list dependents, choose version type, check contrast in both themes and brands) → 3 Change design and code together → 4 Owner review → 5 Changelog entry per component and system → 6 Publish Figma library + git tag + regenerate tokens.css, agent.md, docs site.
- Current version: 2.1.0.
