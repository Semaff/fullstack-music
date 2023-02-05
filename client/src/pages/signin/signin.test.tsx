import SignInPage from "./index.page";
import { cleanup, screen } from "@testing-library/react";
import { renderWithClient } from "../../../helpers/renderWithClient";

describe("SignIn", () => {
  afterEach(cleanup);

  it("Renders a Link to signup page", async () => {
    renderWithClient(<SignInPage />);
    expect(await screen.findByText(`Don't have an account? Sign Up..`)).toBeInTheDocument();
  });

  describe("SignIn Form", () => {
    it("Renders successfully", async () => {
      renderWithClient(<SignInPage />);
      expect(await screen.findByTestId("signin-form")).toBeInTheDocument();
    });
  });
});
