# L’Archipel des mathématiques

## Essayer le parcours libre

Ouvrir **Archipel-Parcours-libre.html** dans un navigateur. Le fichier est autonome et interactif. Choisir **Parcours libre**, puis une classe, et cliquer sur une île. Les résultats du parcours libre restent en mémoire le temps de la visite.

Ouvrir **Mon cours** pour retrouver le fil 2026–2027 en 6e, 4e et 3e et le parcours national en 5e. Chaque chapitre propose une fiche, des exercices et deux sujets blancs originaux. Les corrigés des sujets blancs sont disponibles après la remise. Les réponses rédigées sont à comparer au corrigé, avec la démarche et les critères indiqués.

La carte ouvre les domaines de la classe. Les ateliers complètent les chapitres. Les rituels, la Course aux nombres et les ceintures sont accessibles sous **Entraînement**.

Références institutionnelles. [Programme de 6e](https://www.education.gouv.fr/bo/2025/Hebdo16/MENE2504620A), [programme de 5e](https://www.education.gouv.fr/bo/2026/Hebdo10/MENE2602912A) et [repères applicables en 4e et 3e](https://eduscol.education.gouv.fr/6910/reperes-annuels-de-progression-et-attendus-de-fin-d-annee-du-cp-la-troisieme).

## Tester un compte et la PWA

Double-cliquer sur **Lancer-Archipel.command** dans le Finder et laisser le Terminal ouvert. Le site s’ouvre à [localhost:8765](http://localhost:8765). Autre possibilité depuis ce dossier : `python3 server.py`.

Saisir un identifiant et un mot de passe d’au moins huit caractères. Utiliser « Créer mon compte » pour un nouveau compte, puis « Se connecter » pour le retrouver. Choisir une classe, puis répondre à une question. En se reconnectant avec les mêmes identifiants, le serveur retrouve la classe et la progression. Des comptes fictifs élève et prof sont également proposés à l’accueil.

La version serveur dispose d’un manifeste PWA, d’icônes et d’un service worker pour ses ressources publiques. Depuis Chrome, utiliser l’option d’installation lorsqu’elle est proposée. Les profils, sessions, activités, brouillons de chapitre et bilans sont enregistrés en SQLite sur le serveur local. La version déployée utilise Cloudflare D1. Le serveur doit rester actif pour utiliser un compte. Cette démo écoute seulement sur le Mac où elle tourne.

## Régénérer le fichier autonome

`python3 exporter_parcours_libre.py`

## XP et grades

Les XP et les grades sont calculés séparément pour chaque classe. Les leçons, les étoiles de jeu et les quiz alimentent la progression. Les quiz récompensent la première série terminée, les meilleurs scores et jusqu’à deux séries parfaites en autonomie par notion. Une notion est maîtrisée après deux séries différentes à 5/5 sans indice. Le profil montre les domaines et les notions disponibles.

Le titre Amiral dépend de la maîtrise de tout le programme de la classe. Il reste verrouillé jusqu’à ce que les quiz et activités évaluent l’ensemble des attendus. En mode connecté, les preuves de maîtrise sont reconstruites depuis l’historique SQLite, ce qui conserve les meilleurs scores après une nouvelle tentative.

La version de production est publiée par le workflow GitHub Actions « Publier L’Archipel des mathématiques ». Le workflow applique les migrations D1 avant de publier le Worker.
