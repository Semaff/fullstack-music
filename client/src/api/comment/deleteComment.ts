import { request } from "@api/requests";

export const deleteComment = async (id: number) => {
  const response = await request.post(`/comment/${id}`);
  return response.data;
};
