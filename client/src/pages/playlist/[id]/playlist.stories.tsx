import React from "react";
import PlaylistPage from "./index.page";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withQueryClient } from "../../../../.storybook/decorators/withQueryClient";
import { rest } from "msw";
import { playlist } from "../../../../mocks/playlists";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default {
  title: "Pages/Playlist/Item (Playlist)",
  component: PlaylistPage,
  decorators: [withQueryClient]
} as ComponentMeta<typeof PlaylistPage>;

const Template: ComponentStory<typeof PlaylistPage> = () => <PlaylistPage />;

export const Default = Template.bind({});
Default.args = {};

export const Empty = Template.bind({});
Empty.parameters = {
  msw: {
    handlers: [
      rest.get(`${SERVER_URL}/playlist/:id`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(undefined));
      })
    ]
  }
};

export const WithoutTracks = Template.bind({});
WithoutTracks.parameters = {
  msw: {
    handlers: [
      rest.get(`${SERVER_URL}/playlist/:id`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ ...playlist, tracks: [] }));
      }),
      rest.get(`${SERVER_URL}/tracks/`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    ]
  }
};
