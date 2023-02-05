import { request } from "api/requests";
import { AxiosRequestHeaders } from "axios";
import { IUser } from "../../types";

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
