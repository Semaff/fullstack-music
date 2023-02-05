import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withQueryClient } from "../../../../.storybook/decorators/withQueryClient";
import TrackPage from "./index.page";
import { rest } from "msw";
import { track } from "../../../../mocks/tracks";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default {
  title: "Pages/Track/Item (Track)",
  component: TrackPage,
  decorators: [withQueryClient]
} as ComponentMeta<typeof TrackPage>;

const Template: ComponentStory<typeof TrackPage> = () => <TrackPage />;

export const Default = Template.bind({});
Default.args = {};

export const WithoutComments = Template.bind({});
WithoutComments.parameters = {
  msw: {
    handlers: [
      rest.get(`${SERVER_URL}/track/:id`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ ...track, comments: [] }));
      })
    ]
  }
};
