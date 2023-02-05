import { request } from "api/requests";
import { IUser } from "../../types";

export const logout = async () => {
  const response = await request.get<IUser>(`/user/logout`);
  return response.data;
};
