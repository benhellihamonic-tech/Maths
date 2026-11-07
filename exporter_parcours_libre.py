"""Assemble la même interface en un fichier HTML pour le parcours libre."""
from base64 import b64encode
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT / "public"


def svg_url(filename):
    return "data:image/svg+xml;base64," + b64encode((PUBLIC / filename).read_bytes()).decode()


def main():
    content = "\n".join((PUBLIC / filename).read_text(encoding="utf-8")
                        for filename in ("curriculum.js", "assessment.js", "content.js", "progression.js", "pedagogie.js", "classroom.js",
                                         "chapter-tools.js", "chapters4.js", "chapters5.js", "chapters-bilans.js",
                                         "chapters3-algebre.js", "chapters.js"))
    syllabus=(PUBLIC / "curriculum.js").read_text(encoding="utf-8")
    ids=re.findall(r'^island\("[^"]+","[^"]+","([a-z0-9]+)"',syllabus,re.M)
    (ROOT / "curriculum_ids.json").write_text(json.dumps(ids, indent=2)+"\n",encoding="utf-8")
    content = "\n".join(line.removeprefix("export ") for line in content.splitlines() if not line.startswith("import "))
    app = "\n".join(line for line in (PUBLIC / "app.js").read_text(encoding="utf-8").splitlines() if not line.startswith("import "))
    app = app.replace("/icon.svg", svg_url("icon.svg"))
    css = (PUBLIC / "style.css").read_text(encoding="utf-8").replace("/atlas.svg", svg_url("atlas.svg"))
    html = f"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>L’Archipel des mathématiques</title>
<style>{css}</style>
</head>
<body>
<a class="skip" href="#content">Aller au contenu</a>
<div id="app"></div>
<script>
window.ARCHIPEL_APERCU = true;
{content}
{app}
</script>
</body>
</html>
"""
    (ROOT / "Archipel-Parcours-libre.html").write_text(html, encoding="utf-8")


if __name__ == "__main__":
    main()
