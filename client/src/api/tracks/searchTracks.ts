import { request } from "@api/requests";
import { ITrack } from "@typings/tracks/ITrack";
import { AxiosRequestHeaders } from "axios";

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
