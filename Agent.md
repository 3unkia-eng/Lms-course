# Agent.md — LMS course prototype

> Read this file first, before any task in this repository. Then read [Design.md](Design.md) for every visual decision.
> Status: AI draft, awaiting review by the design system owner (Sani).

## 1. What this project is

A **coded prototype** of the LMS flow "Create & publish a course", built from the Figma file
[Foundation](https://www.figma.com/design/fkI3mGHWAToov6nhyWUZx5/Foundation) (page `LMS DASHBOARD`).
It runs locally, on Vercel (main live URL) and on GitHub Pages (backup mirror), and is meant for **usability testing with real users**.
It is **not production code**: there is no backend, no auth and no real upload. Data lives in memory and `localStorage`.

Flow (Figma frame `📱 Create & publish a course`, 250:1945):

| # | Screen | Route | File | Figma |
|---|---|---|---|---|
| 01 | Dashboard | `#/` | `src/pages/Dashboard.tsx` | 250:1946 |
| 02 | Courses | `#/courses` | `src/pages/Courses.tsx` | 250:2185 |
| 03 | Create course (step 1, Basic info) | `#/courses/:id/basic` | `src/pages/CreateCourse.tsx` | 251:2371 |
| 04 | Course details (step 2) | `#/courses/:id/details` | `src/pages/CourseDetails.tsx` | 251:2638 |
| 05 | Add sessions (step 3) | `#/courses/:id/sessions` | `src/pages/AddSessions.tsx` | 252:2712 |
| 06 | Preview (step 4, Review & publish) | `#/courses/:id/preview` | `src/pages/Preview.tsx` | 252:3073 |
| 07 | Publish success (Draft → Published) | `#/courses/:id/published` | `src/pages/Published.tsx` | 252:3463 |
| – | Course page (View course) | `#/courses/:id` | `src/pages/CourseView.tsx` | – |

UI states and edge cases (Figma section `🧭 UI states & edge cases`, 263:3431) and mobile screens (`📱 Mobile · 375`, 265:5311) are built into the same screens. See section 6.

Behavior and copy come from the UX strategy doc (`/ux-strategy/course-flow-ux-strategy.md` in the project files): flows A1–A6, U1–U8, edge cases (§9) and acceptance criteria F1–F6 (§10). Business rules live in `src/data/rules.ts`.

## 2. Stack

| Part | Choice | Why |
|---|---|---|
| Build | Vite 6 | Fast local dev, static build |
| UI | React 19 + TypeScript (strict) | Typed component API (props = Figma properties) |
| Routing | React Router 7, `HashRouter` | Works on GitHub Pages with no server rewrites |
| Styles | Plain CSS per component + CSS variables from `tokens.css` | Tokens are the single source of truth; dark mode by attribute |
| Icons | `lucide-react` | Same outline style and names as the Figma Icons page |
| State | React context + `useReducer`, persisted to `localStorage` | Participants can reload without losing a draft |

No CSS framework, no CSS-in-JS, no UI kit. Do not add one.

## 3. Commands

```bash
npm install          # once
npm run dev          # local prototype at http://localhost:5173
npm run build        # type-check + production build into dist/
npm run preview      # serve dist/ locally
npm run lint:tokens  # fails on any hardcoded color or px value in src/, or if tokens.css drifts from the Figma snapshot
npm run sync:tokens -- <path/to/tokens.css>   # copy a new token export in
```

Run `npm run lint:tokens` and `npm run build` before every commit. Both must pass.

## 4. Project structure

```
Agent.md                 ← you are here (rules for agents)
vercel.json              ← Vercel build, SPA rewrite, cache and security headers
.env.example             ← how Environment Variables work (no secrets in code)
Design.md                ← tokens, spacing, type, responsive and dark-mode rules
tokens/tokens.json       ← token snapshot exported from Figma (W3C format, reference only)
public/docs/             ← GENERATED live design-system docs, served at /docs/ (replace, never hand-edit)
scripts/
  check-hardcoded.mjs    ← token lint
  check-token-source.mjs ← tokens.css must equal the Figma snapshot (tokens/tokens.json)
  sync-tokens.mjs        ← copies a new tokens.css export into src/styles
src/
  main.tsx               ← imports the CSS layers in order, mounts <App/>
  app/
    App.tsx              ← routes
    PrototypePanel.tsx   ← moderator panel (modes + simulated edge cases)
    toast.tsx            ← toast host (one at a time)
  styles/
    tokens.css           ← GENERATED from Figma. Never edit by hand.
    tokens.ext.css       ← prototype-only proposed tokens (layout, icon size, overlay, motion)
    base.css             ← reset, focus ring, helpers (.stack, .row, .only-mobile…)
    typography.css       ← text styles (.text-page-title, .text-label…)
  components/
    core/                ← one job each, context-free (Figma 🧩 Core components)
    composite/           ← combinations of core used in 3+ places (Figma 🧩 Composite components)
  features/
    wizard/              ← shared step logic (useWizard, WizardFrame, autosave indicator)
    courses/             ← list loading/error/skeleton states
  data/
    types.ts  rules.ts  seed.ts  store.tsx  prototype.tsx
  pages/                 ← one file per screen + pages.css (layouts only)
```

### Component inventory (code ↔ Figma)

| Code | Level | Figma node | Notes |
|---|---|---|---|
| `Button`, `ButtonLink` | Core | 246:1816 | `variant` = Type, `appearance` = Appearance; `loading` is a proposal |
| `Badge` | Core | 246:1825 | `status`: draft / published / info / neutral |
| `Avatar` | Core | 246:1830 | sm 32 / md 40 |
| `IconButton` | Core | 246:1837 | `label` required (aria-label); `ghost` appearance for row actions |
| `Input` | Core | 247:1844 | single line, `multiline`, `options` (= Select), error, disabled |
| `Toggle` | Core | 247:1849 | `role="switch"`; disabled is a proposal |
| `Checkbox` | Core | 247:1854 | native input; `readOnly` for the publish checklist |
| `Tabs` | Core | 247:1859 | WAI-ARIA tabs, arrow keys |
| `NavItem` | Core | 247:1881 | active from route |
| `Step` | Core | 247:1906 | completed steps are buttons (jump back) |
| `Card` | Core | 247:1907 | Header + Content slot (`children`) |
| `Skeleton` | Core | 263:1946 | text / block / circle |
| `EmptyState` | Core | 263:1947 | `tone="error"` for load errors |
| `Alert` | Core | 263:2027 | info / success / warning / error |
| `Toast` | Core | 263:2057 | success / error / info, action, close |
| `Dialog` | Core (structural) | – | proposal; native `<dialog>` |
| `Sidebar` | Composite | 248:1770 | desktop only; drawer below 1024 |
| `Topbar` | Composite | 248:1857 | title is the page `<h1>` |
| `Stepper` | Composite | 248:2023 | `current` 1–4 |
| `CourseCard` + `CourseCover` | Composite | 248:2024 | whole card is one link |
| `SessionRow` | Composite | 248:2052 | Move up/down = keyboard alternative to drag |
| `ActionBar` | Composite | – | proposal: footer actions on desktop, sticky bar on mobile |
| `AppShell` | Layout | – | Sidebar + Topbar / mobile header, offline banner, session-expired dialog |

## 5. Hard rules (MUST)

1. **Tokens only.** Every color, spacing, radius, size and type value comes from a CSS variable. No hex, `rgb()`, `hsl()` or `px` in `src/` outside the two token files. `npm run lint:tokens` enforces this. Exceptions are listed in Design.md §2 (border width, motion timing, media queries).
2. **Most specific token wins:** component token (`--button-…`) > semantic token (`--surface-…`, `--text-…`, `--gap-…`, `--padding-…`) > prototype token (`tokens.ext.css`). Never use color primitives (`--colors-*`) or palette tokens (`--brand-*`, `--neutral-*`) in UI code. The raw spacing and type scales (`--spacing-*`, `--size-*`, `--leading-*`, `--weight-*`) are allowed only where no semantic token exists (fixed sizes like a 32px indicator, text styles), because Figma has no semantic size or text tokens yet.
3. **Never edit `src/styles/tokens.css`.** It is generated from Figma. To change a token, change it in Figma and re-export, or propose it in `tokens.ext.css` with a comment, and list it in the PR.
4. **Dark mode must work** for every change. Check light and dark (Prototype panel → Theme) before you commit. Dark values come from the semantic layer; never add `[data-theme="dark"]` rules in component CSS.
5. **Reuse before you build.** Use the components in `src/components`. A new Composite needs 3+ uses. Name components by what they are, never by screen or look.
6. **Component API = Figma properties.** Variants become union props, Booleans become boolean props, Instance swaps become `ReactNode` props, Slots become `children`. Interactive states (hover, focus) are CSS; functional states (disabled, error, loading) are props.
7. **One filled primary Button per view.**
8. **Accessibility:** semantic HTML first; every icon-only control has a label; visible focus ring (`:focus-visible`, 2px `--border-focus`); text contrast ≥ 4.5:1; touch targets ≥ 44px on mobile; errors announced (`role="alert"`) and focus moves to the first invalid field.
9. **English UI, left to right.** Copy is sentence case, no trailing periods on buttons.
10. **No new dependencies** without asking. No backend calls; simulate with `data/prototype.tsx`.

## 6. States and edge cases (where they live)

| Case | Trigger in the prototype | Implemented in |
|---|---|---|
| Courses loading (skeletons) | Panel → Course list: Stays loading | `features/courses` |
| Courses load error + Retry | Panel → Course list: Fails first time | `features/courses` |
| Empty drafts / published / search | Tabs, search | `Courses.tsx` |
| New instructor (no courses, stats "—") | Panel → New instructor | `Dashboard.tsx` |
| Validation errors + summary, focus first error | Continue with empty fields | `CreateCourse.tsx` |
| Duplicate title warning (U7) | Reuse an existing title | `CreateCourse.tsx` |
| Leave with changes (U8) | Cancel on step 1 | `CreateCourse.tsx` |
| Cover upload failed (type, size, network) | Wrong file, > 5 MB, or Panel → Cover upload fails | `CourseDetails.tsx` |
| Price required when not free | Turn Free off, Continue | `CourseDetails.tsx` |
| Offline banner, saved on device | Panel → Offline | `AppShell`, `useWizard` |
| No sessions (empty) | New course, step 3 | `AddSessions.tsx` |
| Delete session + Undo | Trash icon | `AddSessions.tsx` |
| Session expired dialog (U4) | Panel → Session expired | `AppShell` |
| Publish disabled with reason (U6) | Fewer than 3 sessions, missing cover, etc. | `Preview.tsx` |
| Publish failed toast + Retry (U5) | Panel → Publish fails | `Preview.tsx` |
| Double-click publish (idempotent) | Click twice | `Preview.tsx` |
| Mobile 375 (sticky action bar, header back) | Resize below 1024 | `AppShell`, `ActionBar`, pages.css |

URL presets for test scripts: `?scenario=offline`, `loading`, `load-error`, `session-expired`, `publish-fails`, `upload-fails`; `?theme=dark`; `?panel=off` hides the moderator panel from participants.

## 7. Git workflow

- `main` is always runnable. Never commit straight to `main`.
- One branch per task: `feat/<thing>`, `fix/<thing>`, `docs/<thing>`, `chore/<thing>`.
- Small commits, imperative subject (`Add Stepper composite`), one concern each.
- Before pushing: `npm run lint:tokens && npm run build`.
- Open a PR into `main`; describe what changed, which Figma nodes, and screenshots in light and dark. Pull `main` and rebase before you push to avoid conflicts.
- Start a fresh agent conversation for each new task so earlier context does not leak in.

## 8. How to do a typical task

**Implement or update a screen from Figma**
1. Get the node id from Figma (right click → Copy link). Read its design context (Figma MCP `get_design_context`), or use a screenshot + SVG export + the Design Docs plugin output if MCP is not available.
2. Map every layer to an existing component (section 4). Map every value to a token (Design.md).
3. Build in `src/pages/<Screen>.tsx`; layout CSS goes in `pages.css`, never inside a component.
4. Add the screen's states (loading, empty, error) and the mobile layout.
5. Check light, dark and 375px; run the lint and build; commit.

**Add a component**
1. Confirm it exists in Figma, or that it is used in 3+ places (Composite).
2. Create `src/components/<level>/<Name>/<Name>.tsx` + `<Name>.css`, document the Figma node and props in a JSDoc block, export it from the level's `index.ts`.
3. Only component/semantic tokens in its CSS.

## 9. Known gaps (do not copy these patterns)

- Proposed tokens in `tokens.ext.css` (layout sizes, icon sizes, overlay, elevation, motion) are not in Figma yet.
- Not in Figma yet but needed by the flow: Button Loading, Toggle Disabled, Dialog, ActionBar, course cover image.
- Dark mode `Background/primary` is pure black, so inputs and outlined buttons are darker than the card surface. This follows the tokens; a token review is suggested (Design.md §8).
- Drag-and-drop reorder is replaced by Move up / Move down buttons.

## 10. Deploy and environments

| Where | URL | Updates when | Config |
|---|---|---|---|
| Vercel (primary) | the project's `*.vercel.app` URL | every push to `main` (Production); every PR gets its own Preview URL | `vercel.json` |
| GitHub Pages (backup mirror) | https://3unkia-eng.github.io/Lms-course/ | every push to `main` | `.github/workflows/pages.yml` |

- `base: './'` in `vite.config.ts` plus `HashRouter` make the same build work on both hosts. Do not change one without the other.
- `vercel.json` runs `npm run lint:tokens && npm run build`, so a hardcoded value or a hand-edited token fails the Vercel deploy too. The rewrite to `index.html` keeps deep links working if the app ever moves to `BrowserRouter`.
- **Secrets never go in code.** Add them in Vercel → Project → Settings → Environment Variables. Only `VITE_*` variables reach the browser, and they are public. See `.env.example`.
- Always pull `main` before you start a task, and never push straight to `main`: a merge to `main` is a production deploy.
- Rollback: Vercel → Deployments → pick the last good one → Promote to Production (instant). Or `git revert` the bad commit on a branch and merge.
- Backups: the code lives in three places (GitHub, Vercel's immutable deployments, GitHub Pages). Design tokens live in Figma (version history) and in `tokens/tokens.json`. Participant data is only in each browser's `localStorage`, so there is nothing server-side to back up.

