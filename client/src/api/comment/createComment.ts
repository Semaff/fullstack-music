import { request } from "@api/requests";
import { IComment } from "@typings/comment/IComment";

export interface CreateCommentBody {
  text: string;
  trackId: number;
  parentId?: number;
}

export const createComment = async (body: CreateCommentBody) => {
  const response = await request.post<IComment>(`/comment/`, body);
  return response.data;
};
