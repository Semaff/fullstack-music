import { rest } from "msw";
import { profile } from "../../mocks/artist";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const artistHandlers = [
  rest.patch(`${SERVER_URL}/profile`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(profile));
  }),

  rest.post(`${SERVER_URL}/profile`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(profile));
  }),

  rest.delete(`${SERVER_URL}/profile`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(profile));
  })
];
