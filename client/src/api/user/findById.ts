import { request } from "@api/requests";
import { IUser } from "@typings/user/IUser";

export const findById = async (id: number) => {
  const response = await request.get<IUser>(`/user/${id}`);
  return response.data;
};
