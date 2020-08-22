describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user1 = {
      name: "Adam Test",
      username: "adamguy",
      password: "adamguy",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user1);
    const user2 = {
      name: "Zues Cat",
      username: "kitty",
      password: "kitty",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user2);
    cy.visit("http://localhost:3000");
  });

  it("Front page can be opened", function () {
    cy.contains("Blog List App");
  });

  it("5.17 Login form is shown", function () {
    cy.contains("Login");
    cy.contains("Username:");
    cy.contains("Password:");
  });

  describe("Login", function () {
    it("5.18 fails with wrong credentials in red", function () {
      cy.get("#username").type("adamguy-wrong");
      cy.get("#password").type("adamguy-wrong");
      cy.get(".btn-submit").click();
      cy.contains("invalid username or password");
      cy.get(".warning").should(
        "have.css",
        "border",
        "3px solid rgb(255, 0, 0)"
      );
    });

    it("5.18 Succeeds with correct credentials", function () {
      cy.get("#username").type("adamguy");
      cy.get("#password").type("adamguy");
      cy.get(".btn-submit").click();
      cy.contains("Adam Test logged-in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("adamguy");
      cy.get("#password").type("adamguy");
      cy.get(".btn-submit").click();
      cy.contains("Adam Test logged-in");
    });

    it("5.19 A blog can be created", function () {
      cy.contains("Add New Blog?").click();
      cy.get("#title").type("Using Cypress");
      cy.get("#author").type("Cypress");
      cy.get("#url").type("https://docs.cypress.io/");
      cy.contains("Add blog").click();
      //   cy.contains("new blog added!");
    });

    it("5.20 A user can like a blog", function () {
      // ...
    });

    it("5.21 A user can delete a blog list they created", function () {
      // ...
    });

    it("5.21 A user can't delete a blog list they didn't created", function () {
      // ...
    });

    it("5.22 The Blog list are ordered by likes", function () {
      // ...
    });
  });
});
