import { request } from "@api/requests";
import { IAlbum } from "@typings/album/IAlbum";

export const findById = async (id: number) => {
  const response = await request.get<IAlbum>(`/playlist/${id}`);
  return response.data;
};
