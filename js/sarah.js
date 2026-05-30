// ===== SARAH AI ASSISTANT — MaxSolving =====
// Gemini Flash + Mode Devis guidé + n8n SMTP + PDF

// ⚠️ CONFIG — Remplacez par vos valeurs
const SARAH_CONFIG = {
  geminiApiKey: 'AIzaSyD6hgy3LmItQdSp2jd-OnqyYJjDGRy2DOs',
  n8nWebhookUrl: 'VOTRE_WEBHOOK_N8N_ICI', // URL de votre webhook n8n existant
  agencyEmail: 'contact@maxsolving.com',
  systemPrompt: `Tu es Sarah, l'assistante IA de l'agence web MaxSolving. Tu es professionnelle, chaleureuse et concise.

AGENCE :
- MaxSolving : agence web basée en Tunisie, travaille en Tunisie, France et Belgique
- Fondateur : Amine Nouri, développeur web full-stack
- Contact : contact@maxsolving.com | WhatsApp : +216 26 067 067
- Site : https://maxsolving.com

SERVICES & TARIFS :
- Site vitrine : 499€ - 1 499€ (délai 5-12 jours)
- E-commerce : 899€ - 3 499€ (délai 15-25 jours)
- Application web (Next.js, React) : 1 999€+ (délai 1-2 mois)
- Automation IA / chatbots : 299€ - 999€ (délai 3-10 jours)
- Abonnement maintenance tout-inclus : 79€/mois
- Refonte de site : selon complexité

TECHNOLOGIES :
- WordPress, WooCommerce, Elementor, Divi, Yoast SEO
- HTML5, CSS3, JavaScript, Tailwind CSS, Bootstrap
- PHP, Next.js, React, Supabase
- Shopify, n8n, Automation, IA

PROJETS RÉALISÉS (20+) : EFCVC, Vita Cast, Actumoto, KI-Motors, Offipro, Technoplus, Workman, Andre BPO, Excel du Zéro, Nyx Maine Coon, Pension Chiens, Voyante Bruxelles, etc.

RÈGLES :
- Réponds TOUJOURS en français
- Sois concis (max 4-5 lignes par réponse)
- Si la question porte sur le web/SEO/WordPress/développement, réponds en expert
- Pour un devis, dis que Sarah peut en générer un automatiquement
- Ne mentionne jamais que tu es Gemini ou Google`
};

// État global
let sarahConversation = [];
let sarahMode = 'chat'; // 'chat' | 'devis'
let devisData = {};
let devisStep = 0;

// Questions guidées pour le devis
const DEVIS_STEPS = [
  { key: 'prenom', q: '👤 Pour commencer, quel est votre **prénom** ?' },
  { key: 'email', q: '📧 Quelle est votre **adresse email** pour recevoir le devis ?' },
  { key: 'type', q: '🎯 Quel type de projet vous intéresse ?\n\n**1.** Site vitrine\n**2.** E-commerce\n**3.** Application web\n**4.** Automation / Chatbot IA\n**5.** Refonte de site\n\n_(Tapez le numéro ou le nom)_' },
  { key: 'details', q: '📝 Décrivez brièvement votre projet en quelques mots (secteur, fonctionnalités souhaitées...) :' },
  { key: 'budget', q: '💰 Quel est votre budget approximatif ?\n\n**1.** Moins de 500€\n**2.** 500€ - 1 000€\n**3.** 1 000€ - 3 000€\n**4.** 3 000€ - 5 000€\n**5.** Plus de 5 000€' },
  { key: 'delai', q: '⏱️ Quel est votre délai souhaité ?\n\n**1.** Urgent (moins de 2 semaines)\n**2.** 1 mois\n**3.** 2 à 3 mois\n**4.** Pas de contrainte particulière' }
];

// Map des réponses numériques
const TYPE_MAP = { '1': 'Site vitrine', '2': 'E-commerce', '3': 'Application web', '4': 'Automation / Chatbot IA', '5': 'Refonte de site' };
const BUDGET_MAP = { '1': 'Moins de 500€', '2': '500€ - 1 000€', '3': '1 000€ - 3 000€', '4': '3 000€ - 5 000€', '5': 'Plus de 5 000€' };
const DELAI_MAP = { '1': 'Urgent (< 2 semaines)', '2': '1 mois', '3': '2 à 3 mois', '4': 'Pas de contrainte' };

// ====================== MODAL ======================

function openSarahModal() {
  const modal = document.getElementById('sarah-modal');
  const bubble = document.getElementById('sarah-bubble');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  bubble.classList.add('hidden');
  setTimeout(() => {
    document.getElementById('sarah-input').focus();
    scrollMessagesToBottom();
  }, 300);
}

function closeSarahModal() {
  const modal = document.getElementById('sarah-modal');
  const bubble = document.getElementById('sarah-bubble');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  bubble.classList.remove('hidden');
}

function askSarah(question) {
  document.getElementById('sarah-input').value = question;
  sendToSarah();
}

// ====================== ENVOI MESSAGE ======================

async function sendToSarah() {
  const input = document.getElementById('sarah-input');
  const message = input.value.trim();
  if (!message) return;

  addMessageToSarah(message, 'user');
  input.value = '';
  showTypingIndicator();

  try {
    let response;
    if (sarahMode === 'devis') {
      response = await handleDevisStep(message);
    } else {
      // Détection intention devis
      if (/devis|tarif|prix|combien|estim/i.test(message)) {
        const wantsDevis = await askGemini(message + '\n\nPropose à lütilisateur de lui générer un devis personnalisé automatiquement en tapant "devis".');
        response = wantsDevis;
      } else {
        response = await askGemini(message);
      }
    }
    hideTypingIndicator();
    addMessageToSarah(response, 'ai');
  } catch (err) {
    hideTypingIndicator();
    addMessageToSarah('Désolé, je rencontre un problème. Contactez-nous à **contact@maxsolving.com**', 'ai');
  }
}

// ====================== GEMINI FLASH ======================

async function askGemini(message) {
  if (SARAH_CONFIG.geminiApiKey === 'VOTRE_CLE_GEMINI_ICI') {
    return simulateSarahResponse(message);
  }

  // Construire l'historique pour le contexte
  const historyContents = sarahConversation.slice(-8).map(m => ({
    role: m.sender === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }]
  }));

  const body = {
    system_instruction: { parts: [{ text: SARAH_CONFIG.systemPrompt }] },
    contents: [
      ...historyContents,
      { role: 'user', parts: [{ text: message }] }
    ],
    generationConfig: { maxOutputTokens: 400, temperature: 0.7 }
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${SARAH_CONFIG.geminiApiKey}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
  );

  if (!res.ok) throw new Error('Gemini API error');
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Je suis temporairement indisponible.';
}

// ====================== MODE DEVIS GUIDÉ ======================

function startDevisMode() {
  sarahMode = 'devis';
  devisData = {};
  devisStep = 0;
  const intro = `📋 **Génération de devis personnalisé**\n\nJe vais vous poser quelques questions rapides (environ 1 minute) pour établir votre devis.\n\n${DEVIS_STEPS[0].q}`;
  addMessageToSarah(intro, 'ai');
}

async function handleDevisStep(answer) {
  const step = DEVIS_STEPS[devisStep];

  // Normaliser les réponses numériques
  let value = answer.trim();
  if (step.key === 'type') value = TYPE_MAP[value] || value;
  if (step.key === 'budget') value = BUDGET_MAP[value] || value;
  if (step.key === 'delai') value = DELAI_MAP[value] || value;

  // Validation email basique
  if (step.key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return '⚠️ Cette adresse email semble invalide. Pouvez-vous la vérifier ?';
  }

  devisData[step.key] = value;
  devisStep++;

  if (devisStep < DEVIS_STEPS.length) {
    return DEVIS_STEPS[devisStep].q;
  } else {
    // Toutes les réponses collectées → générer le devis
    return await generateAndSendDevis();
  }
}

// ====================== GÉNÉRATION DEVIS ======================

async function generateAndSendDevis() {
  sarahMode = 'chat';

  // Estimation prix & délai basée sur le type
  const estimates = {
    'Site vitrine':          { prix: '499€ - 1 499€',   delai: '5 - 12 jours' },
    'E-commerce':            { prix: '899€ - 3 499€',   delai: '15 - 25 jours' },
    'Application web':       { prix: '1 999€ - 5 000€', delai: '1 - 2 mois' },
    'Automation / Chatbot IA':{ prix: '299€ - 999€',    delai: '3 - 10 jours' },
    'Refonte de site':       { prix: '399€ - 1 999€',   delai: '7 - 20 jours' }
  };
  const est = estimates[devisData.type] || { prix: 'Sur devis', delai: 'À définir' };

  const devisHtml = buildDevisHTML(est);
  const devisRef = 'MS-' + Date.now().toString().slice(-6);

  // Injecter le devis dans le chat comme message spécial
  injectDevisCard(est, devisRef);

  // Envoyer à n8n → SMTP
  await sendToN8n(est, devisRef);

  return `✅ Votre devis **#${devisRef}** a été généré !\n\n📧 Un email de confirmation sera envoyé à **${devisData.email}**.\n\nNous vous contacterons dans les **24h** pour affiner ce devis ensemble.\n\n💬 Avez-vous d'autres questions ?`;
}

function buildDevisHTML(est) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:30px;border-radius:12px;">
      <h2 style="color:#00F0FF;margin-bottom:5px;">📋 Devis MaxSolving</h2>
      <p style="color:#aaa;margin-top:0;">Référence : MS-${Date.now().toString().slice(-6)}</p>
      <hr style="border-color:#ffffff20;margin:20px 0;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#aaa;">Nom</td><td style="padding:8px 0;color:#fff;">${devisData.prenom}</td></tr>
        <tr><td style="padding:8px 0;color:#aaa;">Email</td><td style="padding:8px 0;color:#fff;">${devisData.email}</td></tr>
        <tr><td style="padding:8px 0;color:#aaa;">Type de projet</td><td style="padding:8px 0;color:#fff;">${devisData.type}</td></tr>
        <tr><td style="padding:8px 0;color:#aaa;">Description</td><td style="padding:8px 0;color:#fff;">${devisData.details}</td></tr>
        <tr><td style="padding:8px 0;color:#aaa;">Budget client</td><td style="padding:8px 0;color:#fff;">${devisData.budget}</td></tr>
        <tr><td style="padding:8px 0;color:#aaa;">Délai souhaité</td><td style="padding:8px 0;color:#fff;">${devisData.delai}</td></tr>
        <tr style="border-top:1px solid #ffffff20;">
          <td style="padding:12px 0;color:#00F0FF;font-weight:bold;">💰 Estimation prix</td>
          <td style="padding:12px 0;color:#00F0FF;font-weight:bold;">${est.prix}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#00F0FF;font-weight:bold;">⏱️ Délai estimé</td>
          <td style="padding:8px 0;color:#00F0FF;font-weight:bold;">${est.delai}</td>
        </tr>
      </table>
      <hr style="border-color:#ffffff20;margin:20px 0;">
      <p style="color:#aaa;font-size:12px;">MaxSolving • contact@maxsolving.com • +216 26 067 067</p>
    </div>
  `;
}

function injectDevisCard(est, ref) {
  const messagesDiv = document.getElementById('sarah-messages');
  const card = document.createElement('div');
  card.className = 'flex gap-3 animate-fade-in';
  card.innerHTML = `
    <div class="flex-shrink-0">
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <span class="text-xs text-primary font-bold">S</span>
      </div>
    </div>
    <div class="flex-1 max-w-[90%]">
      <div class="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl rounded-tl-none p-4 space-y-2">
        <p class="text-primary font-bold text-sm">📋 Devis #${ref}</p>
        <div class="text-xs text-gray-300 space-y-1">
          <div class="flex justify-between"><span class="text-gray-500">Client</span><span>${devisData.prenom}</span></div>
          <div class="flex justify-between"><span class="text-gray-500">Projet</span><span>${devisData.type}</span></div>
          <div class="flex justify-between"><span class="text-gray-500">Budget</span><span>${devisData.budget}</span></div>
          <div class="flex justify-between"><span class="text-gray-500">Délai souhaité</span><span>${devisData.delai}</span></div>
          <hr class="border-white/10 my-2">
          <div class="flex justify-between text-primary font-bold"><span>💰 Estimation</span><span>${est.prix}</span></div>
          <div class="flex justify-between text-primary font-bold"><span>⏱️ Délai</span><span>${est.delai}</span></div>
        </div>
        <button onclick="downloadDevisPDF('${ref}')" 
          class="w-full mt-3 py-2 rounded-lg bg-primary/20 hover:bg-primary/40 text-primary text-xs font-bold transition-colors border border-primary/30">
          ⬇️ Télécharger le devis PDF
        </button>
      </div>
      <p class="text-xs text-gray-500 mt-1 ml-2">Sarah • Devis généré</p>
    </div>
  `;
  messagesDiv.appendChild(card);
  scrollMessagesToBottom();
}

// ====================== PDF DOWNLOAD ======================

function downloadDevisPDF(ref) {
  // Utilise jsPDF si disponible, sinon fenêtre d'impression
  if (typeof jspdf !== 'undefined' || typeof jsPDF !== 'undefined') {
    const { jsPDF } = window.jspdf || window;
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(20);
    doc.setTextColor(0, 240, 255);
    doc.text('Devis MaxSolving', 20, 25);
    doc.setFontSize(11);
    doc.setTextColor(150, 150, 150);
    doc.text(`Référence : ${ref}`, 20, 35);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    const lines = [
      ['Client', devisData.prenom],
      ['Email', devisData.email],
      ['Type de projet', devisData.type],
      ['Description', devisData.details],
      ['Budget client', devisData.budget],
      ['Délai souhaité', devisData.delai],
      ['', ''],
      ['Estimation prix', est?.prix || ''],
      ['Délai estimé', est?.delai || ''],
    ];
    let y = 55;
    lines.forEach(([k, v]) => {
      doc.setTextColor(150, 150, 150);
      doc.text(k + ' :', 20, y);
      doc.setTextColor(255, 255, 255);
      doc.text(String(v), 80, y);
      y += 10;
    });
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('MaxSolving • contact@maxsolving.com • +216 26 067 067', 20, 270);
    doc.save(`Devis-MaxSolving-${ref}.pdf`);
  } else {
    // Fallback : ouvrir dans une nouvelle fenêtre pour impression
    const win = window.open('', '_blank');
    win.document.write(buildDevisHTML({ prix: devisData._estPrix || '', delai: devisData._estDelai || '' }));
    win.document.close();
    win.print();
  }
}

// ====================== ENVOI N8N ======================

async function sendToN8n(est, ref) {
  if (SARAH_CONFIG.n8nWebhookUrl === 'VOTRE_WEBHOOK_N8N_ICI') {
    console.log('📋 [Sarah] Devis prêt (webhook n8n non configuré):', devisData);
    return;
  }

  const payload = {
    source: 'Sarah AI - MaxSolving',
    reference: ref,
    date: new Date().toLocaleString('fr-FR'),
    client: {
      prenom: devisData.prenom,
      email: devisData.email
    },
    projet: {
      type: devisData.type,
      description: devisData.details,
      budget: devisData.budget,
      delai: devisData.delai
    },
    estimation: {
      prix: est.prix,
      delai: est.delai
    },
    conversation: sarahConversation.slice(-20).map(m => `[${m.sender === 'user' ? 'Client' : 'Sarah'}] ${m.text}`).join('\n')
  };

  try {
    await fetch(SARAH_CONFIG.n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    console.warn('⚠️ n8n webhook non joignable:', e);
  }
}

// ====================== SIMULATION (sans clé Gemini) ======================

function simulateSarahResponse(message) {
  const lower = message.toLowerCase();
  if (lower === 'devis' || lower.includes('générer un devis')) {
    setTimeout(() => startDevisMode(), 100);
    return null; // startDevisMode ajoute son propre message
  }
  if (lower.includes('tarif') || lower.includes('prix') || lower.includes('combien')) {
    return `💰 **Nos tarifs 2026 :**\n• Site vitrine : 499€ - 1 499€\n• E-commerce : 899€ - 3 499€\n• Application web : 1 999€+\n• Automation IA : 299€ - 999€\n• Maintenance : 79€/mois\n\nTapez **"devis"** pour un devis personnalisé en 1 minute ! 🎯`;
  }
  if (lower.includes('délai') || lower.includes('temps')) {
    return `⏱️ **Délais de réalisation :**\n• Site vitrine : 5-12 jours\n• E-commerce : 15-25 jours\n• Application web : 1-2 mois\n• Automation IA : 3-10 jours`;
  }
  if (lower.includes('contact') || lower.includes('whatsapp') || lower.includes('email')) {
    return `📞 **Contactez-nous :**\n• Email : contact@maxsolving.com\n• WhatsApp : +216 26 067 067\n• Réponse en moins de 24h garantie`;
  }
  if (lower.includes('portfolio') || lower.includes('réalisation')) {
    return `📁 **20+ projets réalisés :**\nEFCVC, Vita Cast, Actumoto, KI-Motors, Offipro, Excel du Zéro, Workman, Andre BPO...\n\nConsultez la section **Portfolio** sur notre site ! 🚀`;
  }
  return `🤖 Je comprends votre question sur "${message}".\n\nJe peux vous aider sur :\n• Nos **tarifs** et formules\n• Nos **délais** de réalisation\n• Notre **portfolio** de projets\n• Générer un **devis** personnalisé\n\nOu tapez **"devis"** pour un devis en 1 minute ! ✨`;
}

// ====================== UI HELPERS ======================

function addMessageToSarah(text, sender) {
  if (text === null) return; // cas startDevisMode
  const messagesDiv = document.getElementById('sarah-messages');
  const div = document.createElement('div');
  div.className = `flex gap-3 animate-fade-in ${sender === 'user' ? 'justify-end' : ''}`;

  if (sender === 'ai') {
    div.innerHTML = `
      <div class="flex-shrink-0">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <span class="text-xs text-primary font-bold">S</span>
        </div>
      </div>
      <div class="flex-1 max-w-[85%]">
        <div class="message-bubble-ai rounded-2xl rounded-tl-none p-4">
          <p class="text-white whitespace-pre-line">${formatSarahMessage(text)}</p>
        </div>
        <p class="text-xs text-gray-500 mt-1 ml-2">Sarah • Maintenant</p>
      </div>`;
  } else {
    div.innerHTML = `
      <div class="flex-1 max-w-[85%]">
        <div class="message-bubble-user rounded-2xl rounded-tr-none p-4 ml-auto">
          <p class="text-white">${text}</p>
        </div>
        <p class="text-xs text-gray-500 mt-1 mr-2 text-right">Vous • Maintenant</p>
      </div>
      <div class="flex-shrink-0">
        <div class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
          <span class="text-xs text-gray-400 font-bold">👤</span>
        </div>
      </div>`;
  }

  messagesDiv.appendChild(div);
  scrollMessagesToBottom();
  sarahConversation.push({ sender, text, timestamp: new Date() });
}

function formatSarahMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-primary underline">$1</a>')
    .replace(/\n/g, '<br>');
}

function showTypingIndicator() {
  document.getElementById('sarah-typing').classList.remove('hidden');
  scrollMessagesToBottom();
}

function hideTypingIndicator() {
  document.getElementById('sarah-typing').classList.add('hidden');
}

function scrollMessagesToBottom() {
  const div = document.getElementById('sarah-messages');
  setTimeout(() => { div.scrollTop = div.scrollHeight; }, 100);
}

// ====================== INIT ======================

document.addEventListener('DOMContentLoaded', function () {
  console.log('✅ Sarah AI (Gemini + Devis) initialisée');

  // Bouton devis rapide dans les suggestions
  const suggestionsBar = document.querySelector('#sarah-modal .flex.flex-wrap.gap-2');
  if (suggestionsBar) {
    const btn = document.createElement('button');
    btn.onclick = () => { openSarahModal(); startDevisMode(); };
    btn.className = 'text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-yellow-500/20 text-gray-300 hover:text-yellow-400 transition-all';
    btn.innerHTML = '📋 Devis gratuit';
    suggestionsBar.appendChild(btn);
  }

  // Animation bulle après 3s
  setTimeout(() => {
    const modal = document.getElementById('sarah-modal');
    const bubble = document.getElementById('sarah-bubble');
    if (!modal.classList.contains('flex') && bubble) {
      bubble.classList.add('animate-bounce');
      setTimeout(() => bubble.classList.remove('animate-bounce'), 1000);
    }
  }, 3000);
});