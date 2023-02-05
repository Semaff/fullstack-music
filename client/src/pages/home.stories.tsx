import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withQueryClient } from "../../.storybook/decorators/withQueryClient";
import HomePage from "./index.page";
import { rest } from "msw";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default {
  title: "Pages/Home",
  component: HomePage,
  decorators: [withQueryClient]
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = () => <HomePage />;

export const Default = Template.bind({});
Default.args = {};

export const WithoutTracks = Template.bind({});
WithoutTracks.parameters = {
  msw: {
    handlers: [
      rest.get(`${SERVER_URL}/track`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    ]
  }
};
