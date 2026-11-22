# LMS · Create & publish a course — coded prototype

A runnable React prototype of the LMS "Create & publish a course" flow, built from the Figma
[Foundation](https://www.figma.com/design/fkI3mGHWAToov6nhyWUZx5/Foundation) file (page `LMS DASHBOARD`)
for **usability testing**. Not production code.

**Live prototype:** deployed on Vercel from `main` (URL added after the first deploy). Backup mirror: https://3unkia-eng.github.io/Lms-course/ (GitHub Pages).

Dashboard → Courses → Create course → Course details → Add sessions → Preview → Publish (Draft → Published),
plus loading, empty, error, offline, session-expired and publish-failed states, light/dark mode and a 375px mobile layout.

## Run it locally

Needs Node.js 20+.

```bash
git clone https://github.com/3unkia-eng/Lms-course.git
cd Lms-course
npm install
npm run dev        # opens http://localhost:5173
```

## Running a usability test

- The **Prototype** button (bottom left) is the moderator panel: switch light/dark, brand, radius and font modes, and simulate slow loading, load errors, offline, session expired, publish failure and upload failure. "Fill this course with sample data" fills the current draft with *Introduction to UI Design*.
- Hide the panel from participants with `?panel=off`, e.g. `https://3unkia-eng.github.io/Lms-course/?panel=off`.
- Preset a scenario: `?scenario=offline` (also `loading`, `load-error`, `session-expired`, `publish-fails`, `upload-fails`) and `?theme=dark`.
- Data is saved in the browser (`localStorage`). Panel → "Reset sample courses" starts a fresh session for the next participant.

Suggested tasks: (1) Create a course called "Introduction to UI Design" and publish it. (2) Save a draft, leave, and continue it from Courses → Drafts. (3) Reorder sessions and delete one. (4) Try to publish with only 2 sessions.

## For designers and agents

- [Agent.md](Agent.md) — project structure, stack, constraints and workflow. Read first.
- [Design.md](Design.md) — tokens, color roles, spacing, typography, responsive and dark-mode rules.
- `src/styles/tokens.css` is generated from Figma. Update it with `npm run sync:tokens -- path/to/tokens.css`.
- `npm run lint:tokens` fails if any hardcoded color or px value sneaks into `src/`.

## Deploy

Every push to `main` deploys automatically to Vercel (Production) and to GitHub Pages (backup). Every pull request gets its own Vercel Preview URL to review before merging.

First-time setup in Vercel:
1. Sign in at https://vercel.com with GitHub.
2. Add New → Project → import `3unkia-eng/Lms-course` (grant access to the repo if asked).
3. Framework preset: **Vite** (detected from `vercel.json`; build `npm run lint:tokens && npm run build`, output `dist`). Leave Root Directory as `./`.
4. Deploy. Later, add any secrets under Settings → Environment Variables, never in code. See `.env.example`.

