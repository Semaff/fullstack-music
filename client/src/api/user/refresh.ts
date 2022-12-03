import { request } from "@api/requests";
import { AxiosRequestHeaders } from "axios";

export const refresh = async (token?: string) => {
  const headers: Partial<AxiosRequestHeaders> = {};
  if (token && token.length > 0) {
    headers.cookie = `token=${token}`;
  }

  const response = await request.get<string>(`/user/refresh`, {
    headers
  });
  return response.data;
};
