import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import VolumeRange from "./VolumeRange";
import { withTrackContext } from "../../../../../.storybook/decorators/withTrackContext";

const audio = {} as HTMLAudioElement;

export default {
  title: "UI/Player/VolumeRange",
  component: VolumeRange,
  args: { audio },
  decorators: [withTrackContext]
} as ComponentMeta<typeof VolumeRange>;

const Template: ComponentStory<typeof VolumeRange> = (args) => <VolumeRange {...args} />;

export const Default = Template.bind({});
Default.args = {};
