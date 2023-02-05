import React from "react";
import TimeRange from "./TimeRange";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withTrackContext } from "../../../../../.storybook/decorators/withTrackContext";

const audio = {} as HTMLAudioElement;

export default {
  title: "UI/Player/TimeRange",
  component: TimeRange,
  decorators: [withTrackContext],
  args: { audio }
} as ComponentMeta<typeof TimeRange>;

const Template: ComponentStory<typeof TimeRange> = ({ ...args }) => <TimeRange {...args} />;

export const Default = Template.bind({});
Default.args = {};
