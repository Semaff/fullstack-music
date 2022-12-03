import { request } from "@api/requests";
import { IUser } from "@typings/user/IUser";
import { AxiosRequestHeaders } from "axios";

export const validate = async (token?: string) => {
  const headers: Partial<AxiosRequestHeaders> = {};
  if (token && token.length > 0) {
    headers.cookie = `token=${token}`;
  }

  const response = await request.get<IUser>(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/validate`, {
    headers
  });
  return response.data;
};
