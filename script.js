const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("email");
const hint = document.getElementById("form-hint");
const year = document.getElementById("year");
const passwordLink = document.getElementById("password-link");

year.textContent = String(new Date().getFullYear());

const isValidEmail = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
};

const setHint = (message, tone) => {
  hint.textContent = message;
  if (tone === "success") hint.style.color = "rgba(255, 255, 255, 0.92)";
  else if (tone === "error") hint.style.color = "rgba(255, 90, 90, 0.95)";
  else if (tone === "neutral") hint.style.color = "rgba(255, 255, 255, 0.7)";
  else hint.style.color = "";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  if (!isValidEmail(email)) {
    setHint("Inserisci una email valida.", "error");
    emailInput.focus();
    return;
  }

  const stored = JSON.parse(localStorage.getItem("newsletter_emails") || "[]");
  const next = Array.isArray(stored) ? stored : [];
  if (!next.includes(email)) next.push(email);
  localStorage.setItem("newsletter_emails", JSON.stringify(next));

  setHint("Grazie! Ti avviseremo al lancio.", "success");
  form.reset();
});

passwordLink.addEventListener("click", (event) => {
  event.preventDefault();
  setHint("Area password non ancora attiva.", "neutral");
});
