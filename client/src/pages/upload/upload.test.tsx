import UploadPage from "./index.page";
import { cleanup, screen } from "@testing-library/react";
import { renderWithClient } from "../../../helpers/renderWithClient";

describe("Upload", () => {
  afterEach(cleanup);

  it("Renders a Typography that titles the page", async () => {
    renderWithClient(<UploadPage />);
    expect(await screen.findByText(`Upload your track`)).toBeInTheDocument();
  });

  describe("Track Form", () => {
    it("Renders successfully", async () => {
      renderWithClient(<UploadPage />);
      expect(await screen.findByTestId("track-form")).toBeInTheDocument();
    });
  });
});
