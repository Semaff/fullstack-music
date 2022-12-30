import Profile from "@pages/profile";
import { cleanup, screen } from "@testing-library/react";
import { renderWithClient } from "./helpers/renderWithClient";
import { user } from "./mocks/user";
import { server } from "../jest.setup";
import { rest } from "msw";
import { act } from "react-dom/test-utils";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

describe("Profile", () => {
  afterEach(cleanup);

  it("Renders a Typography with user's firstName and lastName", async () => {
    renderWithClient(<Profile />);
    expect(await screen.findByText(`${user.firstName} ${user.lastName}`)).toBeInTheDocument();
  });

  it("Renders a Typography with user's email", async () => {
    renderWithClient(<Profile />);
    expect(await screen.findByText(user.email)).toBeInTheDocument();
  });

  describe("Profile Form", () => {
    it("Renders successfully", async () => {
      renderWithClient(<Profile />);
      expect(await screen.findByTestId("profile-form")).toBeInTheDocument();
    });
  });

  describe("Artist Form", () => {
    it("Renders successfully", async () => {
      renderWithClient(<Profile />);
      expect(await screen.findByTestId("artist-form")).toBeInTheDocument();
    });

    it("Renders a Typography with specific text if user have a profile", async () => {
      await act(async () => {
        renderWithClient(<Profile />);
      });

      expect(screen.getByText("Update Nickname")).toBeInTheDocument();
      expect(screen.queryByText("Want to be an artist?")).not.toBeInTheDocument();
    });

    it("Renders a Typography with specific text if user don't have a profile", async () => {
      server.use(
        rest.get(`${SERVER_URL}/user`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ ...user, profile: undefined }));
        })
      );

      await act(async () => {
        renderWithClient(<Profile />);
      });

      expect(screen.getByText("Want to be an artist?")).toBeInTheDocument();
      expect(screen.queryByText("Update Nickname")).not.toBeInTheDocument();
    });
  });
});
