export const loginSelectors = {
  email: '[data-cy="email-text-field"]',
  password: '[data-cy="login-password-field"]',
  passwordToggler: '[data-cy="password-password-toggler-field"]',
};

export const usersFormSelectors = {
  name: '[data-cy="name-text-field"]',
  userName: '[data-cy="userName-text-field"]',
  email: '[data-cy="email-text-field"]',
  mobile_number: '[data-cy="mobile_number-text-field"]',
  submitButton: '[data-cy="modal-submit"]',
  toastMessage: ".Toastify__toast-body",
};

export const usersButtonSelectors = {
  loginUser: '[data-cy="login-submit-button"]',
  addUser: '[data-cy="add-button"]',
};

export const usersErrorSelectors = {
  name: ".field-error-message",
  form: {
    name: ":nth-child(1) > .row > .col-md-12 > .fv-plugins-message-container > .field-error-message",
    userName:
      ":nth-child(2) > .row > .col-md-12 > .fv-plugins-message-container > .field-error-message",
    email:
      ":nth-child(3) > .row > .col-md-12 > .fv-plugins-message-container > .field-error-message",
    mobile_number:
      ".col-12 > .fv-plugins-message-container > .field-error-message",
  },
  validationMessages: {
    name: {
      required: "Name is required",
      noSpecialCharacters: "Must not contain number or symbol",
    },
    userName: {
      required: "Username is required",
      noSpecialCharacters: "Must not contain any symbol",
    },
    email: { required: "Email is required", format: "Wrong email format" },
    mobile_number: { required: "Mobile No. is required" },
    password: { required: "Password is required" },
  },
  toastMessages: {
    invalidData: "The given data was invalid.",
    duplicateUsername: "Please use another username",
    duplicateEmail: "Please use another email",
    invalidCredentials: "The provided credentials are incorrect",
  },
};
