# Flutter Codelab — Session plan / Plan de séance (3 h)

> Bilingual: every section has a 🇫🇷 and a 🇬🇧 version. Code, identifiers, commands and code comments are **always in English**.
> Bilingue : chaque section existe en 🇫🇷 et 🇬🇧. Le code, les identifiants, les commandes et les commentaires de code sont **toujours en anglais**.

**Project / Projet:** `notes_app` — a Notes app with local SQLite (sqflite) / une application de notes avec SQLite local (sqflite)
**Audience:** mixed level / niveau mixte
**Stack (pinned, verified 2026-11-01):** Flutter 3.47.x (Dart 3.13), `sqflite ^2.4.5`, `path ^1.9.0`
**Target:** Android phone (USB debugging) or Android emulator. sqflite does not support Windows desktop or web.
**Cible :** téléphone Android (débogage USB) ou émulateur Android. sqflite ne supporte ni Windows desktop ni le web.

---

## 1. Pre-session intro (10 min) / Intro avant la séance (10 min)

8 slides — see the slide deck / 8 diapositives — voir le diaporama.

---

## 1b. Prerequisites (sent before the session, first card of the codelab) / Prérequis

🇫🇷 Chaque étudiant installe **avant la séance** : le SDK Flutter, Git for Windows, Android Studio (pour le SDK Android) et VS Code avec l'extension Flutter. Idéalement, un téléphone Android et un câble USB. La carte « Prérequis » est la première de la page du codelab (hors étapes) ; l'étape 0 ne fait que vérifier et configurer.
🇬🇧 Each student installs **before the session**: the Flutter SDK, Git for Windows, Android Studio (for the Android SDK) and VS Code with the Flutter extension. Ideally an Android phone and a USB cable. The "Prerequisites" card is the first on the codelab page (not a step); Step 0 only verifies and configures.

Details and links: `flutter-conventions.md` section 0. / Détails et liens : `flutter-conventions.md` section 0.

---

## 2. Timeline / Déroulé

| Time | 🇫🇷 Étape | 🇬🇧 Step | Output |
|---|---|---|---|
| 0:00–0:30 | **Étape 0 — Installation** : PATH, `flutter doctor`, Android Studio, appareil/émulateur | **Step 0 — Setup**: PATH, `flutter doctor`, Android Studio, device/emulator | `flutter doctor` green for Flutter + Android |
| 0:30–0:45 | **Étape 1 — Premier lancement** : `flutter create`, `flutter run`, hot reload | **Step 1 — First run**: `flutter create`, `flutter run`, hot reload | Counter app running |
| 0:45–1:10 | **Étape 2 — Widgets & mise en page** : Scaffold, ListView, Card, ListTile (données en dur) | **Step 2 — Widgets & layout**: Scaffold, ListView, Card, ListTile (hard-coded data) | Static notes list |
| 1:10–1:20 | *Pause* | *Break* | |
| 1:20–1:40 | **Étape 3 — Modèle & base de données** : `Note`, `DatabaseHelper`, `onCreate` | **Step 3 — Model & database**: `Note`, `DatabaseHelper`, `onCreate` | DB created, tested with a print |
| 1:40–2:10 | **Étape 4 — Lire et supprimer** : afficher la liste depuis SQLite, glisser pour supprimer | **Step 4 — Read & delete**: list from SQLite, swipe to delete | List loads from the DB (use the Step 3 test insert to see data) |
| 2:10–2:40 | **Étape 5 — Formulaire & navigation** : écran d'ajout et d'édition, validation, `Navigator.push` | **Step 5 — Form & navigation**: add/edit screen, validation, `Navigator.push` | Add (and edit) works, notes persist after restart |
| 2:40–3:00 | **Étape 6 — Finitions & bilan** : thème, état vide, suite (Firebase) | **Step 6 — Polish & wrap-up**: theme, empty state, next steps (Firebase) | Final app + take-home challenges |

**Cut line / Si le temps manque :** drop Step 6 polish first, then edit-in-Step 5 (keep add only; edit is already in the Step 5 code, so tell students to skip tapping a note). / Couper d'abord les finitions de l'étape 6, puis l'édition de l'étape 5 (garder l'ajout seul).

---

## 2b. Quizzes + live dashboard / Quiz + tableau de bord en direct

🇫🇷 Trois questions à choix multiple à la fin de chaque étape (21 au total), avec un tableau de bord en direct pour l'instructeur (`dashboard.html`). Détails : `flutter-quiz-spec.md`. **Budget temps :** environ 3 minutes par étape, soit ~20 min sur 180 : c'est serré. Si vous êtes en retard, sautez le quiz de l'étape (le quiz ne fait pas partie du parcours de base ; la ligne de coupe ne change pas).
🇬🇧 Three multiple-choice questions at the end of every step (21 total), with a live instructor dashboard (`dashboard.html`). Details: `flutter-quiz-spec.md`. **Time budget:** about 3 minutes per step, ~20 min out of 180: tight. If you are behind, skip that step's quiz (quizzes are not part of the core path; the cut line is unchanged).

---

## 3. Mixed-level strategy / Stratégie niveaux mixtes

| 🇫🇷 | 🇬🇧 |
|---|---|
| **Parcours de base** (tout le monde) : étapes 0 à 5, ajout + suppression. | **Core path** (everyone): steps 0–5, add + delete. |
| **Checkpoints** : à la fin de chaque étape, un lien vers le code complet de l'étape (tag Git `step-1` … `step-6`). Un étudiant en retard repart du checkpoint. | **Checkpoints**: at the end of each step, a link to the full code for that step (Git tag `step-1` … `step-6`). A student who falls behind restarts from the checkpoint. |
| **Défis bonus** (rapides) : édition, recherche, tri, favoris, thème sombre, Firebase. | **Stretch challenges** (fast students): edit, search, sort, favorites, dark theme, Firebase. |
| **Primer Dart** optionnel de 10 min, hors du flux principal. | Optional 10-minute **Dart primer**, outside the main flow. |
| **Binômes** : un avancé + un débutant. | **Pairs**: one advanced + one beginner. |

---

## 4. Step cards format / Format des cartes d'étape

Each step in the codelab HTML has: / Chaque étape du codelab HTML contient :

1. 🎯 Goal / Objectif (FR / EN)
2. ⏱ Duration / Durée
3. Numbered instructions with code blocks / Instructions numérotées avec blocs de code
4. ✅ "You should see…" / « Vous devriez voir… »
5. 🛟 If stuck / En cas de blocage → checkpoint tag + common errors
6. 🚀 Bonus (optional)
7. ❓ Quiz — 3 questions (`<div class="quiz" data-step="N">`) / Quiz — 3 questions

A language toggle (FR / EN) switches all prose; code blocks never change. / Un sélecteur FR / EN change tout le texte ; les blocs de code ne changent jamais.

---

## 5. Out of scope / Hors périmètre

- Firebase **inside the notes app** (take-home only: link to the official FlutterFire setup). Firebase is used only for the quiz dashboard, on the web side. / Firebase **dans l'application de notes** (à la maison uniquement : lien vers la configuration FlutterFire officielle). Firebase sert uniquement au tableau de bord des quiz, côté web.
- State-management packages (Provider, Riverpod, Bloc) — `setState` only / aucun package de gestion d'état — `setState` uniquement
- iOS / macOS / web targets
