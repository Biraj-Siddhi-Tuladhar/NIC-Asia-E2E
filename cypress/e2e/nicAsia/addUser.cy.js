const {
  usersFormSelectors,
  usersButtonSelectors,
  usersErrorSelectors,
  loginSelectors,
} = require("../../support/selectors");

//testing add user
describe("Test cases for Users section of NIC Asia Bank", () => {
  beforeEach(() => {
    cy.fixture("userManagement/users.json").as("user");
    cy.fixture("userLogin").as("loginUser");
    cy.visit("https://cms-nicasia.server247.info/");
    cy.get("@loginUser").then((user) => {
      cy.get(loginSelectors.email, { timeout: 10000 }).type(
        user.validUser.email
      );
      cy.get(loginSelectors.password, { timeout: 10000 }).type(
        user.validUser.password
      );
    });
    cy.get(usersButtonSelectors.loginUser).click();

    cy.intercept("GET", "/framework/api/get-dashboard-module").as(
      "getDashboardModule"
    );
    cy.wait("@getDashboardModule");

    cy.wait(3000); // Wait for 3 second after each test

    cy.get(':nth-child(6) > [data-cy="user-management-menu-link"]', {
      timeout: 10000,
    })
      .should("be.visible")
      .click();

    // Check if the "Users" menu item is visible after clicking
    cy.get('.hover > .menu-sub > :nth-child(2) > [data-cy="users-menu-item"]', {
      timeout: 10000,
    })
      .should("be.visible")
      .click();
    cy.get(usersButtonSelectors.addUser).should("exist").click();
  });

  //Add Users
  it("Submit Blank Form", () => {
    const errorMessages = [
      {
        selector: usersErrorSelectors.form.name,
        text: usersErrorSelectors.validationMessages.name.required,
      },
      {
        selector: usersErrorSelectors.form.userName,
        text: usersErrorSelectors.validationMessages.userName.required,
      },
      {
        selector: usersErrorSelectors.form.email,
        text: usersErrorSelectors.validationMessages.email.required,
      },
      {
        selector: usersErrorSelectors.form.mobile_number,
        text: usersErrorSelectors.validationMessages.mobile_number.required,
      },
    ];
    cy.get(".rs-modal-content").should("be.visible");
    cy.scrollTo("bottom");
    cy.get(usersFormSelectors.submitButton).click();
    errorMessages.forEach(({ selector, text }) => {
      cy.get(selector).should("have.text", text);
    });
  });

  //Name Field
  describe("Test cases for Name Field of Users section of NIC Asia Bank", () => {
    it("Validates Name field exceeding limits", () => {
      cy.get("@user").then((user) => {
        cy.get(usersFormSelectors.name).clear().type("a".repeat(101));
        cy.get(usersFormSelectors.userName).type(user.userData.userName);
        cy.get(usersFormSelectors.email).type(user.userData.email);
        cy.get(usersFormSelectors.mobile_number).type(
          user.userData.mobile_number
        );
        cy.get(usersFormSelectors.submitButton).click();
        cy.get(usersFormSelectors.toastMessage)
          .should("be.visible")
          .should("have.text", usersErrorSelectors.toastMessages.invalidData);
      });
    });

    it("Validates that special characters are not allowed in the Name field", () => {
      cy.get(usersFormSelectors.name).clear().type("@#$%^&*").blur();
      cy.get(usersErrorSelectors.name)
        .should("be.visible")
        .should(
          "have.text",
          usersErrorSelectors.validationMessages.name.noSpecialCharacters
        );
    });

    it("Validates that numeric values are not allowed in the Name field", () => {
      cy.get(usersFormSelectors.name).clear().type("123456").blur();
      cy.get(usersErrorSelectors.name)
        .should("be.visible")
        .should(
          "have.text",
          usersErrorSelectors.validationMessages.name.noSpecialCharacters
        );
    });
    // it.only("Validates that duplicate Name is not allowed", () => {
    //     cy.get('[data-cy="name-text-field"]')
    //       .clear()
    //       .type(user.existingUserData.name);
    //     cy.get('[data-cy="userName-text-field"]')
    //       .clear()
    //       .type(user.userData.userName);
    //     cy.get('[data-cy="email-text-field"]').clear().type(user.userData.email);
    //     cy.get('[data-cy="mobile_number-text-field"]')
    //       .clear()
    //       .type(user.userData.mobile_number);

    //     cy.get('[data-cy="modal-submit"]').click();

    //     cy.get(".Toastify__toast-body")
    //       .should("be.visible")
    //       .should("have.text", "Please use another Name");
    // });
  });

  //Username Field
  describe("Test cases for Username Field of Users section of NIC Asia Bank", () => {
    it("Validates username field exceeding limits", () => {
      cy.get("@user").then((user) => {
        cy.get(usersFormSelectors.name).clear().type("a".repeat(101));
        cy.get(usersFormSelectors.userName).type(user.userData.userName);
        cy.get(usersFormSelectors.email).type(user.userData.email);
        cy.get(usersFormSelectors.mobile_number).type(
          user.userData.mobile_number
        );
        cy.get(usersFormSelectors.submitButton).click();
        cy.get(usersFormSelectors.toastMessage)
          .should("be.visible")
          .should("have.text", usersErrorSelectors.toastMessages.invalidData);
      });
    });

    it("Validates that special characters are not allowed in the Username field", () => {
      cy.get(usersFormSelectors.userName).clear().type("@#$%^&*").blur();
      cy.get(usersErrorSelectors.form.userName)
        .should("be.visible")
        .should(
          "have.text",
          usersErrorSelectors.validationMessages.userName.noSpecialCharacters
        );
    });

    it("Validates that an empty Username field is not accepted", () => {
      cy.get(usersFormSelectors.userName).click();
      cy.get(usersFormSelectors.userName).blur();
      cy.get(usersErrorSelectors.form.userName)
        .should("be.visible")
        .should(
          "have.text",
          usersErrorSelectors.validationMessages.userName.required
        );
    });

    it("Validates that duplicate Username is not allowed", () => {
      cy.get("@user").then((user) => {
        cy.get(usersFormSelectors.name).clear().type(user.userData.name);
        cy.get(usersFormSelectors.userName)
          .clear()
          .type(user.existingUserData.userName);
        cy.get(usersFormSelectors.email).clear().type(user.userData.email);
        cy.get(usersFormSelectors.mobile_number)
          .clear()
          .type(user.userData.mobile_number);
        cy.get(usersFormSelectors.submitButton).click();
        cy.get(usersFormSelectors.toastMessage)
          .should("be.visible")
          .should(
            "have.text",
            usersErrorSelectors.toastMessages.duplicateUsername
          );
      });
    });
  });

  // Email Field
  describe("Test case for Email Field for Users section of NIC Asia Bank", () => {
    it("Validates that duplicate email address is not accepted", () => {
      cy.get("@user").then((user) => {
        cy.get(usersFormSelectors.name).clear().type(user.userData.name);
        cy.get(usersFormSelectors.userName)
          .clear()
          .type(user.userData.userName);
        cy.get(usersFormSelectors.email)
          .clear()
          .type(user.existingUserData.email);
        cy.get(usersFormSelectors.mobile_number)
          .clear()
          .type(user.userData.mobile_number);
        cy.get(usersFormSelectors.submitButton).click();
        cy.get(usersFormSelectors.toastMessage)
          .should("be.visible")
          .should(
            "have.text",
            usersErrorSelectors.toastMessages.duplicateEmail
          );
      });
    });
  });

  afterEach(() => {
    cy.wait(3000); // Wait for 3 second after each test
    cy.clearLocalStorage(); // Clear local storage
    cy.clearCookies(); // Clear cookies
  });
});
