import React, { useEffect } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withQueryClient } from "@storybook/decorators/withQueryClient";
import { track } from "mocks/tracks";
import useTrackStore from "store/track";
import Player from "./Player";

export default {
  title: "Components/Player",
  component: Player,
  decorators: [withQueryClient]
} as ComponentMeta<typeof Player>;

export const Default: ComponentStory<typeof Player> = () => <Player />;

export const Playing: ComponentStory<typeof Player> = () => {
  const { setTrack, setDuration, setIsActive } = useTrackStore();

  useEffect(() => {
    setTrack(track);
    setIsActive(true);
    setDuration(100);
  }, []);

  return <Player />;
};

export const Paused: ComponentStory<typeof Player> = () => {
  const { setTrack, setDuration, setIsActive } = useTrackStore();

  useEffect(() => {
    setTrack(track);
    setIsActive(false);
    setDuration(100);
  }, []);

  return <Player />;
};
