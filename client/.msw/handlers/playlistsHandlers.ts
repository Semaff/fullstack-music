import { rest } from "msw";
import { playlists } from "../../mocks/playlists";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const playlistsHandlers = [
  rest.get(`${SERVER_URL}/playlist`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(playlists));
  }),

  rest.get(`${SERVER_URL}/playlist/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(playlists[1]));
  })
];
