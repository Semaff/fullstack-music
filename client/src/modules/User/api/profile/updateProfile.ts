import { request } from "api/requests";

export interface UpdateProfileBody {
  nickname: string;
}

export const updateProfile = async (body: UpdateProfileBody) => {
  const response = await request.patch<string>(`/profile/`, body);
  return response.data;
};
