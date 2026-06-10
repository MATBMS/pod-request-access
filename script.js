/* ──────────────────────────────────────────
   feat-01 — Valid submit shows a confirmation popup.
   Happy path only: empty / malformed rejection lives in feat-02 / feat-03.
   ────────────────────────────────────────── */

const form = document.querySelector(".signup-form");
const input = document.querySelector("#email");
const button = form.querySelector(".signup-form__button");
const popup = document.querySelector("#confirmation-popup");

// Canonical copy — see the spec's Data section. Kept in JS so the empty
// role="status" element only gains text at announce time.
const CONFIRMATION_MESSAGE =
  "Thanks for your interest! This is a fake site built for learning purposes — no email has actually been sent.";

// Deferred constraint: 4s sits in the approved 3–5s range.
const POPUP_DURATION_MS = 4000;

form.addEventListener("submit", (event) => {
  // No backend — never let the form's default navigation reload the page.
  event.preventDefault();

  const email = input.value.trim();
  // checkValidity() leans on type="email" for the format check; the empty
  // guard is explicit because the field isn't `required`.
  const isValid = email !== "" && input.checkValidity();
  if (!isValid) return; // rejection feedback is feat-02 / feat-03's job

  showConfirmation();
});

function showConfirmation() {
  // Lock the controls while the toast is up.
  input.disabled = true;
  button.disabled = true;

  // Un-hide first so the live region is in the accessibility tree, THEN set
  // the text — the content mutation is what triggers the announcement.
  popup.hidden = false;
  popup.textContent = CONFIRMATION_MESSAGE;

  setTimeout(dismissConfirmation, POPUP_DURATION_MS);
}

function dismissConfirmation() {
  popup.hidden = true;
  popup.textContent = "";

  input.disabled = false;
  button.disabled = false;
  input.value = ""; // clear for a fresh start (focus is intentionally left alone)
}
