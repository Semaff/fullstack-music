import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Custom404Page from "./index.page";

export default {
  title: "Pages/404",
  component: Custom404Page
} as ComponentMeta<typeof Custom404Page>;

const Template: ComponentStory<typeof Custom404Page> = () => <Custom404Page />;

export const Default = Template.bind({});
Default.args = {};
