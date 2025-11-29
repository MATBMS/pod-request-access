// variables declaration
const form = document.getElementById('request-access-form');
const emailInput = document.getElementById('email');
const errorMessage = document.querySelector('.error-message');
const successPopup = document.querySelector('.success-popup');

// null checks for DOM elements
if (!form || !emailInput || !errorMessage || !successPopup) {
  console.error('Required DOM elements not found');
  throw new Error('Required DOM elements not found');
}

// reset on focus
emailInput.addEventListener('focus', () => {
  emailInput.classList.toggle('input-error', false);
  emailInput.setAttribute('aria-invalid', 'false');
  errorMessage.classList.add('hide-text');
});

// form submit handler
form.addEventListener('submit', (event) => {
  // prevent default behavior
  event.preventDefault();

  // validate email using Constraint Validation API
  if (emailInput.validity.valid) {
    console.log(`${emailInput.value} has been submitted!`);
    // Show success popup
    showSuccessPopup();
    // reset form
    emailInput.value = '';
    emailInput.classList.remove('input-error');
    emailInput.setAttribute('aria-invalid', 'false');
    errorMessage.classList.add('hide-text');
  } else {
    console.error(`${emailInput.value} invalid email!`);
    emailInput.classList.add('input-error');
    emailInput.setAttribute('aria-invalid', 'true');
    errorMessage.classList.remove('hide-text');
  }
});

// Success popup functionality
function showSuccessPopup() {
  successPopup.classList.remove('hide');
  successPopup.classList.add('popup-enter');
  successPopup.classList.remove('popup-exit');

  // Auto-hide after 3 seconds
  setTimeout(() => {
    hideSuccessPopup();
  }, 3000);
}

function hideSuccessPopup() {
  successPopup.classList.add('popup-exit');
  successPopup.classList.remove('popup-enter');

  // Wait for exit animation before hiding
  setTimeout(() => {
    successPopup.classList.add('hide');
    successPopup.classList.remove('popup-exit');
  }, 300); // Match CSS transition duration
}
