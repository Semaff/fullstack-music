import SignUpPage from "./index.page";
import { cleanup, screen } from "@testing-library/react";
import { renderWithClient } from "../../../helpers/renderWithClient";

describe("SignIn", () => {
  afterEach(cleanup);

  it("Renders a Link to signin page", async () => {
    renderWithClient(<SignUpPage />);
    expect(await screen.findByText(`Already have an account? Sign In..`)).toBeInTheDocument();
  });

  describe("SignUp Form", () => {
    it("Renders successfully", async () => {
      renderWithClient(<SignUpPage />);
      expect(await screen.findByTestId("signup-form")).toBeInTheDocument();
    });
  });
});
