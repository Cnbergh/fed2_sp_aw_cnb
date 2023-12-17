describe("Add a Bid for Registered Users", () => {
  beforeEach(() => {
    cy.login("first.last@stud.noroff.no", "UzI1NiIsInR5cCI");
  });

  it("should allow a registered user to bid on a listing", () => {
    cy.visit("/listings/1");

    cy.get("input[name=bid_amount]").type("500");
    cy.contains("Place Bid").click();

    cy.contains("Your bid has been placed");
  });
});
