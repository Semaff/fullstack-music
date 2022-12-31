import AlbumPage from "@pages/album";
import { cleanup, screen } from "@testing-library/react";
import { renderWithClient } from "./helpers/renderWithClient";
import { act } from "react-dom/test-utils";
import { albums } from "./mocks/albums";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: "1"
  })
}));

describe("Album", () => {
  afterEach(cleanup);

  it("Renders Albums", async () => {
    await act(async () => {
      renderWithClient(<AlbumPage />);
    });

    for (const album of albums) {
      expect(screen.getByText(album.name)).toBeInTheDocument();
    }
  });

  describe("Album Form", () => {
    it("Renders successfully", async () => {
      await act(async () => {
        renderWithClient(<AlbumPage />);
      });

      expect(screen.getByTestId(`album-form`)).toBeInTheDocument();
    });
  });
});
