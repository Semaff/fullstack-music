/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

import { user } from "../../mocks/user";
import { tracks } from "../../mocks/tracks";

describe("Upload page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/upload");

    cy.intercept("GET", "http://localhost:5000/user", {
      statusCode: 200,
      body: user
    });
    cy.intercept("POST", "http://localhost:5000/track", {
      statusCode: 200,
      body: tracks
    });
  });

  it("Should upload track", () => {
    // Empty state
    cy.get("input[type=text]").should("not.exist");

    // Has file
    cy.get("input[type=file]").attachFile("rasputin.mp3");
    cy.get("input[type=text]").clear().type("rasputin");
    cy.findByText("rasputin.mp3");
    cy.findByText("Upload").click();

    // Empty state
    cy.get("input[type=text]").should("not.exist");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
