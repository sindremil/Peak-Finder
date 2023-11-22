describe("Search functionality", () => {
  it("suggestions should load and redirect user", () => {
    // Visit the homepage
    cy.visit("http://localhost:5173/project2");

    // Type in the search field
    cy.get('[aria-label="Søkefelt"]').type("Hemse");

    // Visit Hemsedal page
    cy.contains("Hemsedal").click();

    // Check that the URL is correct and the title displays the correct text
    cy.url().should("include", "/Hemsedal");
    cy.contains("Hemsedal").should("exist");
  });
});
