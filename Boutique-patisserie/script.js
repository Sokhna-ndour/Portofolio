// ========== PARTICULES ==========
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = Math.random() * 5 + 3 + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.width = Math.random() * 8 + 4 + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}
createParticles();

// ========== HEADER AU SCROLL ==========
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========== MENU HAMBURGER ==========
const menuToggle = document.getElementById('menuToggle');
const navUl = document.querySelector('nav ul');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('open');
  });
}

// ========== ANIMATIONS AU SCROLL ==========
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ========== PANIER ==========
let panier = JSON.parse(localStorage.getItem('panier')) || [];

function ajouterAuPanier(nom, prix) {
  const existant = panier.find(p => p.nom === nom);
  if (existant) {
    existant.quantite++;
  } else {
    panier.push({ nom, prix, quantite: 1 });
  }
  localStorage.setItem('panier', JSON.stringify(panier));
  updatePanierCount();
  showNotification(nom);
}

function updatePanierCount() {
  const count = panier.reduce((total, p) => total + p.quantite, 0);
  const el = document.getElementById('panierCount');
  if (el) el.textContent = count;
}

function showNotification(nom) {
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.textContent = `✓ ${nom} ajouté au panier !`;
  document.body.appendChild(notif);
  setTimeout(() => notif.classList.add('show'), 100);
  setTimeout(() => {
    notif.classList.remove('show');
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

// ========== AFFICHAGE PANIER ==========
function afficherPanier() {
  const liste = document.getElementById('panierListe');
  const vide = document.getElementById('panierVide');
  const sousTotal = document.getElementById('sousTotal');
  const totalFinal = document.getElementById('totalFinal');
  if (!liste) return;

  if (panier.length === 0) {
    liste.innerHTML = '';
    vide.style.display = 'flex';
    if (sousTotal) sousTotal.textContent = '0 FCFA';
    if (totalFinal) totalFinal.textContent = '2 000 FCFA';
    return;
  }

  vide.style.display = 'none';
  liste.innerHTML = '';

  let total = 0;
  panier.forEach((item, index) => {
    total += item.prix * item.quantite;
    const div = document.createElement('div');
    div.className = 'panier-item';
    div.innerHTML = `
      <div class="panier-item-info">
        <h4>${item.nom}</h4>
        <p>${(item.prix * item.quantite).toLocaleString()} FCFA</p>
      </div>
      <div class="panier-item-actions">
        <button class="qty-btn" onclick="changerQty(${index}, -1)">−</button>
        <span class="qty-value">${item.quantite}</span>
        <button class="qty-btn" onclick="changerQty(${index}, 1)">+</button>
        <button class="btn-supprimer" onclick="supprimerItem(${index})">🗑️</button>
      </div>
    `;
    liste.appendChild(div);
  });

  if (sousTotal) sousTotal.textContent = total.toLocaleString() + ' FCFA';
  if (totalFinal) totalFinal.textContent = (total + 2000).toLocaleString() + ' FCFA';
}

function changerQty(index, delta) {
  panier[index].quantite += delta;
  if (panier[index].quantite <= 0) {
    panier.splice(index, 1);
  }
  localStorage.setItem('panier', JSON.stringify(panier));
  updatePanierCount();
  afficherPanier();
}

function supprimerItem(index) {
  panier.splice(index, 1);
  localStorage.setItem('panier', JSON.stringify(panier));
  updatePanierCount();
  afficherPanier();
}

// ========== COMMANDE ==========
function passerCommande() {
  const nom = document.getElementById('cmdNom');
  const tel = document.getElementById('cmdTel');
  const adresse = document.getElementById('cmdAdresse');
  if (!nom) return;

  let valid = true;

  if (nom.value.trim() === '') {
    document.getElementById('cmdNomError').textContent = 'Nom requis';
    valid = false;
  } else {
    document.getElementById('cmdNomError').textContent = '';
  }

  if (tel.value.trim() === '') {
    document.getElementById('cmdTelError').textContent = 'Téléphone requis';
    valid = false;
  } else {
    document.getElementById('cmdTelError').textContent = '';
  }

  if (adresse.value.trim() === '') {
    document.getElementById('cmdAdresseError').textContent = 'Adresse requise';
    valid = false;
  } else {
    document.getElementById('cmdAdresseError').textContent = '';
  }

  if (panier.length === 0) {
    alert('Votre panier est vide !');
    return;
  }

  if (valid) {
    let message = `Bonjour, je voudrais commander :\n`;
    panier.forEach(item => {
      message += `- ${item.nom} x${item.quantite} = ${(item.prix * item.quantite).toLocaleString()} FCFA\n`;
    });
    message += `\nNom : ${nom.value}\nTél : ${tel.value}\nAdresse : ${adresse.value}`;

    const url = `https://wa.me/221XXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    panier = [];
    localStorage.setItem('panier', JSON.stringify(panier));
    updatePanierCount();
    afficherPanier();

    document.getElementById('cmdSuccess').textContent = '✅ Commande envoyée via WhatsApp !';
  }
}

// ========== FILTRES BOUTIQUE ==========
const filtresBtns = document.querySelectorAll('.filtre-btn');
filtresBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filtresBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filtre = btn.dataset.filtre;
    document.querySelectorAll('.product-card').forEach(card => {
      if (filtre === 'tous' || card.dataset.categorie === filtre) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ========== FORMULAIRE CONTACT ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const sujet = document.getElementById('sujet') ? document.getElementById('sujet').value.trim() : 'ok';
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (nom === '') {
      document.getElementById('nomError').textContent = 'Nom requis';
      valid = false;
    } else {
      document.getElementById('nomError').textContent = '';
    }

    if (!emailRegex.test(email)) {
      document.getElementById('emailError').textContent = 'Email invalide';
      valid = false;
    } else {
      document.getElementById('emailError').textContent = '';
    }

    if (sujet === '') {
      document.getElementById('sujetError').textContent = 'Sujet requis';
      valid = false;
    } else {
      if (document.getElementById('sujetError')) {
        document.getElementById('sujetError').textContent = '';
      }
    }

    if (message.length < 10) {
      document.getElementById('messageError').textContent = 'Message trop court';
      valid = false;
    } else {
      document.getElementById('messageError').textContent = '';
    }

    if (valid) {
      document.getElementById('successMessage').textContent = '✅ Message envoyé ! Nous vous répondrons bientôt.';
      contactForm.reset();
    }
  });
}

// ========== INIT ==========
updatePanierCount();
afficherPanier();