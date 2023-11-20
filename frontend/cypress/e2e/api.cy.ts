import { getDestination, giveRating } from "./testGraphqlOperations";

context("API tests", () => {
  it("API should return the correct data for Hemsedal", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        query: getDestination,
        variables: {
          resort: "Hemsedal",
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("getDestination");

      const { destination } = response.body.data;
      expect(destination).to.have.property("Resort").to.equal("Hemsedal");
      expect(destination).to.have.property("Country").to.equal("Norge");
      expect(destination).to.have.property("LowestPoint").to.equal(620);
      expect(destination).to.have.property("HighestPoint").to.equal(1450);
      expect(destination).to.have.property("DayPassPriceAdult").to.equal(46);
      expect(destination).to.have.property("BeginnerSlope").to.equal(29);
      expect(destination).to.have.property("IntermediateSlope").to.equal(10);
      expect(destination).to.have.property("DifficultSlope").to.equal(4);
      expect(destination).to.have.property("Snowparks").to.equal(true);
      expect(destination).to.have.property("NightSki").to.equal(true);
      expect(destination).to.have.property("SurfaceLifts").to.equal(16);
      expect(destination).to.have.property("ChairLifts").to.equal(5);
      expect(destination).to.have.property("GondolaLifts").to.equal(0);
      expect(destination).to.have.property("Certified").to.equal(true);
    });
  });

  it("API should return null for non-existing destination", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        query: getDestination,
        variables: {
          resort: "Mordor",
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("getDestination");
      expect(response.body.data.getDestination).to.equal(null);
    });
  });

  it("API should return error for incorrect user input (number instead of string)", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        query: getDestination,
        variables: {
          resort: 1,
        },
      },
    }).then((response) => {
      expect(response.body).to.have.property("errors");
      expect(response.body.errors[0].extensions.code).to.equal(
        "BAD_USER_INPUT",
      );
    });
  });

  it("API should alter database as expected when giving a rating", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        query: getDestination,
        variables: {
          resort: "Hemsedal",
        },
      },
    }).then((initialResponse) => {
      const amountOfRatings =
        initialResponse.body.data.getDestination.AmountOfRatings;
      const totalRating = initialResponse.body.data.getDestination.TotalRating;

      cy.request({
        method: "POST",
        url: "http://localhost:4000",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          query: giveRating,
          variables: {
            resort: "Hemsedal",
            rating: 5,
          },
        },
      }).then((finalResponse) => {
        expect(finalResponse.body.data.giveRating.AmountOfRatings).to.equal(
          amountOfRatings + 1,
        );
        expect(finalResponse.body.data.giveRating.TotalRating).to.equal(
          totalRating + 5,
        );
      });
    });
  });
});
