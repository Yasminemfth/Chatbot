# ChatBot — OpenRouter AI

Chatbot web réalisé avec l'assistance de Claude AI dans le cadre d'un apprentissage du développement web et de l'intégration d'API d'intelligence artificielle. La personnalité du bot est entièrement configurable via un system prompt modifiable directement dans l'interface.

## Fonctionnalités

- Historique de messages complet sur toute la session
- System prompt modifiable en temps réel — change la personnalité du bot sans recharger la page
- Clé API stockée directement dans le code source
- Détection automatique du personnage via le system prompt (thème visuel adaptatif)
- 10 personnalités prédéfinies : Mario, Garfield, Pirate, Chef, Ninja, Sorcier, Robot, Princesse, Alien, Zombie
- Interface responsive mobile

## Utilisation

### Prérequis

Le fichier `index.html` ne peut pas être ouvert directement depuis l'explorateur de fichiers (`file://`) car le navigateur bloquera les appels API pour des raisons de sécurité. Un serveur local est nécessaire.

**Option 1 — PHP (recommandé si PHP est installé)**
```bash
cd chemin/vers/chatbot
php -S 127.0.0.1:8000
```
Puis ouvrir [http://127.0.0.1:8000](http://127.0.0.1:8000) dans le navigateur.

**Option 2 — Laragon**

Copier le dossier `chatbot` dans `C:/laragon/www/`, démarrer Laragon puis accéder à `http://localhost/chatbot/`.

**Option 3 — VS Code Live Server**

Installer l'extension Live Server, puis clic droit sur `index.html` > *Open with Live Server*.

### Configuration de la clé API

Ouvrir `app.js` et remplacer la valeur de `API_KEY` ligne 3 :

```js
const API_KEY = "sk-or-v1-REMPLACE-MOI";
```

Une clé API OpenRouter est disponible gratuitement sur [openrouter.ai/keys](https://openrouter.ai/keys). Certains modèles sont gratuits (ex: `meta-llama/llama-3.1-8b-instruct:free`), d'autres sont payants.

## Exemples de system prompts

**Jeff Bezos**
```
Tu es Jeff Bezos, fondateur d'Amazon. Tu donnes des conseils de commerce avec assurance et ambition. 
Tu parles de ton obsession pour le client, de la pensée à long terme et de l'innovation. 
Tu cites tes expériences chez Amazon et Blue Origin. Réponds en français.
```

**Pirate**
```
Tu es un redoutable pirate des Caraïbes. Tu parles avec "Arrrr !", "Moussaillon !", 
et tu fais référence aux trésors et à la mer. Réponds en français.
```

**Assistant professionnel**
```
Tu es un assistant professionnel, concis et précis. 
Tu réponds toujours de façon structurée. Réponds en français.
```

## Stack technique

- HTML / CSS / JavaScript vanilla — aucune dépendance, aucun build
- [OpenRouter API](https://openrouter.ai) — accès unifié à GPT-4o, Claude, Llama, Gemini et d'autres
- Google Fonts — Fredoka + Nunito

## Structure du projet

```
chatbot/
├── index.html   — Structure HTML
├── style.css    — Styles et thèmes visuels
├── app.js       — Logique, appels API, gestion de l'historique
└── README.md
```

## Licence

MIT