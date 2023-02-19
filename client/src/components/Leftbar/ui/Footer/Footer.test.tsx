import { screen, fireEvent, waitFor } from "@testing-library/react";
import Footer from "./Footer";
import { ERoutes } from "types/routes/ERoutes";
import { renderWithClient } from "helpers/renderWithClient";
import Router from "next/router";

// Mock the logout function
jest.mock("modules/User", () => ({
  logout: jest.fn()
}));

describe("Footer component", () => {
  const push = jest.spyOn(Router, "push").mockImplementation(jest.fn());

  it("renders My Profile link and Logout button", () => {
    renderWithClient(<Footer />);

    const profileLink = screen.getByText("My Profile");
    expect(profileLink).toBeInTheDocument();

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    expect(logoutButton).toBeInTheDocument();
  });

  it("navigates to the user's profile when My Profile link is clicked", async () => {
    renderWithClient(<Footer />);

    const profileLink = screen.getByText("My Profile");
    fireEvent.click(profileLink);
  });

  it("calls logout function and redirects to sign in page when Logout button is clicked", async () => {
    renderWithClient(<Footer />);

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      // Should navigate to SignIn page
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith(ERoutes.SIGNIN);
    });
  });
});
