import { IComment } from "@typings/comment/IComment";
import { IUser } from "@typings/user/IUser";

export interface ITrack {
  id: number;
  name: string;
  file: string;
  user: IUser;
  comments: IComment[];
}
