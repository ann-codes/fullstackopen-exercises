// logging in user
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("bloglist-token", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

// constant jwt token mismatch even though its not error
// Cypress.Commands.add("createBlog", ({ title, author, url }) => {
//   console.log(JSON.parse(localStorage.getItem("bloglist-token")).token);
//   cy.request({
//     url: "http://localhost:3001/api/blogs",
//     method: "POST",
//     body: { title, author, url },
//     headers: {
//       Authorization: `bearer ${
//         JSON.parse(localStorage.getItem("bloglist-token")).token
//       }`,
//     },
//   });
//   cy.visit("http://localhost:3000");
// });

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.contains("Add New Blog?").click();
  cy.get("#title").type(title);
  cy.get("#author").type(author);
  cy.get("#url").type(url);
  cy.contains("Add blog").click();
});
