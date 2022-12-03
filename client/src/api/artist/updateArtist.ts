import { request } from "@api/requests";

export interface UpdateArtistBody {
  nickname: string;
}

export const updateArtist = async (body: UpdateArtistBody) => {
  const response = await request.patch<string>(`/profile/`, body);
  return response.data;
};
