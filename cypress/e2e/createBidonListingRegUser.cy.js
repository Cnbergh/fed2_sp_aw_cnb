describe("Create Bids on Listing for Registered Users", () => {
  beforeEach(() => {
    cy.login("first.last@stud.noroff.no", "UzI1NiIsInR5cCI");
  });

  it("should allow a registered user to see bids they made", () => {
    cy.visit("/my-bids");

    cy.contains("My Bids");
    cy.get(".bid-item").should("have.length.at.least", 1);
  });
});
