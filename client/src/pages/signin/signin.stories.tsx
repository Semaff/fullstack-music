import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withQueryClient } from "../../../.storybook/decorators/withQueryClient";
import SignInPage from "./index.page";

export default {
  title: "Pages/Auth/Sign In",
  component: SignInPage,
  decorators: [withQueryClient]
} as ComponentMeta<typeof SignInPage>;

const Template: ComponentStory<typeof SignInPage> = () => <SignInPage />;

export const Default = Template.bind({});
Default.args = {};
