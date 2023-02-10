/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

import { user } from "../../mocks/user";
import { tracks } from "../../mocks/tracks";

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    cy.intercept("GET", "http://localhost:5000/user", {
      statusCode: 200,
      body: user
    });
    cy.intercept("GET", "http://localhost:5000/track?search=", {
      statusCode: 200,
      body: tracks
    });
    cy.intercept("GET", "http://localhost:5000/track?search=Track%201", {
      statusCode: 200,
      body: tracks.filter((el) => el.name.startsWith("Track 1"))
    });
  });

  it("Should have track list", () => {
    tracks.forEach((track) => cy.findByText(track.name));

    cy.findByTestId("search-field").type("Track 1");
    cy.findByText(tracks[0].name);
  });

  it("Should redirect to track page", () => {
    cy.findByText(tracks[0].name).click();
    cy.url().should("include", `track/${tracks[0].id}`);
  });

  it("Should open 'Player' component", () => {
    cy.findByTestId("search-field").type("Track 1");
    cy.findByTestId("play-btn").click();
    cy.findByTestId("player");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
