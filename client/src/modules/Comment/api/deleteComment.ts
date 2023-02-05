import { request } from "api/requests";

export const deleteComment = async (id: number) => {
  const response = await request.delete(`/comment/${id}`);
  return response.data;
};
