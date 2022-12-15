import { ITrack } from "@typings/tracks/ITrack";
import { IUser } from "@typings/user/IUser";

export interface IPlaylist {
  id: number;
  name: string;
  tracks: ITrack[];
  user: IUser;
}
