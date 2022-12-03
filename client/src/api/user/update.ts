import { request } from "@api/requests";

export interface ProfileUpdateBody {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export const update = async (body: ProfileUpdateBody) => {
  const response = await request.patch<string>(`/user/`, body);
  return response.data;
};
