import { request } from "@api/requests";

export interface SignUpBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const signup = async (body: SignUpBody) => {
  const response = await request.post<string>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/signup`,
    body
  );
  return response.data;
};
