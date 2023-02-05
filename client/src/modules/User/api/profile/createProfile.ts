import { request } from "api/requests";

export interface CreateProfileBody {
  nickname: string;
}

export const createProfile = async (body: CreateProfileBody) => {
  const response = await request.post<string>(`/profile/`, body);
  return response.data;
};
