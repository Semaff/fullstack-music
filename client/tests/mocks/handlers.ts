import { rest } from "msw";
import { albums } from "./albums";
import { playlists } from "./playlists";
import { tracks } from "./tracks";
import { user } from "./user";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const handlers = [
  /*
    Track
    ==========
  */
  rest.get(`${SERVER_URL}/track`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tracks));
  }),

  rest.get(`${SERVER_URL}/track/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tracks[1]));
  }),

  /*
    Playlist
    =========
  */
  rest.get(`${SERVER_URL}/playlist`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(playlists));
  }),

  rest.get(`${SERVER_URL}/playlist/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(playlists[1]));
  }),

  /*
    Album
    =========
  */
  rest.get(`${SERVER_URL}/album`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(albums));
  }),

  rest.get(`${SERVER_URL}/album/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(albums[1]));
  }),

  /*
    User
    ======
  */
  rest.get(`${SERVER_URL}/user`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.get(`${SERVER_URL}/user/refresh`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  })
];
