import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AlbumsPage from "./index.page";
import { withQueryClient } from "../../../.storybook/decorators/withQueryClient";
import { rest } from "msw";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default {
  title: "Pages/Album/List (Albums)",
  component: AlbumsPage,
  decorators: [withQueryClient]
} as ComponentMeta<typeof AlbumsPage>;

const Template: ComponentStory<typeof AlbumsPage> = () => <AlbumsPage />;

export const Default = Template.bind({});
Default.args = {};

export const Empty = Template.bind({});
Empty.parameters = {
  msw: {
    handlers: [
      rest.get(`${SERVER_URL}/album`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    ]
  }
};
