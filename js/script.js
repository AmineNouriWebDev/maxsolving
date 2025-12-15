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
                alert('Message envoyé avec succès ! Nous vous recontacterons dans les 24h.');
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