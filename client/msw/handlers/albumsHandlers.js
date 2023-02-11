import { rest } from "msw";
import { albums } from "../../mocks/albums";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const albumsHandlers = [
  rest.get(`${SERVER_URL}/album`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(albums));
  }),

  rest.get(`${SERVER_URL}/album/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(albums[1]));
  })
];
