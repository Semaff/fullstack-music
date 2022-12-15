import { request } from "@api/requests";

export const deletePlaylist = async (id: number) => {
  const response = await request.delete(`/playlist/${id}`);
  return response.data;
};
