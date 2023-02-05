import { request } from "api/requests";

export interface CreateAlbumBody {
  name: string;
}

export const createAlbum = async (body: CreateAlbumBody) => {
  const response = await request.post(`/album/`, body);
  return response.data;
};
