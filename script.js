/* ──────────────────────────────────────────
   feat-01 — Valid submit shows a confirmation popup.
   Happy path only: empty / malformed rejection lives in feat-02 / feat-03.
   ────────────────────────────────────────── */

const form = document.querySelector(".signup-form");
const input = document.querySelector("#email");
const button = form.querySelector(".signup-form__button");
const popup = document.querySelector("#confirmation-popup");
const errorMessage = document.querySelector("#email-error");

// Canonical copy — see the spec's Data section. Kept in JS so the empty
// role="status" element only gains text at announce time.
const CONFIRMATION_MESSAGE =
  "Thanks for your interest! This is a fake site built for learning purposes — no email has actually been sent.";

// feat-02 — empty-field rejection copy. The HTML ships a default error string
// for the malformed case (feat-03); the empty case overrides it at submit time.
const EMPTY_EMAIL_MESSAGE = "Oops! Please add your email";

// feat-03 — malformed-email rejection copy. Matches the HTML's default
// #email-error string, but we set it explicitly so a prior empty error can't
// leave the wrong message on screen.
const MALFORMED_EMAIL_MESSAGE = "Oops! Please check your email";

// feat-03 — shape-based format check (see the spec's Data section). Not
// RFC-complete by design: local@domain.tld, no spaces, a single @. The form is
// `novalidate`, so this regex — not the browser's native type="email" bubble —
// is the sole gate, which lets us surface our own message.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Deferred constraint: 4s sits in the approved 3–5s range.
const POPUP_DURATION_MS = 4000;

form.addEventListener("submit", (event) => {
  // No backend — never let the form's default navigation reload the page.
  event.preventDefault();

  const email = input.value.trim(); // whitespace-only collapses to "" → empty

  // Empty check takes precedence over the format check (feat-02 context).
  if (email === "") {
    showEmptyError();
    return;
  }

  // Non-empty but badly formatted → feat-03's branch.
  if (!EMAIL_PATTERN.test(email)) {
    showMalformedError();
    return;
  }

  showConfirmation();
});

// Recovery: clear whichever submit error is showing (empty → feat-02, malformed
// → feat-03) as soon as a real value is typed. Whitespace-only still counts as
// empty, so guard on trim(). This only ever clears — errors are raised on submit,
// never re-raised mid-typing.
input.addEventListener("input", () => {
  if (input.value.trim() !== "") {
    input.removeAttribute("aria-invalid");
  }
});

function showEmptyError() {
  // aria-invalid="true" is the single hook the CSS uses to paint the red
  // border and reveal #email-error; setting the copy is all that's left.
  input.setAttribute("aria-invalid", "true");
  errorMessage.textContent = EMPTY_EMAIL_MESSAGE;
}

function showMalformedError() {
  // Same aria-invalid hook as the empty case; only the copy differs. Set it
  // explicitly so a previous empty-error message can't linger.
  input.setAttribute("aria-invalid", "true");
  errorMessage.textContent = MALFORMED_EMAIL_MESSAGE;
}

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
