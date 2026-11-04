# flutter-conventions.md — knowledge file for the Flutter codelab Project

Language rule: prose is bilingual (🇫🇷 / 🇬🇧). **All code, identifiers, commands, file names and code comments are in English, in both versions.**
Règle de langue : texte bilingue. **Tout le code, les identifiants, commandes, noms de fichiers et commentaires de code sont en anglais, dans les deux versions.**

Verified 2026-11-01 against docs.flutter.dev and pub.dev. Re-verify before the session.

---

## 0. Prerequisites card (first card of the codelab, before Step 0)

🇫🇷 À télécharger et installer **avant la séance** (gros téléchargements : le Wi-Fi de la salle peut être lent).
🇬🇧 Download and install **before the session** (large downloads: the room's Wi-Fi may be slow).

| Tool / Outil | Why / Rôle | Notes |
|---|---|---|
| **Flutter SDK** (latest stable 3.47.x, Windows zip) | The framework / le framework | https://docs.flutter.dev/install/manual — extract to `C:\Users\<name>\develop` |
| **Git for Windows** | Prerequisite of the Flutter SDK / prérequis du SDK | https://git-scm.com/downloads/win |
| **Android Studio** (full version) | Provides the Android SDK, platform tools, licenses and the emulator / fournit le SDK Android, les outils, les licences et l'émulateur | https://developer.android.com/studio — at least 7.5 GB free disk, 10 GB recommended. **Used for the SDK, not as the editor.** |
| **Visual Studio Code** + the **Flutter** extension | The editor (the Flutter extension also installs the Dart extension) / l'éditeur | https://code.visualstudio.com |
| **Android phone + USB cable** (recommended) | Run the app without the emulator / lancer l'application sans émulateur | Enable Developer options + USB debugging (Step 0) |

Check before the session / À vérifier avant la séance:
- [ ] Disk space: at least 10 GB free / au moins 10 Go libres
- [ ] The Flutter zip is downloaded (do not extract inside `C:\Program Files` or any path with spaces) / le zip est téléchargé
- [ ] Android Studio opens and finished its first-run setup wizard / Android Studio s'ouvre et a terminé son assistant de premier lancement
- [ ] VS Code opens and the Flutter extension is installed / VS Code s'ouvre et l'extension Flutter est installée

Implementation rules for the page: this card has `id="prerequisites"`, appears first on both `fr.html` and `en.html`, is NOT a step card (not counted in the step checks), and contains the table above plus the checklist. Step 0 then only *verifies and configures* the installs (PATH, licenses, device).

---

## 1. Pinned versions

| Item | Value | Note |
|---|---|---|
| Flutter | 3.47.x stable (Dart 3.13) | Latest stable seen: 3.47.1 (Aug 19, 2026). The install page shows a 3.47.5 bundle and mentions a 3.47.8 security update. **Tell students: download the latest 3.47.x.** |
| sqflite | `^2.4.5` | Min Dart 3.12. Platforms: Android, iOS, macOS only. |
| path | latest (`flutter pub add path`) | |
| Android Studio | current stable, **full version** | Needed for Android SDK, platform-tools, cmdline-tools, emulator. |
| Git for Windows | latest | Prerequisite for the Flutter SDK. |

Use `flutter pub add sqflite path` (not hand-written versions) so pub resolves compatible versions.

---

## 2. Setup — Windows (Step 0)

🇫🇷 Les étudiants ont déjà reçu le lien de téléchargement du SDK. Cette étape vérifie l'installation.
🇬🇧 Students already have the SDK download link. This step verifies the installation.

1. Install **Git for Windows**.
2. Extract the SDK zip into `C:\Users\<name>\develop` → `C:\Users\<name>\develop\flutter`. **No spaces or special characters in the path. Not in `C:\Program Files`.**
3. Add to the **user** `Path`: `%USERPROFILE%\develop\flutter\bin` (Win + Pause → Advanced System Settings → Environment Variables → user `Path` → New). Move it to the top.
4. **Close and reopen all terminals and the IDE.**
5. Verify:

```bash
flutter --version
dart --version
flutter doctor
```

6. Install **Android Studio**; in SDK Manager install: Android SDK Platform, SDK Command-line Tools, Build-Tools, Platform-Tools, Android Emulator.
7. Accept licenses:

```bash
flutter doctor --android-licenses
```

8. Run target — choose ONE:
   - **Phone (recommended, fastest):** enable Developer options + USB debugging, plug in via USB, install the Google USB driver if Windows doesn't see it. `flutter devices` must list it.
   - **Emulator:** Android Studio → Device Manager → create a virtual device. Needs virtualization enabled (BIOS) — may be slow or unavailable on lab PCs.

**Success criterion / Critère de réussite:** `flutter doctor` shows ✓ for **Flutter** and **Android toolchain**. Warnings for Chrome, Visual Studio, or Xcode can be ignored.

### Troubleshooting table (Step 0)

| Symptom | Cause | Fix |
|---|---|---|
| `'flutter' is not recognized` | PATH not applied | Reopen terminal; check the path ends in `\flutter\bin`; check for typos. |
| `flutter.bat` missing in `bin` | Antivirus quarantine | Trust the SDK folder in the antivirus, extract again. |
| Android licenses not accepted | | `flutter doctor --android-licenses`, answer `y`. |
| `cmdline-tools component is missing` | Not installed | Android Studio → SDK Manager → SDK Tools → Android SDK Command-line Tools. |
| Phone not in `flutter devices` | USB debugging off / driver | Re-enable USB debugging, accept the RSA prompt on the phone, install USB driver, try another cable. |
| Emulator won't start | Virtualization off | Enable VT-x/AMD-V in BIOS or use a phone. |
| "Building with plugins requires symlink support" *(to verify on a lab PC)* | Windows needs Developer Mode for plugins | Settings → For developers → Developer Mode ON, then `flutter pub get`. |

---

## 3. Project structure

```
notes_app/
  lib/
    main.dart
    models/note.dart
    data/database_helper.dart
    screens/notes_list_screen.dart
    screens/add_edit_note_screen.dart
  pubspec.yaml
```

Create:

```bash
flutter create notes_app
cd notes_app
flutter pub add sqflite path
flutter run
```

---

## 4. Code templates (final state — each step builds toward this)

### Step 1 — `lib/main.dart` (default counter app)
Use the generated file. Goal: run it, press the button, change the title text, press `r` (hot reload) in the terminal.

### Step 2 — static list (hard-coded data)

`lib/main.dart`:

```dart
import 'package:flutter/material.dart';

void main() {  // Every Dart program starts here
  runApp(const NotesApp());  // Show NotesApp on screen
}

class NotesApp extends StatelessWidget {  // Root widget: nothing in it changes, so it is Stateless
  const NotesApp({super.key});

  @override
  Widget build(BuildContext context) {  // Describes the screen; Flutter calls it on every redraw
    return MaterialApp(  // Sets up Material Design, the theme and the first screen
      title: 'Notes',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),  // Builds a full color palette from one color
      ),
      home: const NotesListScreen(),  // The first screen shown
    );
  }
}

class NotesListScreen extends StatelessWidget {  // A screen with fixed content for now
  const NotesListScreen({super.key});

  @override
  Widget build(BuildContext context) {  // Describes the screen; Flutter calls it on every redraw
    final titles = ['Buy milk', 'Prepare Flutter session', 'Call Sami'];  // Hard-coded data, replaced by SQLite in Step 4

    return Scaffold(  // Page skeleton: app bar, body, floating button
      appBar: AppBar(title: const Text('My Notes')),  // Top bar with the title
      body: ListView.builder(  // Scrollable list that builds only the visible rows
        itemCount: titles.length,  // How many rows
        itemBuilder: (context, index) {  // Called once per row; index is the row number
          return Card(  // One card per row
            margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),  // Space around the card
            child: ListTile(  // Standard row: title and subtitle
              title: Text(titles[index]),  // Title of this row
              subtitle: const Text('Tap to open'),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(  // The round + button
        onPressed: () {},  // Does nothing yet
        child: const Icon(Icons.add),  // The + icon
      ),
    );
  }
}
```

### Step 3 — model and database

`lib/models/note.dart`:

```dart
class Note {
  final int? id;  // Null before insert: SQLite generates it
  final String title;
  final String content;
  final DateTime createdAt;

  const Note({  // Constructor with named parameters
    this.id,
    required this.title,
    required this.content,
    required this.createdAt,
  });

  // Convert a Note to a Map for SQLite.
  Map<String, Object?> toMap() => {
        'id': id,
        'title': title,
        'content': content,
        'created_at': createdAt.toIso8601String(),  // DateTime is stored as ISO 8601 text
      };

  // Build a Note from a SQLite row.
  factory Note.fromMap(Map<String, Object?> map) => Note(
        id: map['id'] as int?,  // Cast each raw value to its real type
        title: map['title'] as String,
        content: map['content'] as String,
        createdAt: DateTime.parse(map['created_at'] as String),  // Text back to a DateTime
      );
}
```

`lib/data/database_helper.dart`:

```dart
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

import '../models/note.dart';

class DatabaseHelper {
  DatabaseHelper._();  // Private constructor: nobody else can create one
  static final DatabaseHelper instance = DatabaseHelper._();  // The single shared instance (singleton)

  static Database? _db;  // The open connection, kept after the first use

  Future<Database> get database async => _db ??= await _open();  // Open the database only the first time

  Future<Database> _open() async {
    final path = join(await getDatabasesPath(), 'notes.db');  // Where the file lives on the device
    return openDatabase(  // Opens the file, creates it if missing
      path,
      version: 1,  // Schema version: raise it when the schema changes
      onCreate: (db, version) async {  // Runs only when the file is first created
        // Create the notes table (SQL)
        await db.execute('''
          CREATE TABLE notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TEXT NOT NULL
          )
        ''');
      },
    );
  }

  Future<int> insert(Note note) async {  // Add a note, returns the new id
    final db = await database;  // Get the open database
    final values = note.toMap()..remove('id'); // let SQLite generate the id
    return db.insert('notes', values);  // INSERT INTO notes
  }

  Future<List<Note>> getAll() async {  // Read all the notes
    final db = await database;  // Get the open database
    final rows = await db.query('notes', orderBy: 'created_at DESC');  // SELECT, newest first
    return rows.map(Note.fromMap).toList();  // Turn each row (Map) into a Note
  }

  Future<int> update(Note note) async {  // Change an existing note
    final db = await database;  // Get the open database
    return db.update(
      'notes',
      note.toMap(),
      where: 'id = ?',  // Only the row with this id
      whereArgs: [note.id],  // Replaces the ? safely (no SQL injection)
    );
  }

  Future<int> delete(int id) async {  // Remove a note by id
    final db = await database;  // Get the open database
    return db.delete('notes', where: 'id = ?', whereArgs: [id]);  // DELETE FROM notes WHERE id = ?
  }
}
```

Quick test (temporary, in `main()`):

```dart
void main() async {  // async because we await the database below
  WidgetsFlutterBinding.ensureInitialized();  // Required before using a plugin ahead of runApp
  final id = await DatabaseHelper.instance.insert(  // Temporary test: insert one note
    Note(title: 'Test', content: 'Hello', createdAt: DateTime.now()),
  );
  debugPrint('Inserted note with id $id');  // Printed in the console
  runApp(const NotesApp());  // Show NotesApp on screen
}
```

(Remove the test after checking the console. Add the imports for `Note` and `DatabaseHelper`.)

### Step 4 — list from SQLite with delete

`lib/screens/notes_list_screen.dart`:

```dart
import 'package:flutter/material.dart';

import '../data/database_helper.dart';
import '../models/note.dart';
import 'add_edit_note_screen.dart';

class NotesListScreen extends StatefulWidget {  // Stateful: the list of notes changes over time
  const NotesListScreen({super.key});

  @override
  State<NotesListScreen> createState() => _NotesListScreenState();  // Creates the object that holds the data
}

class _NotesListScreenState extends State<NotesListScreen> {  // The data and the logic live here
  List<Note> _notes = [];  // The notes currently shown
  bool _loading = true;  // True until the first load ends

  @override
  void initState() {  // Runs once when the screen opens
    super.initState();
    _loadNotes();  // Load the notes from SQLite
  }

  Future<void> _loadNotes() async {  // Read the database, then redraw
    final notes = await DatabaseHelper.instance.getAll();  // Wait for the rows
    if (!mounted) return;  // Stop if the screen was closed in the meantime
    setState(() {  // Tell Flutter to redraw with the new data
      _notes = notes;
      _loading = false;
    });
  }

  Future<void> _openEditor([Note? note]) async {  // Open the form: no note = add, a note = edit
    final changed = await Navigator.push<bool>(  // Open a new screen and wait for its result
      context,
      MaterialPageRoute(builder: (_) => AddEditNoteScreen(note: note)),  // The screen to open
    );
    if (changed == true) _loadNotes();  // The form saved something: reload the list
  }

  Future<void> _deleteNote(Note note) async {  // Delete from the database, then refresh
    await DatabaseHelper.instance.delete(note.id!);  // ! because id is never null once read from the DB
    await _loadNotes();
  }

  @override
  Widget build(BuildContext context) {  // Describes the screen; Flutter calls it on every redraw
    return Scaffold(  // Page skeleton: app bar, body, floating button
      appBar: AppBar(title: const Text('My Notes')),  // Top bar with the title
      body: _loading  // Show a spinner, the empty message or the list
          ? const Center(child: CircularProgressIndicator())  // Still loading
          : _notes.isEmpty  // Loaded, but is it empty?
              ? const Center(child: Text('No notes yet. Tap + to add one.'))  // Empty-state message
              : ListView.builder(
                  itemCount: _notes.length,
                  itemBuilder: (context, index) {  // Called once per row; index is the row number
                    final note = _notes[index];  // The note for this row
                    return Dismissible(  // Makes the row swipeable
                      key: ValueKey(note.id),  // Unique key so Flutter tracks each row
                      direction: DismissDirection.endToStart,  // Swipe from right to left only
                      background: Container(  // Red area shown while swiping
                        color: Colors.red,
                        alignment: Alignment.centerRight,
                        padding: const EdgeInsets.only(right: 20),
                        child: const Icon(Icons.delete, color: Colors.white),
                      ),
                      onDismissed: (_) => _deleteNote(note),  // After the swipe: delete the note
                      child: Card(
                        margin: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 6,
                        ),
                        child: ListTile(  // Standard row: title and subtitle
                          title: Text(note.title),
                          subtitle: Text(
                            note.content,
                            maxLines: 2,  // At most 2 lines
                            overflow: TextOverflow.ellipsis,  // Add ... when the text is too long
                          ),
                          onTap: () => _openEditor(note),  // Tap a row to edit it
                        ),
                      ),
                    );
                  },
                ),
      floatingActionButton: FloatingActionButton(  // The round + button
        onPressed: () => _openEditor(),  // The + button opens the form to add
        child: const Icon(Icons.add),  // The + icon
      ),
    );
  }
}
```

`lib/main.dart` (final):

```dart
import 'package:flutter/material.dart';

import 'screens/notes_list_screen.dart';

void main() {  // Every Dart program starts here
  runApp(const NotesApp());  // Show NotesApp on screen
}

class NotesApp extends StatelessWidget {  // Root widget: nothing in it changes, so it is Stateless
  const NotesApp({super.key});

  @override
  Widget build(BuildContext context) {  // Describes the screen; Flutter calls it on every redraw
    return MaterialApp(  // Sets up Material Design, the theme and the first screen
      title: 'Notes',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),  // Builds a full color palette from one color
      ),
      home: const NotesListScreen(),  // The first screen shown
    );
  }
}
```

### Step 5 — add / edit form

`lib/screens/add_edit_note_screen.dart`:

```dart
import 'package:flutter/material.dart';

import '../data/database_helper.dart';
import '../models/note.dart';

class AddEditNoteScreen extends StatefulWidget {
  final Note? note; // null = create, not null = edit

  const AddEditNoteScreen({super.key, this.note});

  @override
  State<AddEditNoteScreen> createState() => _AddEditNoteScreenState();
}

class _AddEditNoteScreenState extends State<AddEditNoteScreen> {
  final _formKey = GlobalKey<FormState>();  // Lets us validate the whole form at once
  late final TextEditingController _titleController;  // Reads and sets the Title field text
  late final TextEditingController _contentController;  // Reads and sets the Content field text

  bool get _isEditing => widget.note != null;  // True when editing an existing note

  @override
  void initState() {  // Runs once when the screen opens
    super.initState();
    _titleController = TextEditingController(text: widget.note?.title ?? '');  // Start with the note title, or empty
    _contentController =  // Same for the content
        TextEditingController(text: widget.note?.content ?? '');
  }

  @override
  void dispose() {  // Runs when the screen is closed
    _titleController.dispose();  // Free the controller
    _contentController.dispose();  // Free the controller
    super.dispose();
  }

  Future<void> _save() async {  // Called by the Save button
    if (!_formKey.currentState!.validate()) return;  // Stop if a field is invalid

    final note = Note(  // Build the note from the form
      id: widget.note?.id,  // Keep the id when editing
      title: _titleController.text.trim(),  // What was typed, without extra spaces
      content: _contentController.text.trim(),
      createdAt: widget.note?.createdAt ?? DateTime.now(),  // Keep the original date when editing
    );

    if (_isEditing) {  // Editing: UPDATE. Otherwise: INSERT
      await DatabaseHelper.instance.update(note);
    } else {
      await DatabaseHelper.instance.insert(note);
    }

    if (!mounted) return;  // Stop if the screen was closed in the meantime
    Navigator.pop(context, true); // tell the list to refresh
  }

  @override
  Widget build(BuildContext context) {  // Describes the screen; Flutter calls it on every redraw
    return Scaffold(  // Page skeleton: app bar, body, floating button
      appBar: AppBar(title: Text(_isEditing ? 'Edit note' : 'New note')),  // Title depends on the mode
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(  // Groups the fields so they can be validated
          key: _formKey,  // Connects the form to its key
          child: Column(  // Fields stacked vertically
            children: [
              TextFormField(  // A text input
                controller: _titleController,  // Connect the field to its controller
                decoration: const InputDecoration(
                  labelText: 'Title',
                  border: OutlineInputBorder(),
                ),
                validator: (value) => (value == null || value.trim().isEmpty)  // Return an error message, or null if valid
                    ? 'Title is required'
                    : null,
              ),
              const SizedBox(height: 16),  // Vertical gap
              Expanded(  // Takes all the remaining height
                child: TextFormField(
                  controller: _contentController,  // Connect the field to its controller
                  decoration: const InputDecoration(
                    labelText: 'Content',
                    border: OutlineInputBorder(),
                    alignLabelWithHint: true,
                  ),
                  maxLines: null,  // Any number of lines
                  expands: true,  // Fill the available space
                  textAlignVertical: TextAlignVertical.top,
                  validator: (value) =>  // Return an error message, or null if valid
                      (value == null || value.trim().isEmpty)
                          ? 'Content is required'
                          : null,
                ),
              ),
              const SizedBox(height: 16),  // Vertical gap
              SizedBox(
                width: double.infinity,  // Full width
                child: FilledButton(  // The Save button
                  onPressed: _save,  // Run _save when tapped
                  child: const Text('Save'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### Step 6 — finishing touches
- Dark theme: add `darkTheme: ThemeData(colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo, brightness: Brightness.dark))` and `themeMode: ThemeMode.system` to `MaterialApp`.
- Snackbar after delete with an Undo action (re-insert the note).
- Date in the subtitle.

---

## 5. Checkpoints (Git tags in the reference repo `flutter-notes-solution`)

| Tag | State |
|---|---|
| *(none for step 0)* | setup only, no code, so no checkpoint |
| `step-1` | counter app, edited title |
| `step-2` | static list |
| `step-3` | model + DatabaseHelper + test insert |
| `step-4` | list from SQLite + delete |
| `step-5` | add/edit form |
| `step-6` | final app (theme, undo) |

Checkpoint links: students can download `https://github.com/<user>/flutter-notes-solution/archive/refs/tags/step-N.zip`. Replace `<user>` once the repo exists.

---

## 6. Bonus challenges (take-home / fast students)

1. Search bar filtering notes by title (use `db.query` with `where: 'title LIKE ?'`).
2. Favorite flag → requires schema change: bump `version` to 2 and add `onUpgrade` with `ALTER TABLE notes ADD COLUMN favorite INTEGER NOT NULL DEFAULT 0`.
3. Sort options (date, title).
4. Firebase: follow the official FlutterFire setup (separate session; needs Node and a Google account). Do NOT do it in the 3-hour session.

---

## 7. Common code errors

| Error | Cause | Fix |
|---|---|---|
| `MissingPluginException` for sqflite | Hot reload after adding a plugin | Stop and run `flutter run` again (full restart). |
| `LateInitializationError` / null `id` on delete | Note not reloaded from DB | Always read notes with `getAll()` before deleting; `id` is null only before insert. |
| `Don't use 'BuildContext's across async gaps` | `context` used after `await` | Check `if (!mounted) return;` before using `context`. |
| List does not refresh after save | Forgot the result from `Navigator.pop(context, true)` | Check `_openEditor` awaits the result. |
| `setState() called after dispose()` | Async call finished after leaving screen | Guard with `if (!mounted) return;`. |
| Phone: app installs but crashes on start | Old install conflicts | `flutter clean`, uninstall the app from the phone, `flutter run`. |

---

## 8. Style rules for the codelab pages

- Each step: Goal, Duration, numbered instructions, expected result, "If stuck", Bonus.
- French prose uses « » quotes and "Étape" with accent. English prose uses "Step". A checker script must verify both languages have the same number of steps and the same code blocks (code must be byte-identical between FR and EN pages).
- Never invent package versions. Use `flutter pub add`.
- Never put code comments in French.
