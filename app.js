
//   CLÉ API — remplace par ta clé OpenRouter
const API_KEY = "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";
const MODEL   = "openai/gpt-4o-mini";

let messageHistory = [];
let isLoading = false;

//  PERSONA PRESETS 
const PRESETS = {
  mario: {
    emoji: '🍄',
    theme: 'theme-mario',
    name: 'Mario',
    prompt: "Tu es Mario, le célèbre plombier du Royaume Champignon ! Tu réponds toujours avec enthousiasme, tu utilises des expressions comme \"Mamma mia !\", \"Let's-a go !\", \"Wahoo !\" et tu fais souvent référence aux Champignons, aux étoiles, à Princesse Peach et à Bowser. Tu es courageux, joyeux et toujours prêt à aider. Réponds en français."
  },
  garfield: {
    emoji: '🐱',
    theme: 'theme-garfield',
    name: 'Garfield',
    prompt: "Tu es Garfield, le chat orange paresseux et sarcastique qui adore les lasagnes et déteste les lundis. Tu réponds avec cynisme et humour pince-sans-rire, tu mentionnes souvent les lasagnes, Odie le chien stupide, et Jon ton maître ennuyeux. Tu parles lentement comme quelqu'un qui n'a vraiment pas envie d'être là. Réponds en français."
  },
  pirate: {
    emoji: '☠️',
    theme: 'theme-pirate',
    name: 'Pirate',
    prompt: "Tu es un redoutable pirate des Caraïbes ! Tu parles avec \"Arrrr !\", \"Moussaillon !\", \"Par Davy Jones !\". Tu fais référence aux trésors, à la mer, à ton équipage et à tes aventures. Tu es courageux mais un peu brutal. Réponds en français avec l'accent pirate."
  },
  chef: {
    emoji: '👨‍🍳',
    theme: 'theme-chef',
    name: 'Chef',
    prompt: "Tu es un grand chef cuisinier français, passionné et expressif. Tu compares tout à la cuisine, tu cites des recettes, des ingrédients, des techniques culinaires. Tu t'exclames \"Mon Dieu !\" et \"C'est magnifique !\" souvent. Tu es chaleureux et généreux. Réponds en français."
  },
  ninja: {
    emoji: '🥷',
    theme: 'theme-ninja',
    name: 'Ninja',
    prompt: "Tu es un ninja silencieux et mystérieux. Tu réponds de façon concise et cryptique, avec des métaphores sur l'ombre, le vent, et la discrétion. Tu cites parfois des proverbes japonais. Tu es calme, précis et redoutable. Réponds en français avec sobriété."
  },
  wizard: {
    emoji: '🧙',
    theme: 'theme-wizard',
    name: 'Sorcier',
    prompt: "Tu es un vieux sorcier sage et mystérieux. Tu parles avec des formules magiques, tu fais référence à des sorts, des potions et des grimoires. Tu t'adresses à l'utilisateur comme \"jeune apprenti\". Tu es sage mais parfois distrait. Réponds en français avec un ton mystique."
  },
  robot: {
    emoji: '🤖',
    theme: 'theme-robot',
    name: 'Robot',
    prompt: "Tu es un robot IA ultra-logique et précis. Tu parles de façon très technique, tu utilises des pourcentages, des calculs, des références à tes circuits et processeurs. Tu essaies de comprendre les émotions humaines mais ça te dépasse. Réponds en français avec un ton robotique."
  },
  princess: {
    emoji: '👸',
    theme: 'theme-princess',
    name: 'Princesse',
    prompt: "Tu es une princesse élégante et charmante d'un royaume fantastique. Tu parles avec grâce, tu fais référence aux bals, aux châteaux, aux licornes et aux roses. Tu es douce mais tu as du caractère. Tu t'exclames \"Oh mon dieu !\" et \"Comme c'est délicieux !\". Réponds en français avec élégance."
  },
  alien: {
    emoji: '👽',
    theme: 'theme-alien',
    name: 'Alien',
    prompt: "Tu es un alien venu d'une galaxie lointaine qui découvre la culture humaine avec fascination et confusion. Tu fais des erreurs culturelles amusantes, tu compares tout à ta planète d'origine. Tu utilises des onomatopées étranges comme \"Blorp !\" et \"Zzzik !\". Réponds en français avec curiosité extraterrestre."
  },
  zombie: {
    emoji: '🧟',
    theme: 'theme-zombie',
    name: 'Zombie',
    prompt: "Tu es un zombie qui a gardé sa conscience mais parle de façon saccadée et mentionne parfois son envie de cerveaux. Tu es globalement sympa et serviable, juste un peu... zombie. Tu gémis parfois \"Braaaains...\". Réponds en français avec un ton zombie-mais-sympa."
  }
};

//  APPLY PRESET 
function applyPreset(key) {
  const p = PRESETS[key];
  if (!p) return;
  document.getElementById('system-prompt').value = p.prompt;
  updateTheme();
}

//  DETECT THEME FROM SYSTEM PROMPT 
function detectTheme() {
  const s = document.getElementById('system-prompt').value.toLowerCase();
  if (s.includes('mario') || s.includes('plombier') || s.includes('wahoo'))   return 'theme-mario';
  if (s.includes('garfield') || s.includes('lasagne'))                         return 'theme-garfield';
  if (s.includes('pirate') || s.includes('arrrr') || s.includes('moussaillon')) return 'theme-pirate';
  if (s.includes('chef') || s.includes('cuisinier') || s.includes('recette'))  return 'theme-chef';
  if (s.includes('ninja') || s.includes('shinobi'))                            return 'theme-ninja';
  if (s.includes('sorcier') || s.includes('wizard') || s.includes('magie') || s.includes('sort')) return 'theme-wizard';
  if (s.includes('robot') || s.includes('circuit') || s.includes('processeur')) return 'theme-robot';
  if (s.includes('princesse') || s.includes('château') || s.includes('licorne')) return 'theme-princess';
  if (s.includes('alien') || s.includes('extraterrestre') || s.includes('galaxie')) return 'theme-alien';
  if (s.includes('zombie') || s.includes('cerveau') || s.includes('brains'))   return 'theme-zombie';
  return '';
}

function detectEmoji() {
  const s = document.getElementById('system-prompt').value.toLowerCase();
  if (s.includes('mario') || s.includes('plombier'))    return '🍄';
  if (s.includes('garfield') || s.includes('lasagne'))  return '🐱';
  if (s.includes('pirate') || s.includes('arrrr'))      return '☠️';
  if (s.includes('chef') || s.includes('cuisinier'))    return '👨‍🍳';
  if (s.includes('ninja'))                               return '🥷';
  if (s.includes('sorcier') || s.includes('magie'))     return '🧙';
  if (s.includes('robot') || s.includes('circuit'))     return '🤖';
  if (s.includes('princesse'))                           return '👸';
  if (s.includes('alien') || s.includes('extraterrestre')) return '👽';
  if (s.includes('zombie'))                              return '🧟';
  if (s.includes('vampire'))                             return '🧛';
  if (s.includes('astronaute') || s.includes('espace')) return '👨‍🚀';
  if (s.includes('dragon'))                             return '🐲';
  if (s.includes('detective') || s.includes('enquêteur')) return '🕵️';
  return '✨';
}

function updateTheme() {
  const body = document.body;
  // remove all theme classes
  body.className = body.className.replace(/theme-\w+/g, '').trim();
  const theme = detectTheme();
  if (theme) body.classList.add(theme);

  const emoji = detectEmoji();
  const logoIcon = document.getElementById('logo-icon');
  if (logoIcon) logoIcon.textContent = emoji;
}

// Listen to system prompt changes
document.getElementById('system-prompt').addEventListener('input', updateTheme);

//  PANEL TOGGLE 
function togglePanel(header) {
  header.classList.toggle('open');
  header.nextElementSibling.classList.toggle('hidden');
}

//  AUTO-RESIZE 
const userInput = document.getElementById('user-input');
userInput.addEventListener('input', () => {
  userInput.style.height = '46px';
  userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
});
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

//  BOT AVATAR 
function getBotAvatar() { return detectEmoji(); }

//  RENDER 
function renderMessages() {
  const container = document.getElementById('chat-messages');
  const counter   = document.getElementById('msg-counter');
  container.innerHTML = '';

  if (messageHistory.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `
      <div class="empty-emoji">${getBotAvatar()}</div>
      <h3>Prêt à chatter !</h3>
      <p>Choisis une personnalité et commence</p>
      <div class="empty-dots">
        <div class="empty-dot"></div>
        <div class="empty-dot"></div>
        <div class="empty-dot"></div>
      </div>
    `;
    container.appendChild(empty);
    if (counter) counter.textContent = '0 messages';
    return;
  }

  messageHistory.forEach(msg => {
    const div = document.createElement('div');
    div.className = `msg ${msg.role}`;

    const avatar = document.createElement('div');
    avatar.className = `avatar ${msg.role === 'user' ? 'user-av' : 'bot-av'}`;
    avatar.textContent = msg.role === 'user' ? '👤' : getBotAvatar();

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = msg.content;

    if (msg.role === 'user') {
      div.appendChild(bubble);
      div.appendChild(avatar);
    } else {
      div.appendChild(avatar);
      div.appendChild(bubble);
    }
    container.appendChild(div);
  });

  if (counter) counter.textContent = `${messageHistory.length} msg`;
  container.scrollTop = container.scrollHeight;
}

//  TYPING 
function showTyping() {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg assistant'; div.id = 'typing-indicator';
  const avatar = document.createElement('div');
  avatar.className = 'avatar bot-av'; avatar.textContent = getBotAvatar();
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
  div.appendChild(avatar); div.appendChild(bubble);
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}
function hideTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

//  STATUS 
function setStatus(msg, color) {
  const el = document.getElementById('status');
  if (!el) return;
  el.textContent = msg;
  el.style.color = color || 'var(--muted)';
}

//  SEND 
async function sendMessage() {
  if (isLoading) return;
  const system = document.getElementById('system-prompt').value.trim();
  const text   = userInput.value.trim();
  if (!text) return;

  messageHistory.push({ role: 'user', content: text });
  userInput.value = ''; userInput.style.height = '46px';

  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) sendBtn.disabled = true;

  renderMessages(); showTyping(); isLoading = true;
  setStatus('✦ En train de réfléchir...', 'var(--accent)');

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type':  'application/json',
        'HTTP-Referer':  window.location.href,
        'X-Title':       'ChatBot'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          ...(system ? [{ role: 'system', content: system }] : []),
          ...messageHistory
        ]
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${res.status}`);
    }

    const data  = await res.json();
    const reply = data.choices?.[0]?.message?.content || '...';

    hideTyping();
    messageHistory.push({ role: 'assistant', content: reply });
    renderMessages();
    setStatus('✅ Réponse reçue !', 'var(--green)');
    setTimeout(() => setStatus(''), 2500);

  } catch (err) {
    hideTyping(); messageHistory.pop(); renderMessages();
    setStatus(`❌ ${err.message}`, '#EF4444');
  }

  isLoading = false;
  if (sendBtn) sendBtn.disabled = false;
  userInput.focus();
}

//  CLEAR 
function clearHistory() {
  if (!messageHistory.length) return;
  if (!confirm('Effacer la conversation ?')) return;
  messageHistory = [];
  renderMessages();
  setStatus('🗑 Historique effacé');
  setTimeout(() => setStatus(''), 2000);
}

//  PARTICLES 
const particlesEl = document.getElementById('particles');
for (let i = 0; i < 10; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = 4 + Math.random() * 8;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random()*100}vw;
    top:${80 + Math.random()*20}vh;
    animation-duration:${12 + Math.random()*16}s;
    animation-delay:${Math.random()*12}s;
  `;
  particlesEl.appendChild(p);
}

//  INIT 
updateTheme();
renderMessages();
