describe("Rating functionality", () => {
  it("user is able to rate a ski resort", () => {
    cy.visit("/Hemsedal");

    // Variable for storing the initial number of ratings
    let initialRatings;

    cy.get('[data-testid="ratings"]').invoke('text').then(text => {

      // Get the number of ratings and remove the parentheses
      initialRatings = parseInt(text.replace(/[()]/g, ''));

      // Give a rating
      cy.contains("Vurder destinasjon").click();
      cy.contains("1 Star").click();
      cy.contains("Send inn").click();
      
      // Check that the number of ratings has increased by one
      cy.get('[data-testid="ratings"]').should('have.text', `(${(initialRatings + 1).toString()})`);
    });
  });
});