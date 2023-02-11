import { rest } from "msw";
import { user } from "../../mocks/user";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const userHandlers = [
  rest.get(`${SERVER_URL}/user`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.patch(`${SERVER_URL}/user`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.get(`${SERVER_URL}/user/refresh`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  })
];
