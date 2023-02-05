import TrackPage from "./index.page";
import { cleanup, screen } from "@testing-library/react";
import { renderWithClient } from "../../../../helpers/renderWithClient";
import { act } from "react-dom/test-utils";
import { comments } from "../../../../mocks/comments";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: "1"
  })
}));

describe("Track [id]", () => {
  afterEach(cleanup);

  it("Renders a Track", async () => {
    await act(async () => {
      renderWithClient(<TrackPage />);
    });

    expect(screen.getByTestId(`track`)).toBeInTheDocument();
  });

  describe("Comment Form", () => {
    it("Renders successfully", async () => {
      await act(async () => {
        renderWithClient(<TrackPage />);
      });

      expect(screen.getByTestId(`comment-form`)).toBeInTheDocument();
    });
  });

  describe("Comments", () => {
    it("Renders successfully", async () => {
      await act(async () => {
        renderWithClient(<TrackPage />);
      });

      expect(screen.getByText(comments[2].text)).toBeInTheDocument();
    });
  });
});
