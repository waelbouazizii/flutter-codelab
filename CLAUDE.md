# CLAUDE.md — flutter-codelabs

Bilingual (French/English) Flutter codelab site for the `notes_app` lab.

## Sources of truth
- `flutter-course-plan.md` (timing, step structure, cut line) and `flutter-conventions.md` (versions, setup, code templates, checkpoints, troubleshooting).
- Never invent versions. If something looks outdated, say so and check docs.flutter.dev / pub.dev.

## Hosting
- Pages are static HTML, no build step, hosted on GitHub Pages from `/docs`.
- Files: `docs/index.html` (redirect), `docs/fr.html`, `docs/en.html`, `docs/style.css`, `docs/app.js`.
- Preview locally: `python -m http.server --directory docs 8000`.

## Layout
- `index.html` shows no chooser: it redirects to `fr.html` by default, or to `en.html` when localStorage `flutter-codelab-lang` is `"en"` (the `#hash` is kept).
- `fr.html` / `en.html`: a navy sidebar (course name, then Prerequisites, Step 0 … Step 6, with a "Break 10 min" divider after Step 2) and a main column (top bar with menu button on mobile, current panel title, Previous / Next, FR | EN toggle; progress bar; content area).
- One panel at a time: the prerequisites card and the 7 step cards all have the class `panel`; the URL hash (`#prerequisites`, `#step-0` … `#step-6`) selects the visible one. Logic lives in `docs/app.js`.
- The FR | EN toggle opens the other page on the same `#hash` and saves the choice in `flutter-codelab-lang`. Completed steps are saved in `flutter-codelab-progress` (shared by both pages).
- Under 768px the sidebar becomes a drawer over a dark overlay.
- External assets (exact versions): Google Fonts Roboto + Roboto Mono, Font Awesome 6.4.0, Prism 1.29.0 (prism-tomorrow, core, autoloader), all from the CDNs already linked.
- No emojis in the pages: use Font Awesome 6.4.0 icons.

## Page rules
- `fr.html` and `en.html` must have the same steps in the same order, with the same ids (`step-0` … `step-6`).
- Each page starts with a prerequisites card (`<section id="prerequisites">`) BEFORE `step-0`. It is not a step card and is never counted as one.
- All code, identifiers, commands and code comments are in English in BOTH pages. Code blocks (`<pre><code>`) must be byte-identical between `fr.html` and `en.html`.
- French uses « » quotes and "Étape" with the accent. English uses "Step".

## Step card markup
The prerequisites card is `<section id="prerequisites" class="panel">`. Each step is a `<section class="step panel" id="step-N">` containing these parts (the first five are required):

| Part | Element |
|---|---|
| Goal | `<div class="step-goal">` |
| Duration | `<div class="step-duration">` |
| Numbered instructions | `<ol class="step-instructions">` |
| Expected result | `<div class="step-result">` |
| If stuck (checkpoint tag + common errors) | `<div class="step-stuck">` |
| Bonus (optional) | `<div class="step-bonus">` |
| Quiz (required, last in the card) | `<div class="quiz" data-step="N"></div>` (empty) |

## Quizzes
- Spec: `flutter-quiz-spec.md`. 3 questions per step (steps 0 to 6), ids `sN-q1` … `sN-q3`.
- Quiz text lives ONLY in `docs/quizzes.json` (FR + EN), never in the HTML. Each step card ends with an empty `<div class="quiz" data-step="N"></div>`; the prerequisites card has none.
- `docs/quiz.js` (ES module, loaded with `<script type="module" src="quiz.js">`) fills the divs and reads `<html lang>` (`fr` / `en`).
- Code inside backticks in an option must be identical in `fr` and `en`. When code in `flutter-conventions.md` changes, re-check that `quizzes.json` still matches it.
- `docs/firebase-config.js` is published on purpose (not secret; access is controlled by `firestore.rules`). Do not gitignore it. Use a new `SESSION_ID` per session.
- `docs/dashboard.html` is for the instructor only: never link to it from `fr.html`, `en.html` or `index.html`.

## Checks
- Run `python scripts/check.py` before every commit. It must exit 0.
