import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Controller from "./Controller";

const audio = {} as HTMLAudioElement;

export default {
  title: "Components/Player/Controller",
  component: Controller,
  args: { audio }
} as ComponentMeta<typeof Controller>;

const Template: ComponentStory<typeof Controller> = (args) => <Controller {...args} />;

export const Default = Template.bind({});
Default.args = {};
