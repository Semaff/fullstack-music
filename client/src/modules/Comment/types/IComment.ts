import { ITrack } from "modules/Track";
import { IUser } from "modules/User";

export interface IComment {
  id: number;
  text: string;
  user: IUser;
  track: ITrack;
  parent?: IComment;
  children: IComment[];
}
