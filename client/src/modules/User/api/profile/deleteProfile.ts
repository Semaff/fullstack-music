import { request } from "api/requests";

export const deleteProfile = async () => {
  const response = await request.delete<string>(`/profile/`);
  return response.data;
};
