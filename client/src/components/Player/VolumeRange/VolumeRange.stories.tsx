import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import VolumeRange from "./VolumeRange";

const audio = {} as HTMLAudioElement;

export default {
  title: "Components/Player/VolumeRange",
  component: VolumeRange,
  args: { audio }
} as ComponentMeta<typeof VolumeRange>;

const Template: ComponentStory<typeof VolumeRange> = (args) => <VolumeRange {...args} />;

export const Default = Template.bind({});
Default.args = {};
