import { request } from "api/requests";
import { IAlbum } from "../types";
import { AxiosRequestHeaders } from "axios";

export const findMyAlbums = async (token?: string) => {
  const headers: Partial<AxiosRequestHeaders> = {};
  if (token && token.length > 0) {
    headers.cookie = `token=${token}`;
  }

  const response = await request.get<IAlbum[]>(`/album/`, {
    headers
  });
  return response.data;
};
