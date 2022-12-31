import { ITrack } from "@typings/tracks/ITrack";
import { IUser } from "@typings/user/IUser";

export interface IComment {
  id: number;
  text: string;
  user: IUser;
  track: ITrack;
  parent?: IComment;
  children: IComment[];
}
