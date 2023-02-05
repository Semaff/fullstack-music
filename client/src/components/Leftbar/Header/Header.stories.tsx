import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "./Header";

export default {
  title: "Components/Leftbar/Header",
  component: Header
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => {
  return <Header />;
};

export const Default = Template.bind({});
Default.args = {};
