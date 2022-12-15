import { request } from "@api/requests";

export interface CreatePlaylistBody {
  name: string;
}

export const createPlaylist = async (body: CreatePlaylistBody) => {
  const response = await request.post(`/playlist/`, body);
  return response.data;
};
