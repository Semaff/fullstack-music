import { render, screen, fireEvent } from "@testing-library/react";
import Router from "next/router";
import { ERoutes } from "types/routes/ERoutes";
import Upper from "./Upper";

describe("Upper component", () => {
  const setIsActive = jest.fn();
  const push = jest.spyOn(Router, "push").mockImplementation(jest.fn());

  it("should render a menu icon button and a logo", () => {
    render(<Upper setIsActive={setIsActive} />);
    const menuButton = screen.getByLabelText("leftbar-upper-btn");
    const logo = screen.getByText("Logo");

    expect(menuButton).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });

  it("should call setIsActive function when menu icon button is clicked", () => {
    render(<Upper setIsActive={setIsActive} />);
    const menuButton = screen.getByLabelText("leftbar-upper-btn");

    fireEvent.click(menuButton);
    expect(setIsActive).toHaveBeenCalledTimes(1);
    expect(setIsActive).toHaveBeenCalledWith(expect.any(Function));

    fireEvent.click(menuButton);
    expect(setIsActive).toHaveBeenCalledTimes(2);
    expect(setIsActive).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should call Router.push function when logo is clicked", () => {
    render(<Upper setIsActive={setIsActive} />);
    const logo = screen.getByText("Logo");

    fireEvent.click(logo);

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith(ERoutes.HOME);
  });
});
