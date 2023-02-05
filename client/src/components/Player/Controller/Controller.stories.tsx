import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Controller from "./Controller";
import { withTrackContext } from "../../../../.storybook/decorators/withTrackContext";

const audio = {} as HTMLAudioElement;

export default {
  title: "UI/Player/Controller",
  component: Controller,
  args: { audio },
  decorators: [withTrackContext]
} as ComponentMeta<typeof Controller>;

const Template: ComponentStory<typeof Controller> = (args) => <Controller {...args} />;

export const Default = Template.bind({});
Default.args = {};
