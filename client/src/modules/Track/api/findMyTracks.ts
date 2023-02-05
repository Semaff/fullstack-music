import { request } from "api/requests";
import { AxiosRequestHeaders } from "axios";
import { ITrack } from "../types";

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
