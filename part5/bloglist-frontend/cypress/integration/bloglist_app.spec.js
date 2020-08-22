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

  it("5.17 Login form is shown", function () {
    cy.contains("Login");
    cy.contains("Username:");
    cy.contains("Password:");
  });

  it("5.18 fails with wrong credentials in red", function () {
    cy.get("#username").type("adamguy-wrong");
    cy.get("#password").type("adamguy-wrong");
    cy.get(".btn-submit").click();
    cy.contains("invalid username or password");
    cy.get(".warning").should("have.css", "border", "3px solid rgb(255, 0, 0)");
  });

  it("5.18 Succeeds with correct credentials", function () {
    cy.get("#username").type("adamguy");
    cy.get("#password").type("adamguy");
    cy.get(".btn-submit").click();
    cy.contains("Adam Test logged-in");
  });

  it("5.19 A blog can be created", function () {
    cy.get("#username").type("adamguy");
    cy.get("#password").type("adamguy");
    cy.get(".btn-submit").click();
    cy.contains("Adam Test logged-in");

    cy.contains("Add New Blog?").click();
    cy.get("#title").type("Using Cypress");
    cy.get("#author").type("Cypress");
    cy.get("#url").type("https://docs.cypress.io/");
    cy.contains("Add blog").click();
    cy.contains("new blog added!");
  });

  describe("5.20-5.21", function () {
    beforeEach(function () {
      cy.get("#username").type("adamguy");
      cy.get("#password").type("adamguy");
      cy.get(".btn-submit").click();
      cy.contains("Adam Test logged-in");

      cy.contains("Add New Blog?").click();
      cy.get("#title").type("Using Cypress");
      cy.get("#author").type("Cypress");
      cy.get("#url").type("https://docs.cypress.io/");
      cy.contains("Add blog").click();
    });

    it("5.20 A user can like a blog", function () {
      cy.contains("view").click();
      cy.contains("+").click();
      cy.contains("+").click();
      cy.contains("Likes: 2");
    });

    it("5.21 A user can delete a blog list they created", function () {
      cy.contains("view").click();
      cy.contains("Delete").click();
      cy.contains("BLOG DELETED");
    });

    it("5.21 A user can't delete a blog list they didn't created", function () {
      cy.contains("Logout").click();
      cy.get("#username").type("kitty");
      cy.get("#password").type("kitty");
      cy.get(".btn-submit").click();
      cy.contains("view").click();
      cy.contains("Delete").click();
      cy.contains("user id and token mismatch");
    });
  });

  it("5.22 The Blog list are ordered by likes", function () {
    cy.get("#username").type("kitty");
    cy.get("#password").type("kitty");
    cy.get(".btn-submit").click();

    cy.contains("Add New Blog?").click();
    cy.get("#title").type("Cats Are Using Cypress");
    cy.get("#author").type("Catpress");
    cy.get("#url").type("https://cats.cypress.io/");
    cy.contains("Add blog").click();

    cy.get("#title").type("Kats Are Using Cypress");
    cy.get("#author").type("Katpress");
    cy.get("#url").type("https://cats.kypress.io/");
    cy.contains("Add blog").click();

    cy.contains("Logout").click();

    cy.get("#username").type("adamguy");
    cy.get("#password").type("adamguy");
    cy.get(".btn-submit").click();
    cy.contains("Adam Test logged-in");

    cy.contains("Add New Blog?").click();
    cy.get("#title").type("Using Cypress");
    cy.get("#author").type("Cypress");
    cy.get("#url").type("https://docs.cypress.io/");
    cy.contains("Add blog").click();

    for (let i = 1; i < 4; i++) {
      cy.get(".blog-box")
        .eq(i - 1)
        .contains("view")
        .click();

      for (var t = 1; t < i; t++) {
        cy.get(".blog-box")
          .eq(i - 1)
          .contains("+")
          .click();
        cy.get(".blog-box")
          .eq(i - 1)
          .contains("+")
          .click();
      }
    }

    cy.contains("+").click();
    cy.contains("+").click();
    cy.contains("+").click();

    cy.visit("http://localhost:3000");

    for (let i = 1; i < 4; i++) {
      cy.get(".blog-box")
        .eq(i - 1)
        .contains("view")
        .click();
    }

    for (let i = 1; i < 4; i++) {
      cy.get(".blog-box")
        .eq(i - 1)
        .contains(`Likes: ${5 - i}`);
    }
  });
});
