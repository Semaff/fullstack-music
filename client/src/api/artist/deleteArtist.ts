import { request } from "@api/requests";

export const deleteArtist = async () => {
  const response = await request.delete<string>(`/profile/`);
  return response.data;
};
