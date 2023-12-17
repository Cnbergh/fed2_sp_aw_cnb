describe("Login User Journey", () => {
  it("should login a user successfully", () => {
    cy.visit("/login");

    cy.get("input[name=email]").type("first.last@stud.noroff.no");
    cy.get("input[name=password]").type("UzI1NiIsInR5cCI{enter}");

    cy.url().should("include", "/dashboard");
    cy.contains("Logout");
  });
});
