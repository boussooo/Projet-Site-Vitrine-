/* ====================================================
   SCRIPT.JS - Système de Gestion d'Éducation Financière
   Fonctionnalités : navigation, animations, formulaire
   ==================================================== */

/* === 1. MENU HAMBURGER (RESPONSIVE MOBILE) === */
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    // Ouvrir / fermer le menu
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Fermer le menu au clic sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* === 2. NAVBAR : EFFET AU DÉFILEMENT === */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* === 3. LIEN ACTIF DANS LA NAVIGATION === */
(function markActiveLink() {
  const page     = window.location.pathname.split('/').pop() || 'index.html';
  const allLinks = document.querySelectorAll('.nav-links a');

  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* === 4. ANIMATIONS AU DÉFILEMENT (Intersection Observer) === */
const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Animer une seule fois
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach(el => observer.observe(el));
}

/* === 5. BARRE DE PROGRESSION ANIMÉE (Hero) === */
function animateProgress() {
  const fills = document.querySelectorAll('.progress-fill');

  fills.forEach(fill => {
    const target = fill.getAttribute('data-width') || '0';
    setTimeout(() => {
      fill.style.width = target + '%';
    }, 600);
  });
}

window.addEventListener('load', animateProgress);

/* === 6. FORMULAIRE DE CONTACT === */
const form    = document.getElementById('contactForm');
const msgBox  = document.getElementById('formMessage');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêcher le rechargement de la page

    // Récupération des valeurs
    const nom     = document.getElementById('nom').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation simple
    if (!nom || !email || !message) {
      showMessage('Veuillez remplir tous les champs.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showMessage('Veuillez saisir une adresse email valide.', 'error');
      return;
    }

    // Simulation d'envoi (sans backend)
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;

    setTimeout(() => {
      showMessage('✅ Message envoyé avec succès ! Nous vous répondrons bientôt.', 'success');
      form.reset();
      btn.textContent = 'Envoyer le message';
      btn.disabled = false;
    }, 1500);
  });
}

/* Vérification format email */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/* Afficher message de retour */
function showMessage(text, type) {
  if (!msgBox) return;
  msgBox.textContent = text;
  msgBox.className = 'form-message ' + type;

  // Masquer après 5 secondes
  setTimeout(() => {
    msgBox.className = 'form-message';
    msgBox.textContent = '';
  }, 5000);
}

/* === 7. COMPTEUR ANIMÉ (optionnel, sur les chiffres) === */
function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1500;
  const step     = target / (duration / 16);
  let   current  = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// Observer pour les compteurs
const counters = document.querySelectorAll('[data-target]');

if (counters.length > 0) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
}

/* === 8. SMOOTH SCROLL POUR ANCRES === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
