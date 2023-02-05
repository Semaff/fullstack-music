import { request } from "api/requests";

export interface SignInBody {
  email: string;
  password: string;
}

export const signin = async (body: SignInBody) => {
  const response = await request.post<string>(`/user/signin`, body);
  return response.data;
};
