import { screen } from "@testing-library/react";
import { renderWithClient } from "helpers/renderWithClient";
import { user } from "mocks/user";
import Leftbar from "./Leftbar";

// const resizeWindow = (x: number, y: number) => {
//   window.innerWidth = x;
//   window.innerHeight = y;
//   window.dispatchEvent(new Event("resize"));
// };

describe("Leftbar component", () => {
  it("renders Upper, List, Header and Footer", () => {
    renderWithClient(<Leftbar user={user} />);

    expect(screen.getByTestId("leftbar-upper")).toBeInTheDocument();
    expect(screen.getByTestId("leftbar-list")).toBeInTheDocument();
    expect(screen.getByTestId("leftbar-header")).toBeInTheDocument();
    expect(screen.getByTestId("leftbar-footer")).toBeInTheDocument();
  });

  /* Can't figure it out - how to test in mobile sizes */
  // it("toggles the sidebar when clicking on the Upper component", () => {
  //   resizeWindow(420, 768);
  //   renderWithClient(<Leftbar user={user} />, {});

  //   const upperButton = screen.getByTestId("leftbar-upper");
  //   const leftbarContainer = screen.getByTestId("leftbar-container");

  //   // Sidebar is initially hidden
  //   expect(leftbarContainer).toHaveStyle("display: none");

  //   // Click on the Upper component to show the sidebar
  //   fireEvent.click(upperButton);
  //   expect(leftbarContainer).toHaveStyle("display: flex");

  //   // Click on the backdrop to hide the sidebar
  //   fireEvent.click(screen.getByTestId("leftbar-backdrop"));
  //   expect(leftbarContainer).toHaveStyle("display: none");
  // });
});
