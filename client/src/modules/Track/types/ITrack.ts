import { IComment } from "modules/Comment";
import { IUser } from "modules/User";

export interface ITrack {
  id: number;
  name: string;
  file: string;
  user: IUser;
  comments: IComment[];
}
