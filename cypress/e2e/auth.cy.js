describe("auth page", () => {
  it("passes", () => {
    // cy.visit('http://localhost:5173/')
    cy.visit("http://localhost:5173/login");
    cy.visit("http://localhost:5173/signup");
  });
});
