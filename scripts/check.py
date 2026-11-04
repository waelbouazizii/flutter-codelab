"""Consistency checker for docs/fr.html and docs/en.html.

Standard library only. Exits with a non-zero code if any check fails.
Usage: python scripts/check.py
"""

import html
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

DOCS = Path(__file__).resolve().parent.parent / "docs"
PAGES = {"fr": DOCS / "fr.html", "en": DOCS / "en.html"}

REQUIRED_PARTS = {
    "step-goal": "goal",
    "step-duration": "duration",
    "step-instructions": "numbered instructions",
    "step-result": "expected result",
    "step-stuck": "If stuck",
}

FRENCH_ACCENTS = set("àâäçéèêëîïôöùûüÿœæÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸŒÆ")

CODE_BLOCK_RE = re.compile(
    r"<pre\b[^>]*>\s*<code\b[^>]*>(.*?)</code>\s*</pre>", re.DOTALL | re.IGNORECASE
)
UNACCENTED_ETAPE_RE = re.compile(r"\b[Ee]tape\b|\bETAPE\b")

# Emoji and pictographs are not allowed in the pages: use Font Awesome icons.
EMOJI_RANGES = ((0x2600, 0x27BF), (0x1F000, 0x1FAFF), (0xFE0F, 0xFE0F))


def is_emoji(char):
    point = ord(char)
    return any(low <= point <= high for low, high in EMOJI_RANGES)


class Step:
    def __init__(self, step_id, pos):
        self.id = step_id
        self.pos = pos
        self.parts = set()
        self.title = ""


class PageParser(HTMLParser):
    """Collects step cards, their parts and titles, and the prerequisites card."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.steps = []
        self.prereq_pos = None
        self.section_stack = []  # one entry per open <section>: Step or None
        self.in_title = False

    @property
    def current_step(self):
        for entry in reversed(self.section_stack):
            if entry is not None:
                return entry
        return None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = (attrs.get("class") or "").split()
        elem_id = attrs.get("id")
        pos = self.getpos()

        if tag == "section":
            if elem_id == "prerequisites":
                if self.prereq_pos is None:
                    self.prereq_pos = pos
                self.section_stack.append(None)
            elif "step" in classes:
                step = Step(elem_id, pos)
                self.steps.append(step)
                self.section_stack.append(step)
            else:
                self.section_stack.append(None)
            return

        step = self.current_step
        if step is None:
            return
        for cls in classes:
            if cls in REQUIRED_PARTS:
                step.parts.add(cls)
        if tag in ("h2", "h3") and not step.title:
            self.in_title = True

    def handle_endtag(self, tag):
        if tag == "section" and self.section_stack:
            self.section_stack.pop()
        elif tag in ("h2", "h3"):
            self.in_title = False

    def handle_data(self, data):
        if self.in_title and self.current_step is not None:
            self.current_step.title += data


def comment_parts(code):
    """Yield the comment text found in a code block (//, #, /* */, <!-- -->)."""
    for match in re.finditer(r"/\*.*?\*/|<!--.*?-->", code, re.DOTALL):
        yield match.group(0)
    code = re.sub(r"/\*.*?\*/|<!--.*?-->", "", code, flags=re.DOTALL)
    for line in code.splitlines():
        # "//" not preceded by ":" so URLs such as https://... are not comments.
        slash = re.search(r"(?<!:)//", line)
        if slash:
            yield line[slash.start():]
            continue
        hash_ = re.search(r"(^|\s)#", line)
        if hash_:
            yield line[hash_.start():]


def main():
    # Windows consoles may not default to UTF-8; never crash on accented output.
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    failures = []
    notes = []
    parsed = {}
    code_blocks = {}

    for lang, path in PAGES.items():
        if not path.exists():
            failures.append(f"{path.name}: file not found")
            continue
        text = path.read_text(encoding="utf-8")
        parser = PageParser()
        parser.feed(text)
        parser.close()
        parsed[lang] = parser
        code_blocks[lang] = CODE_BLOCK_RE.findall(text)

        for line_no, line in enumerate(text.splitlines(), 1):
            for char in line:
                if is_emoji(char):
                    failures.append(
                        f"{path.name}: line {line_no}: emoji {char!r} (U+{ord(char):04X}); "
                        "use a Font Awesome icon instead"
                    )

    if len(parsed) < len(PAGES):
        report(failures, notes)
        return 1

    # Step count and ids (prerequisites card excluded).
    fr_ids = [s.id for s in parsed["fr"].steps]
    en_ids = [s.id for s in parsed["en"].steps]
    if len(fr_ids) != len(en_ids):
        failures.append(
            f"step count differs: fr.html has {len(fr_ids)}, en.html has {len(en_ids)}"
        )
    if fr_ids != en_ids:
        failures.append(f"step ids differ: fr.html {fr_ids} vs en.html {en_ids}")

    for lang, parser in parsed.items():
        name = PAGES[lang].name
        steps = parser.steps

        if not steps:
            notes.append(f"{name}: 0 steps (empty shell)")

        # Ids must be step-0, step-1, ... in order.
        expected = [f"step-{i}" for i in range(len(steps))]
        ids = [s.id for s in steps]
        if ids != expected:
            failures.append(f"{name}: step ids must be {expected} in order, found {ids}")

        # Prerequisites card, before step-0. Only enforced once the page has steps.
        if steps:
            if parser.prereq_pos is None:
                failures.append(f'{name}: missing <section id="prerequisites"> card')
            else:
                step0 = next((s for s in steps if s.id == "step-0"), None)
                if step0 is not None and parser.prereq_pos > step0.pos:
                    failures.append(f"{name}: prerequisites card must come before step-0")

        # Required parts in each step card.
        for step in steps:
            missing = [label for cls, label in REQUIRED_PARTS.items() if cls not in step.parts]
            if missing:
                failures.append(
                    f"{name}: {step.id} is missing: {', '.join(missing)}"
                    f" (expected classes: {', '.join(c for c in REQUIRED_PARTS if c not in step.parts)})"
                )

        # French step titles must use "Étape".
        if lang == "fr":
            for step in steps:
                if UNACCENTED_ETAPE_RE.search(step.title):
                    failures.append(
                        f'{name}: {step.id} title uses "Etape" without the accent: '
                        f"{step.title.strip()!r}"
                    )

        # No French accents in code comments.
        for index, raw in enumerate(code_blocks[lang], 1):
            code = html.unescape(raw)
            for comment in comment_parts(code):
                bad = sorted(set(comment) & FRENCH_ACCENTS)
                if bad:
                    failures.append(
                        f"{name}: code block #{index} has an accented character "
                        f"({''.join(bad)}) in a comment: {comment.strip()!r}"
                    )

    # Code blocks must be byte-identical between the two pages.
    fr_code, en_code = code_blocks["fr"], code_blocks["en"]
    if len(fr_code) != len(en_code):
        failures.append(
            f"code block count differs: fr.html has {len(fr_code)}, en.html has {len(en_code)}"
        )
    for index, (fr_block, en_block) in enumerate(zip(fr_code, en_code), 1):
        if fr_block != en_block:
            failures.append(f"code block #{index} differs between fr.html and en.html")

    report(failures, notes)
    return 1 if failures else 0


def report(failures, notes):
    for note in notes:
        print(f"NOTE: {note}")
    for failure in failures:
        print(f"FAIL: {failure}")
    if failures:
        print(f"\n{len(failures)} check(s) failed.")
    else:
        print("All checks passed.")


if __name__ == "__main__":
    sys.exit(main())
