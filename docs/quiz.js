// docs/quiz.js — student-side quiz widget (shared by fr.html and en.html).
// Usage in a step card:  <div class="quiz" data-step="2"></div>
// Needs: docs/quizzes.json, docs/firebase-config.js (exports firebaseConfig, SESSION_ID).
// If Firebase is unreachable the quiz still works locally: only the live stats are lost.
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";
import { firebaseConfig, SESSION_ID } from "./firebase-config.js";

const lang = document.documentElement.lang === "fr" ? "fr" : "en";
const T = {
  fr: { nick: "Pseudo (facultatif)", ok: "Bonne réponse !", ko: "Pas tout à fait.", sent: "Réponse envoyée", offline: "Hors ligne : réponse non comptée dans les statistiques", title: "Quiz" },
  en: { nick: "Nickname (optional)", ok: "Correct!", ko: "Not quite.", sent: "Answer sent", offline: "Offline: answer not counted in the live stats", title: "Quiz" },
}[lang];

function safeGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function safeSet(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

// Anonymous identity without any account: a random id kept in this browser.
let studentId = safeGet("quiz-student-id");
if (!studentId) {
  studentId = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  safeSet("quiz-student-id", studentId);
}

let db = null;
try { db = getFirestore(initializeApp(firebaseConfig)); } catch { db = null; }

async function send(quiz, step, selected, nickname) {
  if (!db) throw new Error("no-db");
  const id = `${SESSION_ID}_${studentId}_${quiz.id}`;
  await setDoc(doc(db, "answers", id), {
    session: SESSION_ID, studentId, nickname, quizId: quiz.id, step,
    selected, lang, ts: serverTimestamp(),
  });
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

const data = await (await fetch("quizzes.json")).json();

for (const host of document.querySelectorAll(".quiz[data-step]")) {
  const step = Number(host.dataset.step);
  const group = data.steps.find((s) => s.step === step);
  if (!group) continue;
  host.append(el("h4", "quiz-title", T.title));

  for (const quiz of group.questions) {
    const box = el("div", "quiz-q");
    box.append(el("p", "quiz-text", quiz.q[lang]));
    const answered = safeGet("quiz-done-" + SESSION_ID + "-" + quiz.id);
    const buttons = quiz.options.map((o, i) => {
      const b = el("button", "quiz-opt", o[lang]);
      b.type = "button";
      b.addEventListener("click", () => choose(i));
      box.append(b);
      return b;
    });
    const fb = el("p", "quiz-feedback");
    box.append(fb);

    function reveal(i) {
      buttons.forEach((b, k) => {
        b.disabled = true;
        if (k === quiz.answer) b.classList.add("right");
        else if (k === i) b.classList.add("wrong");
      });
      fb.textContent = (i === quiz.answer ? T.ok : T.ko) + " " + quiz.explain[lang];
    }
    async function choose(i) {
      reveal(i);
      safeSet("quiz-done-" + SESSION_ID + "-" + quiz.id, String(i));
      const nickname = (safeGet("quiz-nick") || "").slice(0, 30);
      try { await send(quiz, step, i, nickname); fb.append(" · " + T.sent); }
      catch { fb.append(" · " + T.offline); }
    }
    if (answered !== null) reveal(Number(answered));
    host.append(box);
  }
}

// Optional nickname field, shown once at the top of the first quiz.
const first = document.querySelector(".quiz");
if (first) {
  const input = document.createElement("input");
  input.className = "quiz-nick"; input.maxLength = 30; input.placeholder = T.nick;
  input.value = safeGet("quiz-nick") || "";
  input.addEventListener("input", () => safeSet("quiz-nick", input.value));
  first.prepend(input);
}
