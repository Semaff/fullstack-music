import { request } from "@api/requests";
import { ITrack } from "@typings/tracks/ITrack";
import { AxiosRequestHeaders } from "axios";

export const findMyTracks = async (token?: string) => {
  const headers: Partial<AxiosRequestHeaders> = {};
  if (token && token.length > 0) {
    headers.cookie = `token=${token}`;
  }

  const response = await request.get<ITrack[]>(`/track/`, {
    headers
  });
  return response.data;
};
