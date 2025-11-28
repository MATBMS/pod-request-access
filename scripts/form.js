// variables declaration
const emailInput = document.querySelector('input');
const submitButton = document.querySelector('button');
const errorMessage = document.querySelector('.error-message');
const successPopup = document.querySelector('.success-popup');

// reset on focus
emailInput.addEventListener('focus', function () {
  emailInput.classList.toggle('input-error', false);
  errorMessage.classList.add('hide-text');
});

// button handler
submitButton.addEventListener('click', function (event) {
  // prevent default behavior
  event.preventDefault();
  // handle value
  const formValue = emailInput.value;

  // validate email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(formValue)) {
    console.log(`${formValue} has been submitted!`);
    // Show success popup
    showSuccessPopup();
    // reset form
    emailInput.value = '';
    emailInput.classList.remove('input-error');
    errorMessage.classList.add('hide-text');
  } else {
    console.error(`${formValue} invalid email!`);
    emailInput.classList.add('input-error');
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
