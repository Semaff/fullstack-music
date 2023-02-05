import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withQueryClient } from "../../../.storybook/decorators/withQueryClient";
import PlaylistsPage from "./index.page";
import { rest } from "msw";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default {
  title: "Pages/Playlist/List (Playlists)",
  component: PlaylistsPage,
  decorators: [withQueryClient]
} as ComponentMeta<typeof PlaylistsPage>;

const Template: ComponentStory<typeof PlaylistsPage> = () => <PlaylistsPage />;

export const Default = Template.bind({});
Default.args = {};

export const Empty = Template.bind({});
Empty.parameters = {
  msw: {
    handlers: [
      rest.get(`${SERVER_URL}/playlist`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    ]
  }
};
