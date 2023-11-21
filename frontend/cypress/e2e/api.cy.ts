import {
  getDestinationQuery,
  giveRating,
  searchQuery,
} from "./testGraphqlOperations";

describe("API tests", () => {
  // Frontend project needs to be opened for coming e2e tests to work
  before(() => {
    cy.visit("http://localhost:5173/project2");
  });

  it("API should return the correct data for Hemsedal", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        query: getDestinationQuery,
        variables: {
          resort: "Hemsedal",
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("getDestination");

      const { getDestination } = response.body.data;
      expect(getDestination).to.have.property("Resort").to.equal("Hemsedal");
      expect(getDestination).to.have.property("Country").to.equal("Norge");
      expect(getDestination).to.have.property("LowestPoint").to.equal(620);
      expect(getDestination).to.have.property("HighestPoint").to.equal(1450);
      expect(getDestination).to.have.property("DayPassPriceAdult").to.equal(46);
      expect(getDestination).to.have.property("BeginnerSlope").to.equal(29);
      expect(getDestination).to.have.property("IntermediateSlope").to.equal(10);
      expect(getDestination).to.have.property("DifficultSlope").to.equal(4);
      expect(getDestination).to.have.property("Snowparks").to.equal(true);
      expect(getDestination).to.have.property("NightSki").to.equal(true);
      expect(getDestination).to.have.property("SurfaceLifts").to.equal(16);
      expect(getDestination).to.have.property("ChairLifts").to.equal(5);
      expect(getDestination).to.have.property("GondolaLifts").to.equal(0);
      expect(getDestination).to.have.property("Certified").to.equal(true);
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
        query: getDestinationQuery,
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
        query: getDestinationQuery,
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
        query: getDestinationQuery,
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

  it("API should return countries from database", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        query: `
          query Query {
            getCountries
          }
        `,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.data.getCountries).to.have.length(26);
    });
  });

  it("API should return resort based on searchterm", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        query: searchQuery,
        variables: {
          searchTerm: "Hems",
          maxResults: 1,
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.data.getDestinations[0].Resort).to.equal("Hemsedal");
    });
  });
});
