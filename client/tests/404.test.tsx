import { cleanup, screen } from "@testing-library/react";
import { renderWithClient } from "./helpers/renderWithClient";
import Custom404 from "@pages/404";

describe("Custom 404", () => {
  afterEach(cleanup);

  it("Renders a Typography that titles the page", async () => {
    renderWithClient(<Custom404 />);
    expect(await screen.findByText(`404 - Page Not Found`)).toBeInTheDocument();
  });
});
