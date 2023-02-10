import PlaylistItemPage from "./index.page";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import { renderWithClient } from "../../../../helpers/renderWithClient";
import { act } from "react-dom/test-utils";
import { playlists } from "../../../../mocks/playlists";
import { tracks } from "../../../../mocks/tracks";
import { formatName } from "utils/formatName";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: "1"
  })
}));

describe("Playlist Item [id]", () => {
  afterEach(cleanup);

  it("Renders playlist name", async () => {
    await act(async () => {
      renderWithClient(<PlaylistItemPage />);
    });

    expect(screen.getByText(playlists[1].name)).toBeInTheDocument();
  });

  it("Renders playlist's amount of tracks", async () => {
    await act(async () => {
      renderWithClient(<PlaylistItemPage />);
    });

    expect(screen.getByTestId("playlist-length")).toHaveTextContent(
      `Amount of Tracks - ${playlists[1].tracks.length}`
    );
  });

  describe("Add/remove tracks", () => {
    it("Renders playlist tracks if button wasn't pressed", async () => {
      await act(async () => {
        renderWithClient(<PlaylistItemPage />);
      });

      for (const track of playlists[1].tracks) {
        expect(screen.getByText(formatName(track.name))).toBeInTheDocument();
      }
    });

    it("Renders my tracks if button is pressed", async () => {
      await act(async () => {
        renderWithClient(<PlaylistItemPage />);
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
