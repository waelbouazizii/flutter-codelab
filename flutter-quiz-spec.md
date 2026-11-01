# Quiz + live dashboard — spec

Goal: 3 multiple-choice questions at the end of every step (0–6 → 21 questions). Students answer in the codelab page; the instructor watches live statistics on `dashboard.html`.

Files (all in `docs/` of the `flutter-codelabs` repo):

| File | Role |
|---|---|
| `quizzes.json` | The 21 questions, FR + EN text, options, correct index, explanation. Single source for students and dashboard. |
| `quiz.js` | Student widget. Fills every `<div class="quiz" data-step="N">`. ES module. |
| `firebase-config.js` | Your Firebase web config + `SESSION_ID`. Created from `firebase-config.example.js`. Not secret. |
| `dashboard.html` | Instructor-only live stats (Google sign-in). Page is public, data is not. |
| `firestore.rules` | Security rules (repo root; paste in Console or deploy with Firebase CLI). |

## Design decisions

- **No student login.** A random id is kept in the browser (`localStorage`). This avoids Firebase anonymous sign-in, which has a per-IP cap on new accounts that a whole class on one university network could hit.
- **Firestore, not Realtime Database.** `onSnapshot` gives live updates; rules can validate every field.
- **One document per answer**, id = `SESSION_ID_studentId_quizId`. Rules allow `create` only, so each student answers each question once, and nobody can edit or delete.
- **Reading is locked to your Google account** (`request.auth.token.email` + `email_verified`). Students can write but never read other answers.
- **Correct answers are in `quizzes.json`**, so a curious student can read them in the browser. Fine for a low-stakes check; do not use this for grades.
- **Privacy:** only a random id, an optional nickname (≤ 30 chars), question id, chosen option and timestamp. Say in class that answers are anonymous and the nickname is optional.
- **Works offline-ish:** if Firebase is unreachable, the student still sees right/wrong and the explanation; only the live stats miss that answer.

## Data model (collection `answers`)

```json
{
  "session": "iset-2026-11-15",
  "studentId": "a1b2c3d4e5f6g7h8i9j0",
  "nickname": "",
  "quizId": "s2-q3",
  "step": 2,
  "selected": 1,
  "lang": "fr",
  "ts": "<server timestamp>"
}
```

Expected volume: 30 students × 21 answers ≈ 630 writes. The dashboard re-reads only changed documents after the first load, so a session stays far under the Spark free daily limits (50,000 reads / 20,000 writes per day, checked 2026-11-01). Keep one dashboard tab open, and do not leave several open on a refresh loop.

## Firebase setup (≈ 10 min, once, you do it)

1. Console → https://console.firebase.google.com → **Add project** (disable Google Analytics).
2. **Build → Firestore Database → Create database** → production mode, choose a nearby region (e.g. `eur3`).
3. **Rules** tab → paste `firestore.rules`. Replace `INSTRUCTOR_EMAIL` with your Google address (the one you will sign in with). **Publish.**
4. **Build → Authentication → Get started → Sign-in method → Google → Enable** (only for you). 
5. Authentication → **Settings → Authorized domains** → add `<your-github-user>.github.io` (and `localhost` is already there for local tests).
6. **Project settings → Your apps → Web (`</>`)** → register app → copy the config object into `docs/firebase-config.js`.
7. Set `SESSION_ID` to a new value for each session.
8. Test: open `fr.html`, answer a question, open `dashboard.html`, sign in, see the answer appear. Then check that a student browser cannot read: open the browser console on `fr.html` and confirm there is no way to list answers (rules return `permission-denied`).

## Page integration

Each step card ends with (inside the card, after the "If stuck" part and before the bonus, or as its own sixth part):

```html
<div class="quiz" data-step="2"></div>
```

Add before `</body>` in `fr.html` and `en.html`:

```html
<script type="module" src="quiz.js"></script>
```

and add the quiz styles to `style.css` (`.quiz`, `.quiz-q`, `.quiz-opt`, `.quiz-opt.right`, `.quiz-opt.wrong`, `.quiz-feedback`, `.quiz-nick`). Use large tap targets (≥ 44 px) and make right/wrong visible with a symbol or text, not color alone.

The `<html lang>` attribute must be `fr` on `fr.html` and `en` on `en.html` (quiz.js reads it).

## Checker additions (`scripts/check.py`)

Fail with a clear message if:
- a step card has no `<div class="quiz" data-step="N">` with N equal to the step number;
- `quizzes.json` is not valid JSON, or a step 0–6 does not have exactly 3 questions, or ids are not `sN-q1..q3`;
- a question lacks `fr` or `en` for `q`, any option, or `explain`; or has fewer than 2 or more than 4 options; or `answer` is out of range;
- the two language versions of an option differ in code (text inside backticks must be identical in `fr` and `en`).

## Time budget (say it plainly in class)

21 questions at ~1 minute each is ~20 minutes of a 180-minute session, and the plan is already tight. Recommended: use the quiz as a 3-minute check at the end of each step (~20 min total), with the dashboard on the projector, and drop the quiz of any step you are behind on. Quizzes are not part of the core path: the cut line is unchanged.

## Risks to know

- Shared Wi-Fi at the guest university may block `gstatic.com` or Firestore (WebSocket/long-polling). Test on their network before the day, or from a phone hotspot.
- Anyone who knows your project config can write junk answers (rules only check shape). Use a new `SESSION_ID` each time, and delete the project or restrict the rules after the session if you want.
- Spark plan: if quotas are exceeded the product stops until the next period. Not a risk at this volume.
