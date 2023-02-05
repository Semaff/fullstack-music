import Custom500 from "./index.page";
import { cleanup, screen } from "@testing-library/react";
import { renderWithClient } from "../../../helpers/renderWithClient";

describe("Custom 500", () => {
  afterEach(cleanup);

  it("Renders a Typography that titles the page", async () => {
    renderWithClient(<Custom500 />);
    expect(await screen.findByText(`500 - Internal server error`)).toBeInTheDocument();
  });
});
