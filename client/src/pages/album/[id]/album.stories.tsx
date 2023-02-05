import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withQueryClient } from "../../../../.storybook/decorators/withQueryClient";
import AlbumPage from "./index.page";
import { rest } from "msw";
import { album } from "../../../../mocks/albums";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default {
  title: "Pages/Album/Item (Album)",
  component: AlbumPage,
  decorators: [withQueryClient]
} as ComponentMeta<typeof AlbumPage>;

const Template: ComponentStory<typeof AlbumPage> = () => <AlbumPage />;

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
      rest.get(`${SERVER_URL}/album/:id`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ ...album, tracks: [] }));
      }),
      rest.get(`${SERVER_URL}/tracks/`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    ]
  }
};
