import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withQueryClient } from "../../../.storybook/decorators/withQueryClient";
import SignUpPage from "./index.page";

export default {
  title: "Pages/Auth/Sign Up",
  component: SignUpPage,
  decorators: [withQueryClient]
} as ComponentMeta<typeof SignUpPage>;

const Template: ComponentStory<typeof SignUpPage> = () => <SignUpPage />;

export const Default = Template.bind({});
Default.args = {};
