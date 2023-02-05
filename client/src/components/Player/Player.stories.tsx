import React, { useEffect } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { rest } from "msw";
import { user } from "../../../mocks/user";
import { withQueryClient } from "../../../.storybook/decorators/withQueryClient";
import { track } from "../../../mocks/tracks";
import useTrackStore from "store/track";
import Player from "./Player";

interface PlayerArgs {
  withTrack: boolean;
  duration: number;
}

export default {
  title: "Components/Player",
  component: Player,
  parameters: {
    msw: {
      handlers: [
        rest.get(process.env.NEXT_PUBLIC_SERVER_URL + "/user", (req, res, ctx) => {
          return res(ctx.json(user));
        })
      ]
    }
  },
  argTypes: {
    withTrack: { control: "boolean" },
    duration: { control: "number", min: 0, max: 1000, optional: true }
  },
  args: {
    withTrack: true,
    duration: 0
  },
  decorators: [withQueryClient]
} as ComponentMeta<typeof Player>;

const Template: ComponentStory<any> = (args: PlayerArgs) => {
  const { setTrack, setDuration } = useTrackStore((store) => ({
    setTrack: store.setTrack,
    setDuration: store.setDuration
  }));

  useEffect(() => {
    setTrack(args.withTrack ? track : null);
    setDuration(args.duration || 0);
  }, [args.withTrack, args.duration]);

  return <Player />;
};

export const Default = Template.bind({});
Default.args = {};
