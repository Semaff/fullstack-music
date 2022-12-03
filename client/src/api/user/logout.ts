import { request } from "@api/requests";
import { IUser } from "@typings/user/IUser";

export const logout = async () => {
  const response = await request.get<IUser>(`/user/logout`);
  return response.data;
};
