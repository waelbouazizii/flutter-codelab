# Quiz questions (21) for Kahoot / end-of-session quiz

Exported from the removed in-page quizzes. 3 questions per step (steps 0-6). Correct answer marked with [x]. Each question is given in FR then EN; code inside backticks is identical in both.
Kahoot limits: question 120 characters, answer 75 characters, 4 answers max: a few long ones may need shortening.

## Step 0

### s0-q1
**FR** Dans quel dossier faut-il éviter d’extraire le SDK Flutter ?

- [ ] C:\Users\<name>\develop
- [x] C:\Program Files\flutter
- [ ] D:\dev\flutter
- [ ] C:\tools\flutter

*Explanation (FR):* Évitez C:\Program Files : ce dossier demande des droits administrateur. Choisissez aussi un chemin sans espaces ni caractères spéciaux.

**EN** Which folder should you avoid when extracting the Flutter SDK?

- [ ] C:\Users\<name>\develop
- [x] C:\Program Files\flutter
- [ ] D:\dev\flutter
- [ ] C:\tools\flutter

*Explanation (EN):* Avoid C:\Program Files: it needs administrator rights. Also pick a path without spaces or special characters.

### s0-q2
**FR** Vous venez de modifier la variable Path. Que faut-il faire avant de lancer `flutter` ?

- [ ] Rien : c’est appliqué immédiatement
- [x] Fermer puis rouvrir tous les terminaux et l’éditeur
- [ ] Réinstaller Android Studio
- [ ] Lancer `flutter upgrade`

*Explanation (FR):* Les programmes déjà ouverts gardent l’ancien Path. Il faut rouvrir les terminaux et l’éditeur pour que `flutter` soit reconnu.

**EN** You just edited the Path variable. What must you do before running `flutter`?

- [ ] Nothing: it applies immediately
- [x] Close and reopen all terminals and the editor
- [ ] Reinstall Android Studio
- [ ] Run `flutter upgrade`

*Explanation (EN):* Programs that are already open keep the old Path. Reopen terminals and the editor so `flutter` is recognized.

### s0-q3
**FR** Que faut-il voir dans `flutter doctor` pour ce labo ?

- [x] Des coches pour Flutter et pour la chaîne d’outils Android
- [ ] Des coches pour tout, y compris Xcode et Visual Studio
- [ ] Une coche pour Chrome uniquement
- [ ] Aucun avertissement du tout

*Explanation (FR):* Il faut des coches pour Flutter et pour les plateformes visées, ici Android. Les avertissements pour Chrome, Visual Studio ou Xcode peuvent être ignorés.

**EN** What do you need to see in `flutter doctor` for this lab?

- [x] Check marks for Flutter and the Android toolchain
- [ ] Check marks for everything, including Xcode and Visual Studio
- [ ] A check mark for Chrome only
- [ ] No warnings at all

*Explanation (EN):* You need check marks for Flutter and the platforms you target, here Android. Warnings about Chrome, Visual Studio or Xcode can be ignored.

## Step 1

### s1-q1
**FR** Quelle commande crée un nouveau projet Flutter ?

- [ ] `flutter new notes_app`
- [x] `flutter create notes_app`
- [ ] `dart init notes_app`
- [ ] `flutter start notes_app`

*Explanation (FR):* `flutter create` génère la structure du projet, avec l’application compteur par défaut.

**EN** Which command creates a new Flutter project?

- [ ] `flutter new notes_app`
- [x] `flutter create notes_app`
- [ ] `dart init notes_app`
- [ ] `flutter start notes_app`

*Explanation (EN):* `flutter create` generates the project structure with the default counter app.

### s1-q2
**FR** Que fait le hot reload ?

- [ ] Il réinstalle l’application depuis zéro
- [x] Il applique les changements de code à l’application en cours, sans la relancer
- [ ] Il construit un nouvel APK
- [ ] Il ferme et rouvre le terminal

*Explanation (FR):* Le hot reload injecte le code modifié dans l’application qui tourne : le résultat apparaît en un instant.

**EN** What does hot reload do?

- [ ] It reinstalls the app from scratch
- [x] It applies code changes to the running app without restarting it
- [ ] It builds a new APK
- [ ] It closes and reopens the terminal

*Explanation (EN):* Hot reload injects the changed code into the running app, so the result shows up almost instantly.

### s1-q3
**FR** Pendant `flutter run`, quelle touche du terminal déclenche un hot reload ?

- [x] `r`
- [ ] `R`
- [ ] `q`
- [ ] `c`

*Explanation (FR):* `r` = hot reload, `R` = hot restart (repart de zéro), `q` = quitter.

**EN** During `flutter run`, which terminal key triggers a hot reload?

- [x] `r`
- [ ] `R`
- [ ] `q`
- [ ] `c`

*Explanation (EN):* `r` = hot reload, `R` = hot restart (starts fresh), `q` = quit.

## Step 2

### s2-q1
**FR** Quel widget donne à un écran sa structure de base (barre d’application, corps, bouton flottant) ?

- [x] `Scaffold`
- [ ] `Container`
- [ ] `Column`
- [ ] `Text`

*Explanation (FR):* `Scaffold` fournit l’ossature d’un écran Material : `appBar`, `body`, `floatingActionButton`.

**EN** Which widget gives a screen its basic structure (app bar, body, floating button)?

- [x] `Scaffold`
- [ ] `Container`
- [ ] `Column`
- [ ] `Text`

*Explanation (EN):* `Scaffold` provides the skeleton of a Material screen: `appBar`, `body`, `floatingActionButton`.

### s2-q2
**FR** Quel widget construit les éléments d’une longue liste à la demande, à partir d’un index ?

- [ ] `Column`
- [x] `ListView.builder`
- [ ] `Row`
- [ ] `Stack`

*Explanation (FR):* `ListView.builder` ne construit que les éléments visibles grâce à `itemBuilder` et `itemCount`.

**EN** Which widget builds the items of a long list on demand, from an index?

- [ ] `Column`
- [x] `ListView.builder`
- [ ] `Row`
- [ ] `Stack`

*Explanation (EN):* `ListView.builder` only builds the visible items, using `itemBuilder` and `itemCount`.

### s2-q3
**FR** Pourquoi `NotesListScreen` est-il un `StatelessWidget` à l’étape 2 ?

- [ ] Parce qu’il utilise une base de données
- [x] Parce que les données sont écrites en dur et ne changent pas
- [ ] Parce que `ListView` l’exige
- [ ] Parce qu’il n’a pas de méthode `build`

*Explanation (FR):* Sans état qui évolue, un `StatelessWidget` suffit. Il deviendra `StatefulWidget` à l’étape 4, quand la liste viendra de SQLite.

**EN** Why is `NotesListScreen` a `StatelessWidget` in Step 2?

- [ ] Because it uses a database
- [x] Because the data is hard-coded and never changes
- [ ] Because `ListView` requires it
- [ ] Because it has no `build` method

*Explanation (EN):* With no changing state, a `StatelessWidget` is enough. It becomes a `StatefulWidget` in Step 4, when the list comes from SQLite.

## Step 3

### s3-q1
**FR** Que fait `onCreate` dans `openDatabase` ?

- [ ] Il s’exécute à chaque démarrage de l’application
- [x] Il s’exécute une seule fois, à la création du fichier de base, pour créer les tables
- [ ] Il supprime l’ancienne base
- [ ] Il se connecte à un serveur

*Explanation (FR):* `onCreate` n’est appelé que lorsque la base n’existe pas encore : c’est l’endroit pour `CREATE TABLE`.

**EN** What does `onCreate` do in `openDatabase`?

- [ ] It runs every time the app starts
- [x] It runs once, when the database file is created, to create the tables
- [ ] It deletes the old database
- [ ] It connects to a server

*Explanation (EN):* `onCreate` is only called when the database does not exist yet: that is where `CREATE TABLE` goes.

### s3-q2
**FR** Pourquoi `insert` retire-t-il la clé `id` de la map avant d’écrire ?

- [ ] Parce que SQLite interdit les colonnes nommées `id`
- [x] Pour laisser SQLite générer l’identifiant automatiquement
- [ ] Pour économiser de la place
- [ ] Parce que `id` est une chaîne de caractères

*Explanation (FR):* La colonne est déclarée `PRIMARY KEY AUTOINCREMENT` : SQLite choisit l’identifiant, et `insert` le renvoie.

**EN** Why does `insert` remove the `id` key from the map before writing?

- [ ] Because SQLite forbids columns named `id`
- [x] To let SQLite generate the id automatically
- [ ] To save space
- [ ] Because `id` is a string

*Explanation (EN):* The column is declared `PRIMARY KEY AUTOINCREMENT`: SQLite picks the id, and `insert` returns it.

### s3-q3
**FR** Comment un `DateTime` est-il stocké dans notre table ?

- [ ] Dans un type natif DateTime
- [x] Dans une colonne TEXT, sous forme de chaîne ISO 8601
- [ ] Dans une colonne BLOB
- [ ] Dans une colonne BOOLEAN

*Explanation (FR):* SQLite n’a pas de type date : `toIso8601String()` donne un texte, que `DateTime.parse` relit.

**EN** How is a `DateTime` stored in our table?

- [ ] In a native DateTime type
- [x] In a TEXT column, as an ISO 8601 string
- [ ] In a BLOB column
- [ ] In a BOOLEAN column

*Explanation (EN):* SQLite has no date type: `toIso8601String()` produces text, which `DateTime.parse` reads back.

## Step 4

### s4-q1
**FR** Pourquoi écrire `if (!mounted) return;` après un `await` ?

- [ ] Pour accélérer la base de données
- [x] Parce que l’écran a pu être retiré pendant l’attente, et `setState` provoquerait une erreur
- [ ] Pour fermer la base de données
- [ ] Pour recharger la liste

*Explanation (FR):* Après une attente asynchrone, le widget peut ne plus être dans l’arbre. `mounted` indique si l’on peut encore utiliser `setState` ou `context`.

**EN** Why write `if (!mounted) return;` after an `await`?

- [ ] To speed up the database
- [x] Because the screen may have been removed while waiting, and `setState` would then throw an error
- [ ] To close the database
- [ ] To reload the list

*Explanation (EN):* After an async wait the widget may no longer be in the tree. `mounted` tells you whether you can still use `setState` or `context`.

### s4-q2
**FR** Dans `_deleteNote`, pourquoi appeler `_loadNotes()` après la suppression en base ?

- [ ] Pour fermer la base de données
- [x] Pour relire la table et retirer la note supprimée de la liste affichée
- [ ] Pour recréer la table `notes`
- [ ] Pour changer l’`id` des autres notes

*Explanation (FR):* La liste affichée est une copie en mémoire. Sans rechargement, le `Dismissible` glissé resterait dans l’arbre et Flutter lèverait une erreur.

**EN** In `_deleteNote`, why call `_loadNotes()` after deleting from the database?

- [ ] To close the database
- [x] To re-read the table and remove the deleted note from the displayed list
- [ ] To recreate the `notes` table
- [ ] To change the `id` of the other notes

*Explanation (EN):* The displayed list is an in-memory copy. Without a reload, the swiped `Dismissible` would stay in the tree and Flutter would throw an error.

### s4-q3
**FR** De quoi chaque `Dismissible` a-t-il besoin pour fonctionner correctement ?

- [x] D’une `key` unique, par exemple `ValueKey(note.id)`
- [ ] D’un `Scaffold`
- [ ] D’un `TextEditingController`
- [ ] D’un `Navigator`

*Explanation (FR):* La clé permet à Flutter de savoir quel élément de la liste a été glissé, même quand la liste change.

**EN** What does each `Dismissible` need to work correctly?

- [x] A unique `key`, for example `ValueKey(note.id)`
- [ ] A `Scaffold`
- [ ] A `TextEditingController`
- [ ] A `Navigator`

*Explanation (EN):* The key lets Flutter know which list item was swiped, even when the list changes.

## Step 5

### s5-q1
**FR** Que fait `Navigator.pop(context, true)` ?

- [ ] Il ferme l’application
- [x] Il revient à l’écran précédent et renvoie `true` comme résultat du `Navigator.push` attendu
- [ ] Il ouvre un nouvel écran
- [ ] Il enregistre la note en base

*Explanation (FR):* L’écran de liste attend ce résultat avec `await Navigator.push`, et recharge les notes quand il vaut `true`.

**EN** What does `Navigator.pop(context, true)` do?

- [ ] It closes the app
- [x] It returns to the previous screen and gives `true` as the result of the awaited `Navigator.push`
- [ ] It opens a new screen
- [ ] It saves the note to the database

*Explanation (EN):* The list screen awaits that result with `await Navigator.push`, and reloads the notes when it is `true`.

### s5-q2
**FR** Que doit renvoyer le `validator` d’un `TextFormField` lorsque la saisie est valide ?

- [ ] `true`
- [x] `null`
- [ ] `'OK'`
- [ ] `0`

*Explanation (FR):* `null` signifie « pas d’erreur ». Toute chaîne renvoyée est affichée comme message d’erreur.

**EN** What must the `validator` of a `TextFormField` return when the input is valid?

- [ ] `true`
- [x] `null`
- [ ] `'OK'`
- [ ] `0`

*Explanation (EN):* `null` means “no error”. Any string returned is shown as the error message.

### s5-q3
**FR** Pourquoi appeler `dispose()` sur les `TextEditingController` ?

- [x] Pour libérer leurs ressources quand l’écran est détruit
- [ ] Pour vider la base de données
- [ ] Pour valider le formulaire
- [ ] Pour changer le thème

*Explanation (FR):* Un contrôleur non libéré continue d’occuper de la mémoire. On le libère dans `dispose()`.

**EN** Why call `dispose()` on the `TextEditingController`s?

- [x] To release their resources when the screen is destroyed
- [ ] To empty the database
- [ ] To validate the form
- [ ] To change the theme

*Explanation (EN):* A controller that is not released keeps using memory. Release it in `dispose()`.

## Step 6

### s6-q1
**FR** Quelles propriétés de `MaterialApp` activent un thème sombre qui suit le réglage du téléphone ?

- [x] `darkTheme` et `themeMode: ThemeMode.system`
- [ ] `theme` seulement
- [ ] `home` et `title`
- [ ] `debugShowCheckedModeBanner`

*Explanation (FR):* `darkTheme` définit le thème sombre, et `themeMode: ThemeMode.system` choisit selon le réglage du système.

**EN** Which `MaterialApp` properties enable a dark theme that follows the phone setting?

- [x] `darkTheme` and `themeMode: ThemeMode.system`
- [ ] `theme` only
- [ ] `home` and `title`
- [ ] `debugShowCheckedModeBanner`

*Explanation (EN):* `darkTheme` defines the dark theme, and `themeMode: ThemeMode.system` picks based on the system setting.

### s6-q2
**FR** Pour annuler la suppression d’une note (Undo), que faut-il faire ?

- [ ] Appeler `update` sur la note
- [x] Réinsérer la note en base, puis recharger la liste
- [ ] Appeler seulement `setState`
- [ ] Redémarrer l’application

*Explanation (FR):* La ligne a été supprimée de la table : il faut la réinsérer avec `insert`, puis recharger.

**EN** To undo a note deletion, what do you need to do?

- [ ] Call `update` on the note
- [x] Insert the note into the database again, then reload the list
- [ ] Call `setState` only
- [ ] Restart the app

*Explanation (EN):* The row was deleted from the table: you must insert it again with `insert`, then reload.

### s6-q3
**FR** Quel changement exige d’augmenter la `version` de la base et d’écrire un `onUpgrade` ?

- [ ] Changer la couleur d’un texte
- [x] Ajouter une colonne à la table `notes`
- [ ] Changer le titre de l’application
- [ ] Ajouter une `SnackBar`

*Explanation (FR):* `onCreate` ne s’exécute que pour une base neuve. Pour modifier le schéma d’une base existante, on augmente `version` et on écrit `onUpgrade` (par exemple `ALTER TABLE`).

**EN** Which change requires bumping the database `version` and writing an `onUpgrade`?

- [ ] Changing a text color
- [x] Adding a column to the `notes` table
- [ ] Changing the app title
- [ ] Adding a `SnackBar`

*Explanation (EN):* `onCreate` only runs for a new database. To change the schema of an existing one, bump `version` and write `onUpgrade` (for example `ALTER TABLE`).
