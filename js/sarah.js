// ===== SARAH AI ASSISTANT =====

let sarahConversation = [];

// Ouvrir le modal
function openSarahModal() {
  const modal = document.getElementById('sarah-modal');
  const bubble = document.getElementById('sarah-bubble');
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  bubble.classList.add('hidden');
  
  // Focus sur l'input après l'animation
  setTimeout(() => {
    document.getElementById('sarah-input').focus();
    scrollMessagesToBottom();
  }, 300);
}

// Fermer le modal
function closeSarahModal() {
  const modal = document.getElementById('sarah-modal');
  const bubble = document.getElementById('sarah-bubble');
  
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  bubble.classList.remove('hidden');
}

// Demande rapide
function askSarah(question) {
  document.getElementById('sarah-input').value = question;
  sendToSarah();
}

// Envoyer le message
async function sendToSarah() {
  const input = document.getElementById('sarah-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Afficher le message utilisateur
  addMessageToSarah(message, 'user');
  input.value = '';
  
  // Afficher l'indicateur de frappe
  showTypingIndicator();
  
  try {
    // Envoyer à n8n (à configurer plus tard)
    const response = await fetchToSarahAPI(message);
    addMessageToSarah(response, 'ai');
  } catch (error) {
    addMessageToSarah("Désolé, je rencontre un problème technique. Contactez-nous à contact@maxsolving.com", 'ai');
  }
  
  hideTypingIndicator();
}

// Fonction d'envoi à n8n (version temporaire)
async function fetchToSarahAPI(message) {
  // TEMPORAIRE : simulation jusqu'à ce que n8n soit configuré
  return simulateSarahResponse(message);
}

// Simulation de réponse (à remplacer par n8n)
function simulateSarahResponse(message) {
  const lower = message.toLowerCase();
  
  if (lower.includes('tarif') || lower.includes('prix') || lower.includes('combien')) {
    return `💰 **Nos tarifs 2026 :**
• Site vitrine : 499€ - 1 499€
• E-commerce : 899€ - 3 499€
• Application web : 1 999€+
• Abonnement tout-inclus : 79€/mois minimum

*Pour un devis précis, je vous recommande notre formulaire en ligne.*`;
  }
  
  if (lower.includes('délai') || lower.includes('temps')) {
    return `⏱️ **Délais de réalisation :**
• Site vitrine : 5-12 jours
• E-commerce : 15-25 jours
• Application sur-mesure : 1-2 mois
• Automation IA : 3-10 jours

Nous pouvons accélérer sur demande avec un supplément.`;
  }
  
  if (lower.includes('portfolio') || lower.includes('réalisations')) {
    return `📁 **Nos réalisations récentes :**
1. EFCVC - E-commerce climatisation industrielle (+300% CA)
2. VITA CAST - Site médical avec prise de RDV
3. WORKMAN - Boutique vêtements professionnels
4. ADENIUM - Corporate site services

Consultez notre section Portfolio pour tous les détails.`;
  }
  
  if (lower.includes('contact') || lower.includes('téléphone') || lower.includes('email')) {
    return `📞 **Contactez-nous :**
• Email : contact@maxsolving.com (réponse < 24h)
• WhatsApp : +216 26 067 067 (immédiat)
• Formulaire : Sur notre site
• Visioconférence : Sur rendez-vous

Nous sommes basés en Tunisie mais travaillons à l'international.`;
  }
  
  return `🤖 **Sarah (IA MaxSolving) :**
Je comprends votre question : "${message}"

Je suis actuellement en phase d'apprentissage. Pour une réponse précise, je vous recommande :
1. Consulter nos **services détaillés**
2. Utiliser notre **formulaire de devis**
3. Nous contacter directement par **WhatsApp**

En attendant, voici ce que je peux vous dire sur :
• Nos tarifs et formules
• Nos délais de réalisation
• Notre portfolio de projets
• Comment nous contacter

Quel sujet vous intéresse ?`;
}

// Ajouter un message à l'interface
function addMessageToSarah(text, sender) {
  const messagesDiv = document.getElementById('sarah-messages');
  const messageDiv = document.createElement('div');
  
  messageDiv.className = `flex gap-3 animate-fade-in ${sender === 'user' ? 'justify-end' : ''}`;
  
  if (sender === 'ai') {
    messageDiv.innerHTML = `
      <div class="flex-shrink-0">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 
                    flex items-center justify-center">
          <span class="text-xs text-primary font-bold">S</span>
        </div>
      </div>
      <div class="flex-1 max-w-[85%]">
        <div class="message-bubble-ai rounded-2xl rounded-tl-none p-4">
          <p class="text-white whitespace-pre-line">${formatSarahMessage(text)}</p>
        </div>
        <p class="text-xs text-gray-500 mt-1 ml-2">Sarah • Maintenant</p>
      </div>
    `;
  } else {
    messageDiv.innerHTML = `
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
      </div>
    `;
  }
  
  messagesDiv.appendChild(messageDiv);
  scrollMessagesToBottom();
  
  // Ajouter à l'historique
  sarahConversation.push({ sender, text, timestamp: new Date() });
}

// Formater les messages (gras, liens, etc.)
function formatSarahMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-primary underline">$1</a>')
    .replace(/\n/g, '<br>');
}

// Indicateur de frappe
function showTypingIndicator() {
  document.getElementById('sarah-typing').classList.remove('hidden');
  scrollMessagesToBottom();
}

function hideTypingIndicator() {
  document.getElementById('sarah-typing').classList.add('hidden');
}

// Scroll automatique
function scrollMessagesToBottom() {
  const messagesDiv = document.getElementById('sarah-messages');
  setTimeout(() => {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 100);
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ Sarah AI Assistant initialisée');
  
  // Message de bienvenue après 3 secondes
  setTimeout(() => {
    if (!document.getElementById('sarah-modal').classList.contains('flex')) {
      // Animation de la bulle
      const bubble = document.getElementById('sarah-bubble');
      bubble.classList.add('animate-bounce');
      setTimeout(() => bubble.classList.remove('animate-bounce'), 1000);
    }
  }, 3000);
});