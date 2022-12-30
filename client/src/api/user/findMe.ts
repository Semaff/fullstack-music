import { request } from "@api/requests";
import { IUser } from "@typings/user/IUser";
import { AxiosRequestHeaders } from "axios";

export const findMe = async (token?: string) => {
  const headers: Partial<AxiosRequestHeaders> = {};
  if (token && token.length > 0) {
    headers.cookie = `token=${token}`;
  }

  const response = await request.get<IUser>(`/user`, {
    headers
  });
  return response.data;
};
