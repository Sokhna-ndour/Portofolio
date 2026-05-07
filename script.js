// CURSEUR CUSTOM
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursorRing.style.opacity = '1'; });
  el.addEventListener('mouseleave', () => { cursorRing.style.opacity = '0.6'; });
});

// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// BARRES DE COMPÉTENCES
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(el => barObserver.observe(el));

// NAV AU SCROLL
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(10,10,10,0.97)';
    nav.style.backdropFilter = 'blur(10px)';
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.95), transparent)';
    nav.style.backdropFilter = 'none';
  }
});

// FORMULAIRE CONTACT
function envoyerMessage() {
  const nom     = document.querySelector('.form-input[placeholder="Votre nom"]').value.trim();
  const email   = document.querySelector('.form-input[placeholder="votre@email.com"]').value.trim();
  const message = document.querySelector('.form-textarea').value.trim();

  if (!nom || !email || !message) {
    alert('Merci de remplir tous les champs.'); return;
  }
  if (!email.includes('@')) {
    alert('Veuillez entrer un email valide.'); return;
  }

  alert(`Merci ${nom} ! Votre message a bien été envoyé.`);
  document.querySelectorAll('.form-input, .form-textarea').forEach(el => el.value = '');
}