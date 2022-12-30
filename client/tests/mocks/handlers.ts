import { rest } from "msw";
import { tracks } from "./tracks";
import { user } from "./user";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const handlers = [
  rest.get(`${SERVER_URL}/track`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tracks));
  }),

  rest.get(`${SERVER_URL}/user`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  })
];
