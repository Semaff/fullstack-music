import React, { useEffect } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Controller from "./Controller";
import useTrackStore from "store/track";

export default {
  title: "Components/Player/Controller",
  component: Controller
} as ComponentMeta<typeof Controller>;

export const Playing: ComponentStory<typeof Controller> = (args) => {
  const { setIsActive } = useTrackStore();

  useEffect(() => {
    setIsActive(true);
  }, []);

  return <Controller {...args} />;
};
Playing.args = { audio: new Audio() };

export const Paused: ComponentStory<typeof Controller> = (args) => {
  const { setIsActive } = useTrackStore();

  useEffect(() => {
    setIsActive(false);
  }, []);

  return <Controller {...args} />;
};
Paused.args = { audio: new Audio() };
