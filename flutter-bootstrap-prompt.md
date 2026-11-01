# Claude Code bootstrap prompt — `flutter-codelabs` repo

Run this once in an empty folder (e.g. `flutter-codelabs/`) with Claude Code. It scaffolds the repo only. It does NOT write the lab content (that is the next prompt).

Copy `flutter-course-plan.md` and `flutter-conventions.md` into the folder first.

---

```text
Scaffold a repo for a bilingual (French/English) Flutter codelab site. Do the scaffolding only: do not write the lab steps yet.

1. Run `git init` and set the default branch to main.
2. Create this structure:
   - CLAUDE.md
   - docs/index.html   (language chooser: two big buttons, FR and EN)
   - docs/fr.html      (placeholder shell: header, step container, language switch link)
   - docs/en.html      (same shell in English)
   - docs/style.css    (shared styles: readable on phone and projector, code blocks with a copy button, step cards, dark mode)
   - docs/app.js       (copy-to-clipboard for code blocks, step progress saved in localStorage with try/catch)
   - scripts/check.py  (checker, see below)
   - flutter-course-plan.md and flutter-conventions.md stay at the repo root
3. Write CLAUDE.md with these rules:
   - Source of truth: flutter-course-plan.md and flutter-conventions.md. Never invent versions.
   - Pages are static HTML, no build step, hosted on GitHub Pages from /docs.
   - fr.html and en.html must have the same steps in the same order, same ids (step-0 … step-6).
   - Each page starts with a prerequisites card (`<section id="prerequisites">`) BEFORE step-0. It is not a step card and is never counted as one.
   - All code, identifiers, commands and code comments are in English in BOTH pages. Code blocks must be byte-identical between fr.html and en.html.
   - Each step is a card with: goal, duration, numbered instructions, expected result, "If stuck" (checkpoint tag + common errors), optional bonus.
   - French uses « » and "Étape" with the accent; English uses "Step".
4. Write scripts/check.py using only the Python standard library. It must fail with a non-zero exit code if:
   - fr.html and en.html have a different number of step cards or different step ids (the prerequisites card is excluded from these checks);
   - either page lacks the `id="prerequisites"` card, or it does not come before step-0;
   - the list of <pre><code> blocks differs between the two files (compare text exactly);
   - any step card lacks the five required parts;
   - any French step title uses "Etape" without the accent;
   - any code block contains a non-ASCII French accent character inside a comment.
   Print a clear message for each failure.
5. Make an initial commit with the message "chore: scaffold flutter codelabs repo".
6. Run `python scripts/check.py` and show the result. With empty shells it should pass or only report that there are 0 steps; fix the script if it crashes.

When done, list the files created and the exact command to preview locally (`python -m http.server --directory docs 8000`). Do not create a GitHub remote.
```

---

## Next prompt (after bootstrap): generate the codelab content

```text
Read CLAUDE.md, flutter-course-plan.md and flutter-conventions.md. Fill docs/fr.html and docs/en.html with steps 0 to 6 of the Notes app codelab.

- Start each page with the prerequisites card from flutter-conventions.md section 0 (Flutter SDK, Git for Windows, Android Studio, VS Code + Flutter extension, phone + USB cable), with the official download links and the pre-session checklist, placed before Step 0.
- Use the exact code from flutter-conventions.md section 4. Do not change it.
- Follow the timeline in flutter-course-plan.md (durations per step).
- Every step needs: goal, duration, numbered instructions, expected result, "If stuck" with the checkpoint tag (step-N) and the relevant rows from the troubleshooting tables, and a bonus when the plan lists one.
- Add a language switch link at the top of each page pointing to the other language.
- Run `python scripts/check.py` and fix every failure before finishing.
- Commit with the message "feat: add notes_app codelab (FR/EN)".
```

---

## Third prompt (after the content): quizzes + live dashboard

Copy `quizzes.json`, `quiz.js`, `dashboard.html`, `firebase-config.example.js`, `firestore.rules` and `flutter-quiz-spec.md` into the repo first (the .js/.html/.json files go in `docs/`, the others at the root). Do the Firebase Console setup from the spec yourself before testing.

```text
Read CLAUDE.md and flutter-quiz-spec.md. The quiz files are already in docs/ (quizzes.json, quiz.js, dashboard.html, firebase-config.example.js).

1. In docs/fr.html and docs/en.html: add `<div class="quiz" data-step="N"></div>` at the end of every step card (N = 0 to 6), and `<script type="module" src="quiz.js"></script>` before </body>. Make sure <html lang> is "fr" / "en".
2. Add the quiz styles to docs/style.css (large tap targets, right/wrong shown with a symbol and not only color, dark mode).
3. Create docs/firebase-config.js from firebase-config.example.js and keep the REPLACE_ME values (the config is not secret and must be published; do not gitignore it). Tell me at the end which values I must fill.
4. Update scripts/check.py with the rules from the "Checker additions" section of flutter-quiz-spec.md. Run it and fix every failure.
5. Do not modify quizzes.json text. If a question contradicts the code in flutter-conventions.md, tell me instead of silently changing it.
6. Commit with the message "feat: add quizzes and live dashboard".
```

---

## Reference solution repo (private/public, separate)

Create `flutter-notes-solution` with the final `notes_app` and Git tags `step-0` … `step-6` matching the checkpoint table in `flutter-conventions.md`. Test the whole thing once on a clean Windows machine with a phone before the session.
