# 🍄 ChatBot — OpenRouter AI

Un chatbot web configurable avec personnalité personnalisable via system prompt, alimenté par OpenRouter.

## ✨ Fonctionnalités

- 💬 **Historique de messages** complet dans la session
- 🎭 **System prompt modifiable** — change la personnalité du bot en temps réel
- 🔑 **Clé API saisie dans l'app** — aucune config serveur nécessaire
- 🤖 **Multi-modèles** — GPT-4o, Claude, Llama, Gemini...
- 🍄 **Thème Mario** par défaut (entièrement personnalisable)
- 📱 Responsive mobile

## 🚀 Utilisation

1. **Clone ou télécharge** ce repo
2. Ouvre `index.html` dans ton navigateur (aucun serveur requis)
3. Entre ta **clé API OpenRouter** ([obtenir une clé](https://openrouter.ai/keys))
4. Modifie le **System Prompt** pour changer la personnalité
5. Choisis un **modèle** et commence à chatter !

## 🎭 Exemples de System Prompts

**Mario :**
```
Tu es Mario, le célèbre plombier du Royaume Champignon ! Tu utilises "Mamma mia !", "Let's-a go !", "Wahoo !" et fais référence à Bowser et Peach.
```

**Pirate :**
```
Tu es un redoutable pirate des Caraïbes. Tu parles avec "Arrrr !", "Moussaillon !", et tu fais référence aux trésors et à la mer.
```

**Assistant sérieux :**
```
Tu es un assistant professionnel, concis et précis. Tu réponds toujours de façon structurée.
```

## 🛠 Stack technique

- HTML / CSS / JavaScript vanilla
- [OpenRouter API](https://openrouter.ai) pour l'IA
- Google Fonts (Press Start 2P + Nunito)
- Aucune dépendance npm

## 📁 Structure

```
chatbot/
└── index.html   # Toute l'app dans un seul fichier
└── README.md
```

## 📝 Licence

MIT
