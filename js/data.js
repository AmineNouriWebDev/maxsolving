// data.js - Données des projets
const projectsData = [
  // EXCEL DU ZERO (En premier)
  {
    id: 'excelduzero',
    title: 'EXCEL DU ZÉRO',
    subtitle: 'Plateforme de formation Excel en ligne',
    description: 'Plateforme e-learning complète pour apprendre Excel du débutant à l\'expert.',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS'],
    category: ['nextjs', 'application'],
    featured: false,
    imageDesktop: 'img/projects/excelduzero/thumbnail.png',
    imageMobile: 'img/projects/excelduzero/thumbnail.png',
    link: 'https://excelduzero.com',
    badge: '📊 E-LEARNING',
    badgeColor: 'green-500',
    techColor: 'green-500',
    modalData: {
      title: 'EXCEL DU ZÉRO - Formation Excel',
      description: 'Plateforme e-learning moderne construite avec Next.js et Supabase pour apprendre Excel du niveau débutant à l\'expertise.',
      technologies: ['Next.js', 'Supabase', 'HTML5', 'Tailwind CSS'],
      features: ['Cours interactifs', 'Gestion utilisateurs Supabase', 'Contenu premium verrouillé', 'Tableau de bord apprenant'],
      link: 'https://excelduzero.com',
      results: 'Plateforme e-learning scalable avec accès premium'
    }
  },
  // NYX MAINE COON
  {
    id: 'nyxmainecoon',
    title: 'NYX MAINE COON',
    subtitle: 'Élevage de chats Maine Coon',
    description: 'Site vitrine pour élevage de chats Maine Coon avec galerie et formulaire d\'adoption.',
    technologies: ['PHP', 'HTML5', 'CSS3', 'Tailwind CSS'],
    category: ['html', 'php'],
    featured: true,
    imageDesktop: 'img/projects/nyxmainecoon/thumbnail.png',
    imageMobile: 'img/projects/nyxmainecoon/thumbnail.png',
    link: 'https://nyxcooncattery.com/',
    badge: '🐱 ÉLEVAGE',
    badgeColor: 'amber-500',
    techColor: 'amber-500',
    modalData: {
      title: 'NYX MAINE COON - Cattery',
      description: 'Site vitrine pour un élevage professionnel de chats Maine Coon. Galerie des chatons disponibles, présentation de l\'élevage et formulaire de contact pour les adoptants.',
      technologies: ['PHP', 'HTML5', 'CSS3', 'Tailwind CSS'],
      features: ['Galerie chatons disponibles', 'Présentation élevage', 'Formulaire adoption', 'Design chaleureux'],
      link: 'https://nyxcooncattery.com/',
      results: 'Visibilité internationale pour l\'élevage'
    }
  },
  // offipro
  {
    id: 'offipro',
    title: 'OFFIPRO',
    subtitle: 'E-commerce de produits électroniques',
    description: 'Boutique en ligne moderne de vente de matériel informatique et électronique (smartphones, PC, tablettes, imprimantes et abonnements sharing).',
    technologies: ['PHP', 'JavaScript', 'HTML5', 'Tailwind CSS'],
    category: ['html', 'php', 'ecommerce'],
    featured: false,
    imageDesktop: 'img/projects/offipro/thumbnail.png',
    imageMobile: 'img/projects/offipro/thumbnail.png',
    link: 'https://offipro.net/',
    badge: '🗂️ BUREAUTIQUE',
    badgeColor: 'indigo-500',
    techColor: 'indigo-400',
    modalData: {
      title: 'OFFIPRO - E-commerce Électronique & Multimédia',
      description: 'Plateforme e-commerce spécialisée dans la vente d\'équipements technologiques et multimédias : ordinateurs, smartphones, tablettes, imprimantes et abonnements de partage (sharing).',
      technologies: ['PHP', 'JavaScript', 'HTML5', 'Tailwind CSS', 'Paiement en ligne'],
      features: ['Catalogue produits complet', 'Panier et commande en ligne', 'Gestion des stocks & abonnements', 'SEO technique et performant'],
      link: 'https://offipro.net/',
      results: 'Augmentation des ventes d\'équipements et fidélisation des abonnés.'
    }
  },
  // actumoto (Modifié - comparateur motos tunisie)
  {
    id: 'actumoto',
    title: 'ACTUMOTO',
    subtitle: 'Comparateur de motos en Tunisie',
    description: 'ACTUMOTO est un site comparateur des motos en tunisie avec galerie et contact.',
    technologies: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    category: ['html'],
    featured: true,
    imageDesktop: 'img/projects/actumoto/thumbnail.png',
    imageMobile: 'img/projects/actumoto/thumbnail.png',
    link: 'https://actumoto.tn',
    badge: '🔥 NOUVEAU',
    badgeColor: 'red-500',
    techColor: 'red-500',
    modalData: {
      title: 'ACTUMOTO - Comparateur Moto',
      description: 'ACTUMOTO est un site comparateur des motos en tunisie avec galerie interactive et système de contact avancé.',
      technologies: ['HTML5', 'Tailwind CSS', 'JavaScript'],
      features: ['Galerie interactive', 'Formulaire de contact', 'Comparateur de modèles', 'Localisation'],
      link: 'https://actumoto.tn',
      results: 'Augmentation des demandes de contact de 150%'
    }
  },
  // KI-MOTORS (Modifié - concessionnaire motos KIM)
  {
    id: 'kimotors',
    title: 'KI-MOTORS',
    subtitle: 'Concessionnaire officiel motos KIM',
    description: 'KI-MOTORS est un concessionaire officiel des motos marque kim avec catalogue et contact.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    category: ['html'],
    featured: false,
    imageDesktop: 'img/projects/kimotors/thumbnail.png',
    imageMobile: 'img/projects/kimotors/thumbnail.png',
    link: 'https://ki-motors.tn/',
    badge: '🏍️ MOTO',
    badgeColor: 'red-600',
    techColor: 'red-500',
    modalData: {
      title: 'KI-MOTORS - Concessionnaire KIM',
      description: 'KI-MOTORS est un concessionaire officiel des motos marque kim. Catalogue véhicules, galerie et formulaire de contact.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
      features: ['Catalogue véhicules', 'Galerie photos', 'Formulaire de contact', 'Design responsive'],
      link: 'https://ki-motors.tn/',
      results: 'Visibilité en ligne du concessionnaire améliorée'
    }
  },
  {
    id: 'efcvc',
    title: 'EFCVC',
    subtitle: 'Artisan frigoriste & climatisation industrielle',
    description: 'Site vitrine professionnel pour artisan frigoriste spécialisé en réfrigération, climatisation et froid industriel.',
    technologies: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    category: ['html', 'premium'],
    featured: true,
    imageDesktop: 'img/projects/efcvc/thumbnail.png',
    imageMobile: 'img/projects/efcvc/thumbnail.png',
    link: 'https://efcvc.com',
    badge: '⭐ PREMIUM',
    badgeColor: 'primary',
    techColor: 'primary',
    modalData: {
      title: 'EFCVC - Frigoriste & Climatisation',
      description: 'Site vitrine professionnel présentant les services d\'un artisan frigoriste expert en réfrigération et froid industriel, incluant une vitrine de produits et demande de devis.',
      technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'SEO Avancé'],
      features: ['Présentation des prestations de froid', 'Formulaire de demande de devis', 'Vitrine de climatiseurs et pièces', 'Optimisation SEO complète'],
      link: 'https://efcvc.com',
      results: 'Génération de leads qualifiés pour installations industrielles.'
    }
  },
  {
    id: 'vita-cast',
    title: 'VITA CAST',
    subtitle: 'Fabricant de plâtre médical & orthopédie',
    description: 'VITA CAST se spécialise dans la production de plâtre médical en résine américain et de produits orthopédiques de haute qualité.',
    technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'AOS'],
    category: ['html'],
    featured: false,
    imageDesktop: 'img/projects/vitacast/thumbnail.png',
    imageMobile: 'img/projects/vitacast/thumbnail.png',
    link: 'https://vita-cast.com.tn',
    badge: '🚀 RÉCENT',
    badgeColor: 'green-500',
    techColor: 'blue-500',
    modalData: {
      title: 'VITA CAST - Plâtre Médical & Orthopédie',
      description: 'VITA CAST se spécialise dans la production de plâtre médical en résine américain et de produits orthopédiques de haute qualité.',
      technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'AOS Animations'],
      features: ['Catalogue de produits orthopédiques', 'Présentation des matériaux en résine américaine', 'Formulaire de demande d\'échantillons', 'Design responsive optimisé'],
      link: 'https://vita-cast.com.tn',
      results: 'Notoriété accrue auprès des cliniques et orthopédistes partenaires.'
    }
  },
  {
    id: 'workman',
    title: 'WORKMAN',
    subtitle: 'Vêtements professionnels',
    description: 'Boutique e-commerce pour vêtements et équipements professionnels.',
    technologies: ['WordPress', 'WooCommerce', 'Elementor'],
    category: ['wordpress', 'ecommerce'],
    featured: false,
    imageDesktop: 'img/projects/workman/thumbnail.png',
    imageMobile: 'img/projects/workman/thumbnail.png',
    link: 'https://www.workman-stid.com',
    badge: '🛒 E-COMMERCE',
    badgeColor: 'blue-600',
    techColor: 'blue-600',
    modalData: {
      title: 'WORKMAN - Vêtements Professionnels',
      description: 'Site e-commerce WordPress avec WooCommerce pour vêtements professionnels et équipements de travail.',
      technologies: ['WordPress', 'WooCommerce', 'Elementor', 'SEO'],
      features: ['Catalogue produits', 'Panier e-commerce', 'Paiement sécurisé', 'Gestion des stocks'],
      link: 'https://www.workman-stid.com',
      results: 'Ventes en ligne multipliées par 4'
    }
  },
  {
    id: 'adenium',
    title: 'ADENIUM',
    subtitle: 'Entreprise de services',
    description: 'Site vitrine corporate avec présentation des services et contact.',
    technologies: ['WordPress', 'Elementor', 'SEO'],
    category: ['wordpress'],
    featured: false,
    imageDesktop: 'img/projects/adenium/thumbnail.png',
    imageMobile: 'img/projects/adenium/thumbnail.png',
    link: 'https://adenium.tn',
    badge: '🏢 CORPORATE',
    badgeColor: 'yellow-600',
    techColor: 'yellow-600',
    modalData: {
      title: 'ADENIUM - Entreprise de Services',
      description: 'Site corporate WordPress pour une entreprise de services avec portfolio et formulaire de contact.',
      technologies: ['WordPress', 'Elementor', 'SEO', 'Contact Form 7'],
      features: ['Présentation services', 'Portfolio projets', 'Formulaire contact', 'Blog actualités'],
      link: 'https://adenium.tn',
      results: 'Leads qualifiés augmentés de 80%'
    }
  },
  {
    id: 'zitouna',
    title: 'Zitouna Gourmet',
    subtitle: 'Restaurant & réservation',
    description: 'Site de restaurant avec menu interactif et système de réservation.',
    technologies: ['WordPress', 'Elementor', 'Réservation'],
    category: ['wordpress'],
    featured: false,
    imageDesktop: 'img/projects/zitouna/thumbnail.png',
    imageMobile: 'img/projects/zitouna/thumbnail.png',
    link: 'https://zitouna-gourmet.free.nf',
    badge: '🍽️ RESTAURANT',
    badgeColor: 'green-600',
    techColor: 'green-600',
    modalData: {
      title: 'ZITOUNA GOURMET - Restaurant',
      description: 'Site WordPress pour restaurant avec menu interactif, système de réservation en ligne et galerie photos.',
      technologies: ['WordPress', 'Elementor', 'Booking Plugin', 'SEO'],
      features: ['Menu interactif', 'Réservation en ligne', 'Galerie photos', 'Avis clients'],
      link: 'https://zitouna-gourmet.free.nf',
      results: 'Réservations augmentées de 120%'
    }
  },
  {
    id: 'direct-serrure',
    title: 'DIRECT SERRURE',
    subtitle: 'Vente serrures & systèmes de sécurité',
    description: 'Site e-commerce spécialisé dans les serrures et systèmes de sécurité.',
    technologies: ['WordPress', 'WooCommerce', 'Elementor'],
    category: ['wordpress', 'ecommerce'],
    featured: false,
    imageDesktop: 'img/projects/directSerrure/thumbnail.png',
    imageMobile: 'img/projects/directSerrure/thumbnail.png',
    link: 'https://direct-serrure.fr/',
    badge: '🔒 SÉCURITÉ',
    badgeColor: 'gray-500',
    techColor: 'gray-400',
    modalData: {
      title: 'DIRECT SERRURE - Sécurité',
      description: 'Site e-commerce WordPress pour la vente de serrures et systèmes de sécurité professionnels.',
      technologies: ['WordPress', 'WooCommerce', 'Elementor', 'Paiement sécurisé'],
      features: ['Catalogue produits', 'Fiches techniques', 'Guide d\'achat', 'Support client'],
      link: 'https://direct-serrure.fr/',
      results: 'Chiffre d\'affaires multiplié par 3'
    }
  },
  {
    id: 'bfpetfood',
    title: 'BFPETFOOD',
    subtitle: 'Vente d\'accessoires et aliments pour animaux',
    description: 'Site e-commerce pour accessoires et aliments pour animaux.',
    technologies: ['Shopify', 'Paiement en ligne'],
    category: ['shopify', 'ecommerce'],
    featured: false,
    imageDesktop: 'img/projects/bfpetfood/thumbnail.png',
    imageMobile: 'img/projects/bfpetfood/thumbnail.png',
    link: 'https://bfpetfood.shop/',
    badge: '🐾 ANIMAUX',
    badgeColor: 'purple-600',
    techColor: 'purple-600',
    modalData: {
      title: 'BF PET FOOD - Accessoires Animaux',
      description: 'Boutique Shopify spécialisée dans les accessoires et aliments premium pour animaux.',
      technologies: ['Shopify', 'Shop Pay', 'E-commerce', 'Marketing'],
      features: ['Boutique en ligne', 'Paiement sécurisé', 'Fiches produits', 'Livraison'],
      link: 'https://bfpetfood.shop/',
      results: 'Ventes mensuelles stables dès le 1er mois'
    }
  },
  {
    id: 'kilowatt',
    title: 'KILOWATT',
    subtitle: 'Fabricant de faisceaux et cordons électriques',
    description: 'Site e-commerce pour fabricant de faisceaux et cordons électriques.',
    technologies: ['WordPress', 'Divi', 'Yoast SEO'],
    category: ['wordpress', 'ecommerce'],
    featured: false,
    imageDesktop: 'img/projects/kilowatt/thumbnail.png',
    imageMobile: 'img/projects/kilowatt/thumbnail.png',
    link: 'https://kilowatt-international.com/fr/home/',
    badge: '⚡ ÉLECTRICITÉ',
    badgeColor: 'yellow-500',
    techColor: 'yellow-500',
    modalData: {
      title: 'KILOWATT - Faisceaux Électriques',
      description: 'Site e-commerce WordPress avec thème Divi pour fabricant de faisceaux et cordons électriques. SEO optimisé avec Yoast.',
      technologies: ['WordPress', 'Divi', 'Yoast SEO', 'WooCommerce'],
      features: ['Boutique en ligne', 'Paiement sécurisé', 'Fiches produits', 'SEO Yoast optimisé'],
      link: 'https://kilowatt-international.com/fr/home/',
      results: 'Visibilité SEO améliorée, trafic organique en hausse'
    }
  },
  {
    id: 'andrebpo',
    title: 'ANDRE BPO',
    subtitle: 'Business Process Outsourcing',
    description: 'Site corporate pour société de Business Process Outsourcing.',
    technologies: ['WordPress', 'Elementor', 'Yoast SEO'],
    category: ['wordpress', 'corporate'],
    featured: false,
    imageDesktop: 'img/projects/andreBpo/thumbnail.png',
    imageMobile: 'img/projects/andreBpo/thumbnail.png',
    link: 'https://www.andre-bpo.fr/',
    badge: '🏢 Services',
    badgeColor: 'blue-600',
    techColor: 'blue-500',
    modalData: {
      title: 'ANDRE BPO - Business Process Outsourcing',
      description: 'Site corporate WordPress pour société de Business Process Outsourcing avec SEO Yoast optimisé.',
      technologies: ['WordPress', 'Elementor', 'Yoast SEO'],
      features: ['Site corporate', 'Design responsive', 'SEO Yoast optimisé', 'Support client'],
      link: 'https://www.andre-bpo.fr/',
      results: 'Meilleure visibilité sur les moteurs de recherche'
    }
  },
  {
    id: 'portfolioaminenouri',
    title: 'PORTFOLIO AMINE NOURI',
    subtitle: 'Développeur Web Freelance',
    description: 'Portfolio pour développeur web freelance.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    category: ['html', 'portfolio'],
    featured: false,
    imageDesktop: 'img/projects/amineNouriPortfolio/thumbnail.png',
    imageMobile: 'img/projects/amineNouriPortfolio/thumbnail.png',
    link: 'https://aminenouriwebdev.github.io/portfolio/',
    badge: '🚀 Portfolio',
    badgeColor: 'purple-600',
    techColor: 'purple-600',
    modalData: {
      title: 'PORTFOLIO AMINE NOURI - Développeur Web Freelance',
      description: 'Portfolio pour développeur web freelance showcasing projects and skills.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
      features: ['Présentation projets', 'Design responsive', 'Animations modernes', 'Contact intégré'],
      link: 'https://aminenouriwebdev.github.io/portfolio/',
      results: 'Mise en valeur du profil professionnel'
    }
  },
  {
    id: 'domid',
    title: 'DOMI-D',
    subtitle: 'Site vitrine personnel & portfolio',
    description: 'Site vitrine moderne avec galerie et présentation personnelle.',
    technologies: ['HTML5', 'CSS3', 'Tailwind CSS'],
    category: ['html', 'portfolio'],
    featured: true,
    imageDesktop: 'img/projects/domid/thumbnail.png',
    imageMobile: 'img/projects/domid/thumbnail.png',
    link: 'https://domi-d.com',
    badge: '✨ DESIGN',
    badgeColor: 'pink-500',
    techColor: 'pink-500',
    modalData: {
      title: 'DOMI-D - Site Vitrine & Portfolio',
      description: 'Site vitrine moderne avec galerie personnelle et présentation professionnelle. Design élégant et responsive.',
      technologies: ['HTML5', 'CSS3', 'Tailwind CSS'],
      features: ['Design élégant', 'Galerie interactive', 'Design responsive', 'Performance optimisée'],
      link: 'https://domi-d.com',
      results: 'Présence en ligne professionnelle et moderne'
    }
  },
  {
    id: 'voyantemedium',
    title: 'VOYANTE BRUXELLES',
    subtitle: 'Voyance & consultation en ligne',
    description: 'Site de voyance et consultation pour professionnelle basée à Bruxelles.',
    technologies: ['HTML5', 'CSS3', 'Tailwind CSS'],
    category: ['html'],
    featured: false,
    imageDesktop: 'img/projects/voyante/thumbnail.png',
    imageMobile: 'img/projects/voyante/thumbnail.png',
    link: 'https://voyante-bruxelles.be/',
    badge: '🔮 VOYANCE',
    badgeColor: 'purple-500',
    techColor: 'purple-500',
    modalData: {
      title: 'VOYANTE BRUXELLES - Voyance & Consultation',
      description: 'Site professionnel de voyance et consultation en ligne. Design mystique et élégant, optimisé SEO pour la Belgique.',
      technologies: ['HTML5', 'CSS3', 'Tailwind CSS', 'SEO Belgique'],
      features: ['Présentation services', 'Prise de rendez-vous', 'Design responsive', 'SEO local Bruxelles'],
      link: 'https://voyante-bruxelles.be/',
      results: 'Visibilité locale Bruxelles améliorée'
    }
  },
  {
    id: 'artisanserruriervoltaire',
    title: 'Artisan Serrurier Voltaire',
    subtitle: 'Serrurier Paris 11 - Intervention rapide',
    description: 'Site vitrine pour serrurier avec intervention rapide à Paris.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    category: ['html'],
    featured: false,
    imageDesktop: 'img/projects/artisanSerrurier/thumbnail.png',
    imageMobile: 'img/projects/artisanSerrurier/thumbnail.png',
    link: 'https://aminenouriwebdev.github.io/ArtisanSerrurierVoltaire/index3.html',
    badge: '🔑 SERRURIER',
    badgeColor: 'blue-400',
    techColor: 'blue-400',
    modalData: {
      title: 'Artisan Serrurier Voltaire - Paris 11',
      description: 'Site vitrine pour serrurier professionnel avec intervention rapide à Paris 11.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
      features: ['Appel d\'urgence direct', 'Design responsive', 'SEO local Paris', 'Formulaire devis'],
      link: 'https://aminenouriwebdev.github.io/ArtisanSerrurierVoltaire/index3.html',
      results: 'Augmentation des appels d\'urgence'
    }
  },
  {
    id: 'technoplus',
    title: 'TECHNOPLUS',
    subtitle: 'E-commerce multimédia & informatique',
    description: 'Site e-commerce complet pour la vente d\'appareils électroniques : ordinateurs, tablettes, smartphones, imprimantes et services d\'abonnements sharing.',
    technologies: ['PHP', 'Bootstrap', 'HTML5', 'CSS3'],
    category: ['html', 'php', 'ecommerce'],
    featured: false,
    imageDesktop: 'img/projects/technoplus/thumbnail.png',
    imageMobile: 'img/projects/technoplus/thumbnail.png',
    link: 'https://technoplus.io/',
    badge: '💻 TECH',
    badgeColor: 'cyan-500',
    techColor: 'cyan-500',
    modalData: {
      title: 'TECHNOPLUS - E-commerce High-Tech',
      description: 'Site e-commerce de vente de tout type de matériel informatique et d\'électronique grand public (smartphones, PC, tablettes, périphériques et abonnements de partage).',
      technologies: ['PHP', 'Bootstrap', 'HTML5', 'CSS3', 'Panier d\'achat'],
      features: ['Fiches produits interactives', 'Tunnel de commande fluide', 'Gestion d\'abonnements sharing', 'Design responsive Bootstrap'],
      link: 'https://technoplus.io/',
      results: 'Canal de vente en ligne performant et gestion simplifiée des commandes.'
    }
  },
  {
    id: 'pensionchiens',
    title: 'PENSION CHIENS',
    subtitle: 'Pension & garde pour chiens en Belgique',
    description: 'Site WordPress pour pension canine en Belgique avec système de réservation.',
    technologies: ['WordPress', 'Complianz', 'Rank Math'],
    category: ['wordpress'],
    featured: false,
    imageDesktop: 'img/projects/pensionchiens/thumbnail.png',
    imageMobile: 'img/projects/pensionchiens/thumbnail.png',
    link: 'https://pension-chiens.be/',
    badge: '🐕 ANIMAUX',
    badgeColor: 'orange-500',
    techColor: 'orange-500',
    modalData: {
      title: 'PENSION CHIENS - Garde Canine Belgique',
      description: 'Site WordPress professionnel pour une pension canine en Belgique. Conformité RGPD avec Complianz, SEO puissant avec Rank Math.',
      technologies: ['WordPress', 'Complianz RGPD', 'Rank Math SEO'],
      features: ['Réservation en ligne', 'Conformité RGPD Complianz', 'SEO Rank Math optimisé', 'Galerie chiens pensionnaires'],
      link: 'https://pension-chiens.be/',
      results: 'Réservations en ligne et visibilité locale Belgique'
    }
  },
];

// Exporter les données pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
} else {
  window.projectsData = projectsData;
}