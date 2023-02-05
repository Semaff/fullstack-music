import PlaylistPage from "./index.page";
import { cleanup, screen } from "@testing-library/react";
import { renderWithClient } from "../../../helpers/renderWithClient";
import { act } from "react-dom/test-utils";
import { playlists } from "../../../mocks/playlists";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: "1"
  })
}));

describe("Playlist", () => {
  afterEach(cleanup);

  it("Renders Playlists", async () => {
    await act(async () => {
      renderWithClient(<PlaylistPage />);
    });

    for (const playlist of playlists) {
      expect(screen.getByText(playlist.name)).toBeInTheDocument();
    }
  });

  describe("Playlist Form", () => {
    it("Renders successfully", async () => {
      await act(async () => {
        renderWithClient(<PlaylistPage />);
      });

      expect(screen.getByTestId(`playlist-form`)).toBeInTheDocument();
    });
  });
});
