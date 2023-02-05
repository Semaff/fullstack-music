import { request } from "api/requests";

export const deleteAlbum = async (id: number) => {
  const response = await request.delete(`/album/${id}`);
  return response.data;
};
