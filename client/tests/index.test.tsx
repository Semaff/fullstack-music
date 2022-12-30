import Home from "@pages/index";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import { renderWithClient } from "./helpers/renderWithClient";
import { tracks } from "./mocks/tracks";

describe("Home", () => {
  afterEach(cleanup);

  it("Renders a search input", async () => {
    renderWithClient(<Home />);

    const searchInputText = "Some Track";
    const searchInput = screen.getByTestId("search-field");
    fireEvent.change(searchInput, { target: { value: searchInputText } });
    expect(screen.getByTestId("search-field")).toHaveValue(searchInputText);
  });

  it("Renders tracks", async () => {
    renderWithClient(<Home />);

    for (const track of tracks) {
      expect(await screen.findByText(track.name)).toBeInTheDocument();
    }
  });
});
