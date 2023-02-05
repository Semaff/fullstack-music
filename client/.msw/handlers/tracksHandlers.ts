import { rest } from "msw";
import { tracks } from "../../mocks/tracks";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const tracksHandlers = [
  rest.get(`${SERVER_URL}/track`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tracks));
  }),

  rest.get(`${SERVER_URL}/track/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tracks[1]));
  })
];
