import { request } from "api/requests";
import { IComment } from "../types";

export const findById = async (id: number) => {
  const response = await request.get<IComment>(`/comment/${id}`);
  return response.data;
};
