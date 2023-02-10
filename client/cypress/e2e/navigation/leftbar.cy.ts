/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

import { user } from "../../../mocks/user";

describe("Leftbar Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    cy.intercept("GET", "http://localhost:5000/user", {
      statusCode: 200,
      body: user
    });
  });

  it("Should navigate to home page", () => {
    cy.findByText("Music").click();
    cy.url().should("equal", `http://localhost:3000/`);
  });

  it("Should navigate to playlists page", () => {
    cy.findByText("Playlists").click();
    cy.url().should("include", `playlist`);
  });

  it("Should navigate to profile page", () => {
    cy.findByText("My Profile").click();
    cy.url().should("include", `profile`);
  });

  it("Should navigate to albums page", () => {
    cy.findByText("Albums").click();
    cy.url().should("include", `album`);
  });

  it("Should navigate to upload page", () => {
    cy.findByText("Upload Music").click();
    cy.url().should("include", `upload`);
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
