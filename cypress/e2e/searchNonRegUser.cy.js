describe("Search Through Listings for Non-Registered Users", () => {
  it("should allow a non-registered user to search listings", () => {
    cy.visit("/");

    cy.get("input[name=search]").type("item to search{enter}");

    cy.contains('Results for "item to search"');
  });
});
