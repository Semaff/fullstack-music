import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import Router from "next/router";

jest.mock("next/router", () => ({
  push: jest.fn()
}));

describe("LeftbarHeader", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders successfully", () => {
    render(<Header />);
    const header = screen.getByTestId("leftbar-header");
    expect(header).toBeInTheDocument();
  });

  it("clicking on logo navigates to home", () => {
    render(<Header />);
    const logo = screen.getByText("Logo");
    fireEvent.click(logo);
    expect(Router.push).toHaveBeenCalledWith("/");
  });
});
