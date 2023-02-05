import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withQueryClient } from "../../../.storybook/decorators/withQueryClient";
import ProfilePage from "./index.page";
import { rest } from "msw";
import { user } from "../../../mocks/user";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default {
  title: "Pages/Profile",
  component: ProfilePage,
  decorators: [withQueryClient]
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Default = Template.bind({});
Default.args = {};

export const WithoutProfile = Template.bind({});
WithoutProfile.parameters = {
  msw: {
    handlers: [
      rest.get(`${SERVER_URL}/user`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ ...user, profile: undefined }));
      })
    ]
  }
};
