// portfolio.js - Rendu dynamique du portfolio
class PortfolioRenderer {
  constructor() {
    this.projects = window.projectsData || [];
    this.featuredContainer = document.getElementById('featured-projects');
    this.portfolioContainer = document.getElementById('portfolio-projects');
    this.modalContent = document.getElementById('modal-content');
    
    this.init();
  }
  
  init() {
    if (this.featuredContainer) {
      this.renderFeaturedProjects();
    }
    
    if (this.portfolioContainer) {
      this.renderPortfolioProjects();
    }
    
    // Mettre à jour le compteur de projets
    this.updateProjectCounts();
  }
  
  // Rendre les projets featured (page d'accueil)
  renderFeaturedProjects() {
    const featuredProjects = this.projects.filter(project => project.featured).slice(0, 3);
    
    this.featuredContainer.innerHTML = featuredProjects.map(project => `
      <div class="glass-card rounded-xl overflow-hidden group cursor-pointer" onclick="router('portfolio')">
        <div class="h-64 relative overflow-hidden">
          <img
            src="${project.imageDesktop}"
            alt="${project.title}"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          ${project.imageMobile ? `
          <!-- Aperçu mobile -->
          <div class="absolute top-4 right-4 w-16 h-28 bg-black rounded-lg border-2 border-white/20 overflow-hidden">
            <img
              src="${project.imageMobile}"
              alt="Mobile view"
              class="w-full h-full object-cover"
            />
          </div>
          ` : ''}
          <div class="absolute bottom-2 right-2 bg-${project.badgeColor}/90 text-white text-xs px-2 py-1 rounded">
            ${project.badge}
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-lg font-bold text-white mb-2">
            ${project.title} - ${project.subtitle.split(' - ')[0]}
          </h3>
          <p class="text-gray-400 text-sm mb-4">
            ${project.subtitle.split(' - ')[1] || project.subtitle}
          </p>
          <div class="flex gap-2">
            ${project.technologies.slice(0, 3).map(tech => `
              <span class="px-2 py-1 bg-${project.techColor}/20 text-${project.techColor} text-xs rounded">
                ${tech}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }
  
  // Rendre tous les projets (page portfolio)
  renderPortfolioProjects() {
    this.portfolioContainer.innerHTML = this.projects.map(project => `
      <!-- Projet: ${project.title} -->
      <div class="project-card group" data-category="${project.category.join(' ')}">
        <div class="relative overflow-hidden rounded-xl h-full flex flex-col glass-card">
          ${project.category.includes('premium') ? `
          <!-- Badge Premium -->
          <div class="absolute top-4 left-4 z-10">
            <span class="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
              ⭐ PROJET PREMIUM
            </span>
          </div>
          ` : ''}
          
          <!-- Image -->
          <div class="h-64 relative flex-grow-0">
            <div class="w-full h-full relative overflow-hidden">
              <img
                src="${project.imageDesktop}"
                alt="${project.title}"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              ${project.imageMobile ? `
              <!-- Aperçu mobile -->
              <div class="absolute top-4 right-4 w-16 h-28 bg-black rounded-lg border-2 border-white/20 overflow-hidden">
                <img
                  src="${project.imageMobile}"
                  alt="Mobile view"
                  class="w-full h-full object-cover"
                />
              </div>
              ` : ''}
            </div>
          </div>
          
          <!-- Contenu -->
          <div class="p-6 flex-grow">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-bold text-white font-tech">
                  ${project.title}
                </h3>
                <p class="text-gray-400 text-sm">
                  ${project.subtitle}
                </p>
              </div>
              <a
                href="${project.link}"
                target="_blank"
                class="text-${project.techColor} hover:text-white transition-colors"
              >
                ↗
              </a>
            </div>
            
            <!-- Technologies -->
            <div class="flex flex-wrap gap-2 mb-4">
              ${project.technologies.map(tech => `
                <span class="px-2 py-1 bg-${project.techColor}/20 text-${project.techColor} text-xs rounded">
                  ${tech}
                </span>
              `).join('')}
            </div>
            
            <p class="text-gray-400 text-sm mb-6">
              ${project.description}
            </p>
            
            <!-- Boutons d'action -->
            <div class="flex gap-2 mt-auto">
              <a
                href="${project.link}"
                target="_blank"
                class="flex-1 text-center border border-${project.techColor} text-${project.techColor} hover:bg-${project.techColor} hover:text-white py-2 rounded transition-colors"
              >
                Visiter
              </a>
              <button
                onclick="openProjectModal('${project.id}')"
                class="flex-1 border border-gray-700 text-gray-400 hover:border-${project.techColor} hover:text-${project.techColor} py-2 rounded transition-colors"
              >
                Détails
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  // Mettre à jour les compteurs de filtres
  updateProjectCounts() {
    const counts = {
      all: this.projects.length,
      wordpress: this.projects.filter(p => p.category.includes('wordpress')).length,
      html: this.projects.filter(p => p.category.includes('html')).length,
      shopify: this.projects.filter(p => p.category.includes('shopify')).length,
      nextjs: this.projects.filter(p => p.category.includes('nextjs')).length
    };
    
    // Mettre à jour les boutons de filtre
    document.querySelectorAll('.filter-btn').forEach(btn => {
      const filter = btn.getAttribute('data-filter');
      if (counts[filter] !== undefined) {
        const countSpan = btn.querySelector('.count') || document.createElement('span');
        countSpan.className = 'count';
        countSpan.textContent = ` (${counts[filter]})`;
        if (!btn.querySelector('.count')) {
          btn.appendChild(countSpan);
        }
      }
    });
  }
  
  // Rendre le contenu du modal
  renderModalContent(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return '';
    
    const modalData = project.modalData || project;
    
    return `
      <div class="space-y-6">
        <h3 class="text-3xl font-bold text-white font-tech">${modalData.title}</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-xl font-bold text-primary mb-3">Description</h4>
            <p class="text-gray-300">${modalData.description}</p>
          </div>
          
          <div>
            <h4 class="text-xl font-bold text-secondary mb-3">Résultats</h4>
            <p class="text-gray-300">${modalData.results || 'Projet en cours de suivi...'}</p>
          </div>
        </div>
        
        <div>
          <h4 class="text-xl font-bold text-white mb-3">Technologies utilisées</h4>
          <div class="flex flex-wrap gap-2">
            ${modalData.technologies.map(tech => 
              `<span class="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">${tech}</span>`
            ).join('')}
          </div>
        </div>
        
        <div>
          <h4 class="text-xl font-bold text-white mb-3">Fonctionnalités principales</h4>
          <ul class="space-y-2">
            ${modalData.features.map(feature => 
              `<li class="flex items-center text-gray-300">
                <span class="text-primary mr-2">✓</span> ${feature}
              </li>`
            ).join('')}
          </ul>
        </div>
        
        ${modalData.link && modalData.link !== '#' ? `
          <div class="pt-4 border-t border-white/10">
            <a href="${modalData.link}" target="_blank" 
               class="btn-neon bg-primary text-black px-8 py-3 rounded font-tech font-bold uppercase tracking-widest hover:bg-white transition-colors inline-block">
              Visiter le site
            </a>
          </div>
        ` : ''}
      </div>
    `;
  }
}

// Initialiser le renderer quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioRenderer = new PortfolioRenderer();
});