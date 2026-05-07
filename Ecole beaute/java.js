document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault(); 

  
  let prenom = document.getElementById("prenom").value.trim();
  let nom = document.getElementById("nom").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  
  let prenomError = document.getElementById("prenomError");
  let nomError = document.getElementById("nomError");
  let emailError = document.getElementById("emailError");
  let messageError = document.getElementById("messageError");
  let success = document.getElementById("successMessage");

  
  const nameRegex = /^[A-Za-zÀ-ÿ\s'-]{2,}$/; 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  
  prenomError.textContent = "";
  nomError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  success.textContent = "";

  let valid = true;

  
  if (prenom === "" || !nameRegex.test(prenom)) {
    prenomError.textContent = "Prénom invalide .";
    valid = false;
  }

  if (nom === "" || !nameRegex.test(nom)) {
    nomError.textContent = "Nom invalide  .";
    valid = false;
  }

  if (email === "" || !emailRegex.test(email)) {
    emailError.textContent = "Adresse email invalide.";
    valid = false;
  }

  if (message.length < 10) {
    messageError.textContent = "Message trop court .";
    valid = false;
  }

  if (valid) {
    success.textContent = "Merci pour votre message, nous vous répondrons bientôt !";
    document.getElementById("contactForm").reset();
  }
});


document.getElementById("prenom").addEventListener("input", function() {
  let value = this.value.trim();
  const nameRegex = /^[A-Za-zÀ-ÿ\s'-]{2,}$/;
  if (nameRegex.test(value)) {
    document.getElementById("prenomError").textContent = "";
  }
});

document.getElementById("nom").addEventListener("input", function() {
  let value = this.value.trim();
  const nameRegex = /^[A-Za-zÀ-ÿ\s'-]{2,}$/;
  if (nameRegex.test(value)) {
    document.getElementById("nomError").textContent = "";
  }
});

document.getElementById("email").addEventListener("input", function() {
  let value = this.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(value)) {
    document.getElementById("emailError").textContent = "";
  }
});

document.getElementById("message").addEventListener("input", function() {
  let value = this.value.trim();
  if (value.length >= 10) {
    document.getElementById("messageError").textContent = "";
  }
});
