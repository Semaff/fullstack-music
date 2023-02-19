import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import VolumeRange from "./VolumeRange";

export default {
  title: "Components/Player/VolumeRange",
  component: VolumeRange
} as ComponentMeta<typeof VolumeRange>;

const Template: ComponentStory<typeof VolumeRange> = (args) => <VolumeRange {...args} />;

export const Default = Template.bind({});
Default.args = {
  audio: new Audio()
};
