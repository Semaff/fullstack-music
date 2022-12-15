import { request } from "@api/requests";
import { IAlbum } from "@typings/album/IAlbum";
import { AxiosRequestHeaders } from "axios";

export const findMyPlaylists = async (token?: string) => {
  const headers: Partial<AxiosRequestHeaders> = {};
  if (token && token.length > 0) {
    headers.cookie = `token=${token}`;
  }

  const response = await request.get<IAlbum[]>(`/playlist/`, {
    headers
  });
  return response.data;
};
