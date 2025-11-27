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