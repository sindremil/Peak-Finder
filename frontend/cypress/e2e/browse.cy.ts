describe("Browse functionality", () => {
  it("countries should load and redirect user", () => {
    cy.visit("/");
    cy.get('[id="browseSelect"]').click();
    cy.contains("Frankrike").click();
  });

  it("user is able to load more results", () => {
    cy.visit("/results/Frankrike");

    // Variable for storing the initial number of cards
    let initialCardCount;
    cy.get('[data-testid="DestinationCard"]')
      .its("length")
      .then((length) => {
        // Get the number of cards
        initialCardCount = length;

        // Load more cards and assert that the number of cards increased by 9
        cy.contains("Last inn mer").click();
        cy.get('[data-testid="DestinationCard"]')
          .its("length")
          .should("equal", initialCardCount + 9);
      });
  });

  it("user is able to filter away results with less than 20 lifts", () => {
    cy.visit("/results/Norge");
    cy.contains("Filtrer").click();

    // Get the input for total lifts filter and type in 20
    cy.get('[data-testid="sliderInput"]').eq(3).type("20");
    cy.get("body").click();

    // For each card now visible, assert that the total lifts is greater than or equal to 20
    cy.get('[data-testid="DestinationCard"]').each((card) => {
      const totalLifts = parseInt(
        card
          .find('[data-testid="totalLifts"]')
          .text()
          .replace(/'heiser'/g, ""),
        10,
      );
      if (totalLifts < 20) {
        cy.wrap(card).should("not.exist");
      } else {
        cy.wrap(card).should("exist");
      }
    });
  });
});
