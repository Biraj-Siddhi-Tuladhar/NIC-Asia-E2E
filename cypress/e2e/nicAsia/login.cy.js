import {
  loginSelectors,
  usersButtonSelectors,
  usersErrorSelectors,
  usersFormSelectors,
} from "../../support/selectors";

describe("Login test cases for NIC Asia Bank", () => {
  // Using beforeEach hook to set up common actions for each test
  beforeEach(() => {
    cy.fixture("userLogin").as("user"); // Load user data from fixture
    cy.visit("https://cms-nicasia.server247.info/"); // Visit the login page before each test
  });

  // Submit blank form
  it("Submit blank form", () => {
    cy.get(usersButtonSelectors.loginUser).click();
    cy.get(
      ".mb-6 > div.col-md-12 > .fv-plugins-message-container > .field-error-message"
    ).should(
      "have.text",
      usersErrorSelectors.validationMessages.email.required
    );
    cy.get(
      ".mb-2 > div.col-md-12 > .fv-plugins-message-container > .field-error-message"
    ).should(
      "have.text",
      usersErrorSelectors.validationMessages.password.required
    );
  });

  // Login with correct email but wrong password
  it("Login with correct email but wrong password", () => {
    cy.get("@user").then((user) => {
      cy.get(loginSelectors.email).type(user.validUser.email);
      cy.get(loginSelectors.password).type(user.invalidUser.password);
      cy.get(usersButtonSelectors.loginUser).click();
      cy.get(usersFormSelectors.toastMessage)
        .should("be.visible")
        .should(
          "have.text",
          usersErrorSelectors.toastMessages.invalidCredentials
        );
    });
  });

  // Login with invalid email
  it("Login with invalid email", () => {
    cy.get("@user").then((user) => {
      cy.get(loginSelectors.email).type(user.invalidUser.email);
      cy.get(loginSelectors.password).type(user.validUser.password);
      cy.get(usersButtonSelectors.loginUser).click();
      cy.get(usersErrorSelectors.name).should(
        "have.text",
        usersErrorSelectors.validationMessages.email.format
      );
    });
  });

  // Check if the password field type is 'password'
  it("Check password field type is password", () => {
    cy.get(loginSelectors.password).should("have.attr", "type", "password");
  });

  // Check password visibility toggle
  it("Check password visibility toggle", () => {
    cy.get(loginSelectors.password).type("#BuggyZone123#");
    cy.get(loginSelectors.passwordToggler).click();
    cy.get(loginSelectors.password).should("have.attr", "type", "text");
  });

  // Login to the dashboard with valid email and password
  it("Login to the dashboard having valid email and password", () => {
    cy.get("@user").then((user) => {
      cy.get(loginSelectors.email).then(($input) => {
        expect($input).to.be.visible;
        expect($input).to.have.class("form-control");
        cy.wrap($input).type(user.validUser.email);
      });
      cy.get(loginSelectors.password).then(($input) => {
        expect($input).to.be.visible;
        expect($input).to.have.class("form-control");
        cy.wrap($input).type(user.validUser.password);
      });
      cy.get(usersButtonSelectors.loginUser).then(($btn) => {
        expect($btn).to.be.visible;
        expect($btn.text()).to.include("Login");
        expect($btn).to.have.class("btn btn-lg w-100 mb-5");
        cy.wrap($btn).click();
      });
      cy.then(() => {
        cy.location("pathname").should("include", "/dashboard");
      });
    });
  });
  afterEach(() => {
    cy.wait(3000);
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
