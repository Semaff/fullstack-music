import { request } from "@api/requests";

export interface CreateArtistBody {
  nickname: string;
}

export const createArtist = async (body: CreateArtistBody) => {
  const response = await request.post<string>(`/profile/`, body);
  return response.data;
};
