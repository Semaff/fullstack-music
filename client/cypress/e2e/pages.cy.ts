/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

import { NextResponse } from "next/dist/server/web/spec-extension/response";

describe("Navigation", () => {
  beforeEach(() => {
    // cy.intercept("GET", "user/refresh", {
    //   statusCode: 200
    // }).as("getToken");
    // cy.intercept("*", (req) => {
    //   /* do something with request and/or response */
    // }).as("getToken");
    // cy.wait("@getToken");
  });

  it("should navigate to the about page", () => {
    cy.visit("http://localhost:3000/");
    cy.get('a[href*="about"]').click();
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
