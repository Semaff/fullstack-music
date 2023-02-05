import { request } from "api/requests";
import { AxiosRequestHeaders } from "axios";
import { ITrack } from "../types";

export const searchTracks = async (token: string | undefined, search?: string) => {
  const headers: Partial<AxiosRequestHeaders> = {};
  if (token && token.length > 0) {
    headers.cookie = `token=${token}`;
  }

  const response = await request.get<ITrack[]>(`/track?search=${search}`, {
    headers
  });

  return response.data;
};
