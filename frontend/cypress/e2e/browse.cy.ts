describe("Browse functionality", () => {
  it("countries should load and redirect user", () => {
    cy.visit("/");
    cy.get('[id="browseSelect"]').click();
    cy.contains("Frankrike").click();
  })

  it("user is able to load more results", () => {
    cy.visit("/results/Frankrike");

    // Variable for storing the initial number of cards
    let initialCardCount
    cy.get('[data-testid="DestinationCard"]').its('length').then(length => {

      // Get the number of cards
      initialCardCount = length;

      // Load more cards and assert that the number of cards increased by 9
      cy.contains("Last inn mer").click();
      cy.get('[data-testid="DestinationCard"]').its('length').should('equal', initialCardCount + 9);
    });
  });

  it("user is able to filter results", () => {
    cy.visit("/results/Frankrike");
    //TODO: Add filter test
  })
})