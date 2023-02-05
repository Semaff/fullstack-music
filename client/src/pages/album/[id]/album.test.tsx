import AlbumItemPage from "./index.page";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import { renderWithClient } from "../../../../helpers/renderWithClient";
import { act } from "react-dom/test-utils";
import { albums } from "../../../../mocks/albums";
import { formatName } from "@utils/formatName";
import { tracks } from "../../../../mocks/tracks";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: "1"
  })
}));

describe("Album Item [id]", () => {
  afterEach(cleanup);

  it("Renders album name", async () => {
    await act(async () => {
      renderWithClient(<AlbumItemPage />);
    });

    expect(screen.getByText(albums[1].name)).toBeInTheDocument();
  });

  it("Renders album's amount of tracks", async () => {
    await act(async () => {
      renderWithClient(<AlbumItemPage />);
    });

    expect(screen.getByText(`Amount of Tracks - ${albums[1].tracks.length}`));
  });

  describe("Add/remove tracks", () => {
    it("Renders album tracks if button wasn't pressed", async () => {
      await act(async () => {
        renderWithClient(<AlbumItemPage />);
      });

      for (const track of albums[1].tracks) {
        expect(screen.getByText(formatName(track.name))).toBeInTheDocument();
      }
    });

    it("Renders my tracks if button is pressed", async () => {
      await act(async () => {
        renderWithClient(<AlbumItemPage />);
      });

      await act(async () => {
        const btn = screen.getByTestId("edit-button");
        fireEvent.click(btn);
      });

      for (const track of tracks) {
        expect(screen.getByText(formatName(track.name))).toBeInTheDocument();
      }
    });
  });
});
