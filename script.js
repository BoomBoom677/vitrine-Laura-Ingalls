const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

const fields = {
  nom: document.getElementById("nom"),
  email: document.getElementById("email"),
  telephone: document.getElementById("telephone"),
  typeEvenement: document.getElementById("type-evenement"),
  message: document.getElementById("message"),
  consentement: document.getElementById("consentement")
};

const errors = {
  nom: document.getElementById("nom-error"),
  email: document.getElementById("email-error"),
  telephone: document.getElementById("telephone-error"),
  typeEvenement: document.getElementById("type-evenement-error"),
  message: document.getElementById("message-error"),
  consentement: document.getElementById("consentement-error")
};

function cleanText(value) {
  return value
    .trim()
    .replace(/\s{2,}/g, " ")
    .replace(/[<>]/g, "");
}

function cleanName(value) {
  return cleanText(value).replace(/[^a-zA-ZÀ-ÿ' -]/g, "");
}

function cleanEmail(value) {
  return cleanText(value).toLowerCase().replace(/[<> ]/g, "");
}

function cleanPhone(value) {
  return value.replace(/[^0-9+()\-\s]/g, "").trim();
}

function cleanMessage(value) {
  return value
    .replace(/[<>]/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function showError(input, errorElement, message) {
  input.classList.add("input-error");
  input.classList.remove("input-valid");
  errorElement.textContent = message;
}

function showValid(input, errorElement) {
  input.classList.remove("input-error");
  input.classList.add("input-valid");
  errorElement.textContent = "";
}

function resetFieldState(input, errorElement) {
  input.classList.remove("input-error", "input-valid");
  errorElement.textContent = "";
}

function validateNom() {
  fields.nom.value = cleanName(fields.nom.value);

  if (fields.nom.value === "") {
    showError(fields.nom, errors.nom, "Veuillez renseigner votre nom.");
    return false;
  }

  if (fields.nom.value.length < 2) {
    showError(fields.nom, errors.nom, "Le nom doit contenir au moins 2 caractères.");
    return false;
  }

  showValid(fields.nom, errors.nom);
  return true;
}

function validateEmail() {
  fields.email.value = cleanEmail(fields.email.value);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (fields.email.value === "") {
    showError(fields.email, errors.email, "Veuillez renseigner votre email.");
    return false;
  }

  if (!emailRegex.test(fields.email.value)) {
    showError(
      fields.email,
      errors.email,
      "L'adresse email doit contenir un @ et un domaine (ex : nom@email.com)."
    );
    return false;
  }

  showValid(fields.email, errors.email);
  return true;
}

function validateTelephone() {
  fields.telephone.value = cleanPhone(fields.telephone.value);

  if (fields.telephone.value === "") {
    resetFieldState(fields.telephone, errors.telephone);
    return true;
  }

  const digitsOnly = fields.telephone.value.replace(/\D/g, "");

  if (digitsOnly.length !== 10) {
    showError(
      fields.telephone,
      errors.telephone,
      "Le numéro doit contenir exactement 10 chiffres."
    );
    return false;
  }

  showValid(fields.telephone, errors.telephone);
  return true;
}

function validateTypeEvenement() {
  if (fields.typeEvenement.value === "") {
    showError(fields.typeEvenement, errors.typeEvenement, "Veuillez choisir un type d'événement.");
    return false;
  }

  showValid(fields.typeEvenement, errors.typeEvenement);
  return true;
}

function validateMessage() {
  fields.message.value = cleanMessage(fields.message.value);

  if (fields.message.value === "") {
    showError(fields.message, errors.message, "Veuillez renseigner votre message.");
    return false;
  }

  if (fields.message.value.length < 10) {
    showError(fields.message, errors.message, "Le message doit contenir au moins 10 caractères.");
    return false;
  }

  showValid(fields.message, errors.message);
  return true;
}

function validateConsentement() {
  if (!fields.consentement.checked) {
    errors.consentement.textContent = "Veuillez accepter le traitement des données.";
    return false;
  }

  errors.consentement.textContent = "";
  return true;
}

fields.nom.addEventListener("blur", validateNom);
fields.email.addEventListener("blur", validateEmail);
fields.telephone.addEventListener("blur", validateTelephone);
fields.typeEvenement.addEventListener("change", validateTypeEvenement);
fields.message.addEventListener("blur", validateMessage);
fields.consentement.addEventListener("change", validateConsentement);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  formMessage.textContent = "";
  formMessage.className = "form-message";

  const nomValid = validateNom();
  const emailValid = validateEmail();
  const telephoneValid = validateTelephone();
  const typeValid = validateTypeEvenement();
  const messageValid = validateMessage();
  const consentValid = validateConsentement();

  if (
    nomValid &&
    emailValid &&
    telephoneValid &&
    typeValid &&
    messageValid &&
    consentValid
  ) {
    formMessage.textContent = "Votre demande a bien été préparée. Le formulaire est valide.";
    formMessage.classList.add("success-message");
    form.reset();

    Object.values(fields).forEach((field) => {
      if (field.type !== "checkbox") {
        field.classList.remove("input-valid");
      }
    });
  } else {
    formMessage.textContent = "Veuillez corriger les erreurs dans le formulaire.";
    formMessage.classList.add("error-global-message");
  }
});