import React, { useEffect } from "react";
import TimeRange from "./TimeRange";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import useTrackStore from "store/track";

interface TimeRangeArgs {
  duration: number;
  audio: HTMLAudioElement;
}

const audio = {} as HTMLAudioElement;

export default {
  title: "Components/Player/TimeRange",
  component: TimeRange,
  argTypes: {
    duration: { control: "number", min: 0, max: 1000, optional: true }
  },
  args: {
    audio,
    duration: 0
  }
} as ComponentMeta<typeof TimeRange>;

const Template: ComponentStory<any> = (args: TimeRangeArgs) => {
  const { setDuration } = useTrackStore((store) => ({
    setDuration: store.setDuration
  }));

  useEffect(() => {
    setDuration(args.duration || 0);
  }, [args.duration]);

  return <TimeRange {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
