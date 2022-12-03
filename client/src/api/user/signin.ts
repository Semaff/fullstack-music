import { request } from "@api/requests";

export interface SignInBody {
  email: string;
  password: string;
}

export const signin = async (body: SignInBody) => {
  const response = await request.post<string>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/signin`,
    body
  );
  return response.data;
};
