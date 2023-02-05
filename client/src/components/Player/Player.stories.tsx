import React from "react";
import Player from "./Player";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TrackContextInitialValues } from "@contexts/TrackContext/TrackContextState";
import { rest } from "msw";
import { user } from "../../../../mocks/user";
import { tracks } from "../../../../mocks/tracks";
import { withTrackContext } from "../../../../.storybook/decorators/withTrackContext";
import { withQueryClient } from "../../../../.storybook/decorators/withQueryClient";

export default {
  title: "UI/Player",
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
  args: {
    "Track Context": { ...TrackContextInitialValues, track: tracks[0] }
  },
  decorators: [withTrackContext, withQueryClient]
} as ComponentMeta<typeof Player>;

const Template: ComponentStory<typeof Player> = (args) => <Player />;

export const Default = Template.bind({});
Default.args = {};
