import React, { useEffect } from "react";
import TimeRange from "./TimeRange";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import useTrackStore from "store/track";

export default {
  title: "Components/Player/TimeRange",
  component: TimeRange
} as ComponentMeta<typeof TimeRange>;

const Template: ComponentStory<typeof TimeRange> = (args) => {
  const { setDuration } = useTrackStore();

  useEffect(() => {
    setDuration(100);
  }, []);

  return <TimeRange {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  audio: new Audio()
};
