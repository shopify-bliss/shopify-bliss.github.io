describe("recovery page", () => {
  it("passes", () => {
    // cy.visit('http://localhost:5173/')
    cy.visit("https://shopify-bliss.vercel.app/recovery");
    cy.visit("https://shopify-bliss.vercel.app/reset-password");
  });
});
