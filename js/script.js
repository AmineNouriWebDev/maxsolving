// === UTILITY: TOASTIFY NOTIFICATIONS ===
function showToast(message, type = 'info', duration = 5000) {
    let className = 'toastify-custom';
    
    switch(type) {
        case 'success':
            className = 'toastify-success';
            break;
        case 'error':
            className = 'toastify-error';
            break;
        case 'info':
            className = 'toastify-custom';
            break;
        case 'warning':
            className = 'toastify-custom';
            break;
    }
    
    Toastify({
        text: message,
        duration: duration,
        gravity: "top",
        position: "right",
        className: className,
        stopOnFocus: true,
        escapeMarkup: false
    }).showToast();
}

// === 1. ROUTER SYSTEM ===
function router(pageId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(sec => {
        sec.classList.remove('active');
    });

    // Show target section
    const target = document.getElementById(pageId) || document.getElementById('home');
    target.classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// === 2. MOBILE MENU ===
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    
    menu.classList.toggle('open');
    overlay.classList.toggle('active');
    
    // Empêcher le scroll du body quand le menu est ouvert
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

// === 3. MULTI-STEP FORM ===
function nextStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(s => s.classList.remove('active'));
    // Show current
    document.getElementById('step' + stepNumber).classList.add('active');

    // Update Progress Bar
    const bar = document.getElementById('progress-bar');
    const indicators = document.querySelectorAll('.step-indicator');

    if (stepNumber === 1) {
        bar.style.width = "33%";
        indicators[0].classList.add('bg-primary', 'text-black'); indicators[0].classList.remove('bg-gray-800', 'text-gray-400');
        indicators[1].classList.remove('bg-primary', 'text-black'); indicators[1].classList.add('bg-gray-800', 'text-gray-400');
        indicators[2].classList.remove('bg-primary', 'text-black'); indicators[2].classList.add('bg-gray-800', 'text-gray-400');
    } else if (stepNumber === 2) {
        bar.style.width = "66%";
        indicators[1].classList.add('bg-primary', 'text-black'); indicators[1].classList.remove('bg-gray-800', 'text-gray-400');
        indicators[2].classList.remove('bg-primary', 'text-black'); indicators[2].classList.add('bg-gray-800', 'text-gray-400');
    } else if (stepNumber === 3) {
        bar.style.width = "100%";
        indicators[1].classList.add('bg-primary', 'text-black');
        indicators[2].classList.add('bg-primary', 'text-black'); indicators[2].classList.remove('bg-gray-800', 'text-gray-400');
    }
}

// === 4. SWIPER JS INIT ===
document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 1.2,
                centeredSlides: true,
            }
        }
    });
});

// === 5. CONTACT FORM HANDLING ===
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi - À remplacer par un vrai envoi
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showToast('✅ Message envoyé avec succès ! Nous vous recontacterons dans les 24h.', 'success', 4000);
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// === 6. PORTFOLIO FILTERING ===
document.addEventListener('DOMContentLoaded', function() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active', 'border-primary', 'text-primary', 'hover:bg-primary', 'hover:text-black'));
            filterButtons.forEach(btn => btn.classList.add('border-gray-700', 'text-gray-400'));
            
            // Add active class to clicked button
            this.classList.add('active', 'border-primary', 'text-primary', 'hover:bg-primary', 'hover:text-black');
            this.classList.remove('border-gray-700', 'text-gray-400');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize projects with animation
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

// === 7. PROJECT MODAL ===
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Si le renderer est disponible, l'utiliser
    if (window.portfolioRenderer) {
        modalContent.innerHTML = window.portfolioRenderer.renderModalContent(projectId);
    } else {
        // Fallback aux données statiques
        const projects = {
            'efcvc': {
                title: 'EFCVC - Climatisation Industrielle',
                description: 'Site e-commerce complet pour un expert en réfrigération et froid industriel. Design technique et épuré avec une interface utilisateur optimisée pour la conversion.',
                technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'SEO Avancé'],
                features: ['Catalogue produits détaillé', 'Panier et paiement sécurisé', 'Formulaire de devis en ligne', 'Optimisation SEO complète'],
                link: 'https://efcvc.com',
                results: '+200% de trafic en 3 mois, conversion ×2.5'
            },
            'vita-cast': {
                title: 'VITA CAST - Clinique Médicale',
                description: 'Site vitrine moderne pour une clinique médicale avec présentation des services, équipe médicale et prise de rendez-vous en ligne.',
                technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'AOS Animations'],
                features: ['Présentation des services', 'Équipe médicale', 'Formulaire de rendez-vous', 'Blog médical'],
                link: 'https://vita-cast.com.tn',
                results: 'Réservations en ligne multipliées par 3'
            }
        };
        
        const project = projects[projectId] || {
            title: 'Projet en développement',
            description: 'Ce projet est actuellement en développement. Contactez-nous pour plus d\'informations.',
            technologies: ['Technologies en cours'],
            features: ['Fonctionnalités à venir'],
            link: '#',
            results: 'Bientôt disponible'
        };
        
        modalContent.innerHTML = `
            <div class="space-y-6">
                <h3 class="text-3xl font-bold text-white font-tech">${project.title}</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-xl font-bold text-primary mb-3">Description</h4>
                        <p class="text-gray-300">${project.description}</p>
                    </div>
                    
                    <div>
                        <h4 class="text-xl font-bold text-secondary mb-3">Résultats</h4>
                        <p class="text-gray-300">${project.results}</p>
                    </div>
                </div>
                
                <div>
                    <h4 class="text-xl font-bold text-white mb-3">Technologies utilisées</h4>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => 
                            `<span class="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">${tech}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div>
                    <h4 class="text-xl font-bold text-white mb-3">Fonctionnalités principales</h4>
                    <ul class="space-y-2">
                        ${project.features.map(feature => 
                            `<li class="flex items-center text-gray-300">
                                <span class="text-primary mr-2">✓</span> ${feature}
                            </li>`
                        ).join('')}
                    </ul>
                </div>
                
                ${project.link !== '#' ? `
                    <div class="pt-4 border-t border-white/10">
                        <a href="${project.link}" target="_blank" 
                        class="btn-neon bg-primary text-black px-8 py-3 rounded font-tech font-bold uppercase tracking-widest hover:bg-white transition-colors inline-block">
                            Visiter le site
                        </a>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// === 8. CHAT IA AVEC MEILLEURES FONCTIONNALITÉS ===
let chatHistory = [];

function openChatModal() {
  openSarahModal(); // Utilise maintenant Sarah
}

function closeChatModal() {
    const modal = document.getElementById('chat-modal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function insertQuickQuestion(question) {
    const input = document.getElementById('chat-input');
    input.value = question;
    input.focus();
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Désactiver le bouton pendant l'envoi
    const sendButton = document.getElementById('send-button');
    sendButton.disabled = true;
    sendButton.classList.add('opacity-50');
    
    // Afficher le message de l'utilisateur
    displayUserMessage(message);
    
    // Effacer l'input
    input.value = '';
    
    // Simuler un délai de réponse de l'IA
    setTimeout(() => {
        showTypingIndicator();
        
        // Simuler un temps de "réflexion" de l'IA
        setTimeout(() => {
            hideTypingIndicator();
            const response = getAIResponse(message);
            displayAIMessage(response);
            
            // Réactiver le bouton
            sendButton.disabled = false;
            sendButton.classList.remove('opacity-50');
        }, 1500 + Math.random() * 1000);
    }, 300);
}

function displayUserMessage(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user-message message-slide-in';
    
    // Formatage des URLs dans le message
    const formattedMessage = message.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" class="text-primary hover:underline">$1</a>'
    );
    
    messageDiv.innerHTML = `
        <div class="flex items-start gap-3 justify-end">
            <div class="text-right">
                <div class="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white p-4 rounded-2xl rounded-tr-none max-w-[85%] ml-auto">
                    <p>${formattedMessage}</p>
                </div>
                <p class="text-xs text-gray-500 mt-2 mr-1">Vous • Maintenant</p>
            </div>
            <div class="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-xs font-bold">👤</span>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    
    // Ajouter à l'historique
    chatHistory.push({ role: 'user', content: message });
}

function displayAIMessage(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ai-message message-slide-in';
    
    // Formatage du message avec mise en forme
    const formattedMessage = formatMessage(message);
    
    messageDiv.innerHTML = `
        <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-gradient-to-r from-primary to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-xs font-bold">MS</span>
            </div>
            <div>
                <div class="bg-gradient-to-r from-primary/20 to-blue-500/20 backdrop-blur-sm border border-primary/30 text-white p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                    ${formattedMessage}
                </div>
                <p class="text-xs text-gray-500 mt-2 ml-1">MaxSolving AI • Maintenant</p>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    
    // Ajouter à l'historique
    chatHistory.push({ role: 'assistant', content: message });
}

function formatMessage(text) {
    // Convertir les listes avec puces
    text = text.replace(/\n• /g, '<br>• ');
    text = text.replace(/\n\d+\. /g, '<br>$&');
    
    // Mettre en gras les titres
    text = text.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');
    
    // Ajouter des couleurs pour les prix
    text = text.replace(/(\d+€)/g, '<span class="text-green-400 font-bold">$1</span>');
    
    // Ajouter des emojis contextuels
    text = text.replace(/tarif(s)?|prix/gi, '💰 $&');
    text = text.replace(/délai(s)?|temps/gi, '⏱️ $&');
    text = text.replace(/service(s)?/gi, '🛠️ $&');
    text = text.replace(/portfolio|réalisation(s)?/gi, '📁 $&');
    text = text.replace(/contact/gi, '📞 $&');
    text = text.replace(/email/gi, '📧 $&');
    text = text.replace(/whatsapp/gi, '💬 $&');
    
    return `<div class="space-y-2">${text.replace(/\n/g, '<br>')}</div>`;
}

function showTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.classList.remove('hidden');
        scrollToBottom();
    }
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.classList.add('hidden');
    }
}

function scrollToBottom() {
    const messagesContainer = document.getElementById('chat-messages');
    if (messagesContainer) {
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }
}

function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Base de connaissances structurée
    const responses = {
        // Salutations
        'bonjour|salut|hello|hey': `Bonjour ! 👋 Je suis ravi de vous aider. MaxSolving est spécialisé dans le développement web et l'automatisation IA. Quelle question avez-vous ?`,
        
        // Tarifs
        'tarif|prix|combien|coût|budget': `💰 **Nos tarifs démarrent à :**
• Site vitrine : 399€ - 1 299€
• E-commerce : 799€ - 2 999€
• Application web : 1 499€ - 5 000€+
• Automation IA : 299€ - 999€/mois
• Abonnement tout-inclus : 69€ - 199€/mois

🎯 *Pour un devis précis, précisez votre projet ou utilisez notre formulaire en ligne.*`,
        
        // Délais
        'délai|temps|quand|rapide|urgence': `⏱️ **Délais moyens de réalisation :**
• Site vitrine : 5-10 jours ouvrables
• E-commerce : 10-20 jours ouvrables
• Application web : 1-3 mois
• Automation IA : 3-7 jours
• Refonte de site : 1-2 semaines

⚡ *Accélération possible avec supplément.*`,
        
        // Services
        'service|prestation|offre|que faites': `🛠️ **Nos services principaux :**
1. **Développement Web**
   - Sites WordPress sur-mesure
   - E-commerce (WooCommerce, Shopify)
   - Applications React/Next.js
   - Sites HTML/CSS/JS performants

2. **Automation & IA**
   - Chatbots WhatsApp/Email
   - Workflows n8n automatisés
   - Intégrations CRM/API
   - Notifications intelligentes

3. **SEO & Marketing**
   - Audit SEO complet
   - Optimisation technique
   - Stratégie de contenu
   - Analytics & reporting

4. **Hébergement & Maintenance**
   - Hébergement haute performance
   - Sauvegardes quotidiennes
   - Mises à jour de sécurité
   - Support technique 24/7`,
        
        // Technologies
        'technologie|wordpress|react|html|shopify|nextjs': `⚙️ **Stack technique :**
• **Frontend** : HTML5, CSS3, JavaScript, React, Next.js, Tailwind CSS
• **CMS** : WordPress, Shopify, Strapi
• **Backend** : Node.js, PHP, Python
• **Bases de données** : MySQL, PostgreSQL, MongoDB
• **Automation** : n8n, Make, Zapier
• **IA** : OpenAI, Google Gemini, chatbots

🔧 *Nous adaptons la technologie à votre projet.*`,
        
        // Portfolio
        'portfolio|projet|réalisation|exemple|travail': `📁 **Nos réalisations récentes :**
• EFCVC - E-commerce climatisation industrielle
• VITA CAST - Site médical avec prise de RDV
• WORKMAN - Boutique vêtements professionnels
• ADENIUM - Site corporate services
• +10 autres projets avec 98% satisfaction

🎯 *Visitez notre page Portfolio pour tous les détails.*`,
        
        // Contact
        'contact|joindre|appeler|téléphone|email|whatsapp': `📞 **Contactez-nous :**
• **Email** : contact@maxsolving.com (réponse < 24h)
• **WhatsApp** : +216 26 067 067 (réponse immédiate)
• **Chat** : Ici même avec moi 😊
• **Formulaire** : Sur notre site (plus complet)

🌍 *Basés en Tunisie, nous travaillons à l'international.*`,
        
        // Paiement
        'paiement|pay|mode|moyen|finance': `💳 **Modalités de paiement :**
• **Tunisie** : Virement bancaire, Flouci, D17
• **International** : Western Union, TransferWise
• **Crypto** : Bitcoin, USDT (sur demande)
• **Flexibilité** : Échéancier, paiement après validation

🔒 *Sécurisé et transparent.*`,
        
        // Par défaut
        'default': `Je comprends votre question sur "${message}". 

Pour vous donner la réponse la plus précise, je peux vous orienter vers :
1. Notre **page Services** pour les détails techniques
2. Notre **formulaire de devis** pour une estimation personnalisée
3. Notre **page Contact** pour discuter avec un humain

Ou bien, reformulez votre question sur :
• Nos tarifs et délais
• Nos services spécifiques
• Nos technologies
• Notre portfolio
• Comment nous contacter

Je suis là pour vous aider ! 🚀`
    };
    
    // Chercher une réponse correspondante
    for (const [pattern, response] of Object.entries(responses)) {
        if (pattern !== 'default') {
            const regex = new RegExp(pattern, 'i');
            if (regex.test(lowerMessage)) {
                return response;
            }
        }
    }
    
    return responses.default;
}

// === 9. GESTION UNIFIÉE DES DEVIS ===

// Stockage des données de pré-remplissage
window.devisPreset = {
    modele_service: null,
    types_projet: [],
    fonctionnalites: [],
    coordonnees: {}
};

let currentStep = 1;
const totalSteps = 5;

// Fonction pour démarrer un devis avec un modèle spécifique
function startDevisWithMode(modele) {
    window.devisPreset = {
        modele_service: modele,
        types_projet: [],
        fonctionnalites: [],
        coordonnees: {}
    };
    
    // Naviguer vers le formulaire de devis
    router('devis');
    
    // Pré-remplir automatiquement l'étape 5
    setTimeout(() => {
        if (window.devisPreset.modele_service) {
            const radio = document.querySelector(`input[name="modele_service"][value="${window.devisPreset.modele_service}"]`);
            if (radio) {
                radio.checked = true;
                // Mettre en évidence visuellement
                const labelId = modele === 'developpement_unique' ? 'label-developpement-unique' : 'label-abonnement-tout-inclus';
                const label = document.getElementById(labelId);
                if (label) {
                    label.style.borderColor = modele === 'developpement_unique' ? '#00F0FF' : '#8B5CF6';
                    label.style.background = modele === 'developpement_unique' ? 'rgba(0, 240, 255, 0.05)' : 'rgba(139, 92, 246, 0.05)';
                }
            }
        }
    }, 300);
}

// Fonction pour démarrer depuis le devis express
function startDevisFromExpress() {
    // Récupérer les données du devis express
    const nom = document.getElementById('express-nom')?.value;
    const email = document.getElementById('express-email')?.value;
    const modele = document.querySelector('input[name="express-modele"]:checked')?.value;
    
    // Récupérer les types de projet cochés
    const types = Array.from(document.querySelectorAll('input[data-express="type"]:checked'))
        .map(cb => cb.value);
    
    // Récupérer les fonctionnalités cochées
    const fonctions = Array.from(document.querySelectorAll('input[data-express="fonction"]:checked'))
        .map(cb => cb.value);
    
    // Stocker les données
    window.devisPreset = {
        modele_service: modele,
        types_projet: types,
        fonctionnalites: fonctions,
        coordonnees: { nom, email }
    };
    
    // Valider au moins un modèle sélectionné
    if (!modele) {
        showToast('❌ Veuillez sélectionner un modèle de service (Développement Unique ou Abonnement Tout-Inclus)', 'error', 4000);
        return;
    }
    
    // Naviguer vers le formulaire de devis
    router('devis');
    
    // Pré-remplir automatiquement après un délai
    setTimeout(() => {
        prefillDevisFromPreset();
    }, 400);
}

// Fonction pour pré-remplir le formulaire à partir des données présélectionnées
function prefillDevisFromPreset() {
    if (!window.devisPreset || Object.keys(window.devisPreset).length === 0) return;
    
    const preset = window.devisPreset;
    
    // 1. Pré-remplir les coordonnées (étape 1)
    if (preset.coordonnees.nom) {
        document.getElementById('nom').value = preset.coordonnees.nom;
    }
    if (preset.coordonnees.email) {
        document.getElementById('email').value = preset.coordonnees.email;
    }
    
    // 2. Pré-remplir les types de projet (étape 2)
    if (preset.types_projet.length > 0) {
        preset.types_projet.forEach(type => {
            const checkbox = document.querySelector(`input[name="type_projet"][value="${type}"]`);
            if (checkbox) {
                checkbox.checked = true;
                // Ajouter un effet visuel
                const label = checkbox.closest('label');
                if (label) {
                    label.style.borderColor = '#00F0FF';
                    label.style.background = 'rgba(0, 240, 255, 0.05)';
                }
            }
        });
    }
    
    // 3. Pré-remplir les fonctionnalités dans autres_besoins (étape 3)
    if (preset.fonctionnalites.length > 0) {
        const textarea = document.querySelector('textarea[name="autres_besoins"]');
        if (textarea) {
            const existingText = textarea.value;
            const newText = preset.fonctionnalites.map(f => `• ${getFonctionnaliteLabel(f)}`).join('\n');
            textarea.value = existingText ? `${existingText}\n${newText}` : newText;
        }
    }
    
    // 4. Pré-remplir le modèle de service (étape 5)
    if (preset.modele_service) {
        const radio = document.querySelector(`input[name="modele_service"][value="${preset.modele_service}"]`);
        if (radio) {
            radio.checked = true;
            // Mettre en évidence visuellement
            const labelId = preset.modele_service === 'developpement_unique' 
                ? 'label-developpement-unique' 
                : 'label-abonnement-tout-inclus';
            const label = document.getElementById(labelId);
            if (label) {
                label.style.borderColor = preset.modele_service === 'developpement_unique' ? '#00F0FF' : '#8B5CF6';
                label.style.background = preset.modele_service === 'developpement_unique' 
                    ? 'rgba(0, 240, 255, 0.1)' 
                    : 'rgba(139, 92, 246, 0.1)';
            }
        }
    }
    
    // Afficher un message informatif
    if (preset.coordonnees.nom || preset.modele_service) {
        showToast('ℹ️ Votre devis a été pré-rempli avec vos sélections précédentes.', 'info', 3000);
    }
}

// Fonction utilitaire pour obtenir le libellé d'une fonctionnalité
function getFonctionnaliteLabel(value) {
    const labels = {
        'formulaire_contact': 'Formulaire de contact',
        'paiement_online': 'Paiement en ligne',
        'chatbot_whatsapp': 'Chatbot WhatsApp',
        'reservation_rdv': 'Système de réservation/RDV',
        'formulaire_contact': 'Formulaire de contact',
        'paiement_en_ligne': 'Paiement en ligne',
        'chatbot_whatsapp': 'Chatbot WhatsApp'
    };
    return labels[value] || value;
}

// Validation des étapes
function validateStep1() {
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let isValid = true;
    
    // Validation nom
    if (!nom) {
        document.getElementById('error-nom').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('error-nom').classList.add('hidden');
    }
    
    // Validation email
    if (!email || !emailRegex.test(email)) {
        document.getElementById('error-email').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('error-email').classList.add('hidden');
    }
    
    if (isValid) {
        nextStep(2);
    }
    return isValid;
}

function validateStep2() {
    const checkboxes = document.querySelectorAll('input[name="type_projet"]:checked');
    if (checkboxes.length === 0) {
        showToast('❌ Veuillez sélectionner au moins un type de projet', 'error', 4000);
        return false;
    }
    nextStep(3);
    return true;
}

function validateStep3() {
    // Pas de validation stricte pour l'étape 3
    nextStep(4);
    return true;
}

function validateStep4() {
    const budgetSelected = document.querySelector('input[name="budget"]:checked');
    if (!budgetSelected) {
        showToast('❌ Veuillez sélectionner une tranche de budget', 'error', 4000);
        return false;
    }
    nextStep(5);
    return true;
}

function prevStep(step) {
    nextStep(step);
}

function nextStep(stepNumber) {
    // Cacher toutes les étapes
    document.querySelectorAll('.step-content').forEach(s => s.classList.remove('active'));
    
    // Afficher l'étape courante
    const stepElement = document.getElementById('step' + stepNumber);
    if (stepElement) {
        stepElement.classList.add('active');
    }
    
    // Mettre à jour la barre de progression
    updateProgressBar(stepNumber);
    
    // Mettre à jour currentStep
    currentStep = stepNumber;
    
    // Pré-remplir si nécessaire
    if (window.devisPreset && Object.keys(window.devisPreset).length > 0) {
        setTimeout(() => prefillCurrentStep(stepNumber), 100);
    }
}

function updateProgressBar(stepNumber) {
    const bar = document.getElementById('progress-bar');
    const indicators = document.querySelectorAll('.step-indicator');
    
    // Calculer la largeur de la barre
    const percentage = ((stepNumber - 1) / (totalSteps - 1)) * 100;
    bar.style.width = percentage + '%';
    
    // Mettre à jour les indicateurs
    indicators.forEach((indicator, index) => {
        if (index < stepNumber) {
            indicator.classList.add('bg-primary', 'text-black');
            indicator.classList.remove('bg-gray-800', 'text-gray-400');
        } else {
            indicator.classList.remove('bg-primary', 'text-black');
            indicator.classList.add('bg-gray-800', 'text-gray-400');
        }
    });
}

// Fonction pour pré-remplir l'étape courante
function prefillCurrentStep(stepNumber) {
    if (!window.devisPreset || Object.keys(window.devisPreset).length === 0) return;
    
    const preset = window.devisPreset;
    
    switch(stepNumber) {
        case 1:
            // Coordonnées déjà pré-remplies dans prefillDevisFromPreset
            if (preset.coordonnees.nom) {
                document.getElementById('nom').value = preset.coordonnees.nom;
            }
            if (preset.coordonnees.email) {
                document.getElementById('email').value = preset.coordonnees.email;
            }
            break;
        case 5:
            // Modèle de service déjà pré-rempli
            if (preset.modele_service) {
                const radio = document.querySelector(`input[name="modele_service"][value="${preset.modele_service}"]`);
                if (radio) {
                    radio.checked = true;
                    const labelId = preset.modele_service === 'developpement_unique' 
                        ? 'label-developpement-unique' 
                        : 'label-abonnement-tout-inclus';
                    const label = document.getElementById(labelId);
                    if (label) {
                        label.style.borderColor = preset.modele_service === 'developpement_unique' ? '#00F0FF' : '#8B5CF6';
                        label.style.background = preset.modele_service === 'developpement_unique' 
                            ? 'rgba(0, 240, 255, 0.1)' 
                            : 'rgba(139, 92, 246, 0.1)';
                    }
                }
            }
            break;
    }
}

async function submitDevisForm() {
    const modeleService = document.querySelector('input[name="modele_service"]:checked')?.value;

    if (!modeleService) {
        showToast('❌ Veuillez sélectionner un modèle de service', 'error', 4000);
        return;
    }

    // Collecte de TOUTES les données du formulaire
    const formData = {
        // Étape 1 : Coordonnées
        nom: document.getElementById('nom').value,
        entreprise: document.getElementById('entreprise').value,
        email: document.getElementById('email').value,
        telephone: document.getElementById('telephone').value,

        // Étape 2 : Type de projet
        types_projet: Array.from(document.querySelectorAll('input[name="type_projet"]:checked'))
            .map(cb => cb.value),

        // Étape 3 : Spécifications détaillées
        // Logo
        logo: document.querySelector('input[name="logo"]:checked')?.value || '',
        
        // Charte graphique
        charte: document.querySelector('input[name="charte"]:checked')?.value || '',
        
        // Photos & Contenu
        photos: document.querySelector('input[name="photos"]:checked')?.value || '',
        
        // Nom de domaine & Hébergement
        domaine: document.querySelector('input[name="domaine"]:checked') ? 'Oui' : 'Non',
        hebergement: document.querySelector('input[name="hebergement"]:checked') ? 'Oui' : 'Non',
        referencement: document.querySelector('input[name="referencement"]:checked') ? 'Oui' : 'Non',
        
        // Fonctionnalités avancées
        reservation: document.querySelector('input[name="reservation"]:checked') ? 'Oui' : 'Non',
        paiement_stripe: document.querySelector('input[name="paiement_stripe"]:checked') ? 'Oui' : 'Non',
        paiement_paypal: document.querySelector('input[name="paiement_paypal"]:checked') ? 'Oui' : 'Non',
        paiement_autre: document.querySelector('input[name="paiement_autre"]:checked') ? 'Oui' : 'Non',
        
        // Autres besoins
        autres_besoins: document.querySelector('textarea[name="autres_besoins"]').value,

        // Étape 4 : Budget & Message
        budget: document.querySelector('input[name="budget"]:checked')?.value || '',
        message: document.getElementById('message').value,

        // Étape 5 : Modèle de service
        modele_service: modeleService,
        modele_service_label: modeleService === 'developpement_unique'
            ? 'Développement Unique'
            : 'Abonnement Tout-Inclus',

        // Métadonnées
        source: "formulaire-maxsolving",
        date_soumission: new Date().toISOString(),
        url_page: window.location.href
    };

    const submitBtn = document.querySelector('#step5 button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';

    try {
        const response = await fetch("https://n8n.deposark.com/webhook/devis-maxsolving", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error("Erreur HTTP");
        }

        showSuccessNotification();
        document.getElementById('devis-form').reset();
        nextStep(1);

    } catch (error) {
        console.error(error);
        showErrorNotification();
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer ma demande';
    }
}

function showSuccessNotification() {
    showToast('✅ Votre demande a été envoyée avec succès ! Nous vous recontacterons dans les plus brefs délais.', 'success', 5000);
}

function showErrorNotification() {
    showToast('❌ Une erreur est survenue. Veuillez réessayer ou nous contacter directement.', 'error', 5000);
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ MaxSolving - Système initialisé avec succès');
    
    // Initialiser le chat
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }
});