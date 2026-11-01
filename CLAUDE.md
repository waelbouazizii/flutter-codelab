# CLAUDE.md — flutter-codelabs

Bilingual (French/English) Flutter codelab site for the `notes_app` lab.

## Sources of truth
- `flutter-course-plan.md` (timing, step structure, cut line) and `flutter-conventions.md` (versions, setup, code templates, checkpoints, troubleshooting).
- Never invent versions. If something looks outdated, say so and check docs.flutter.dev / pub.dev.

## Hosting
- Pages are static HTML, no build step, hosted on GitHub Pages from `/docs`.
- Files: `docs/index.html` (language chooser), `docs/fr.html`, `docs/en.html`, `docs/style.css`, `docs/app.js`.
- Preview locally: `python -m http.server --directory docs 8000`.

## Page rules
- `fr.html` and `en.html` must have the same steps in the same order, with the same ids (`step-0` … `step-6`).
- Each page starts with a prerequisites card (`<section id="prerequisites">`) BEFORE `step-0`. It is not a step card and is never counted as one.
- All code, identifiers, commands and code comments are in English in BOTH pages. Code blocks (`<pre><code>`) must be byte-identical between `fr.html` and `en.html`.
- French uses « » quotes and "Étape" with the accent. English uses "Step".

## Step card markup
Each step is a `<section class="step" id="step-N">` containing these parts (the first five are required):

| Part | Element |
|---|---|
| Goal | `<div class="step-goal">` |
| Duration | `<div class="step-duration">` |
| Numbered instructions | `<ol class="step-instructions">` |
| Expected result | `<div class="step-result">` |
| If stuck (checkpoint tag + common errors) | `<div class="step-stuck">` |
| Bonus (optional) | `<div class="step-bonus">` |

## Checks
- Run `python scripts/check.py` before every commit. It must exit 0.
