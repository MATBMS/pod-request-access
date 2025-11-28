// variables declaration
const emailInput = document.querySelector('input');
const submitButton = document.querySelector('button');
const errorMessage = document.querySelector('.error-message');

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
    // reset
    emailInput.value = '';
    emailInput.classList.toggle('input-error', false);
    errorMessage.classList.add('hide-text');
  } else {
    console.error(`${formValue} invalid email!`);
    emailInput.classList.toggle('input-error', true);
    errorMessage.classList.remove('hide-text');
  }
});
