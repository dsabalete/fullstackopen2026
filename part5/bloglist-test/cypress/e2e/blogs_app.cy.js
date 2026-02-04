describe("Blogs app", () => {
  beforeEach(function () {
    cy.request("POST", "/api/testing/reset");
    const user = {
      name: "Test User",
      username: "testuser",
      password: "testpassword",
    };
    cy.request("POST", "/api/users/", user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });
});
