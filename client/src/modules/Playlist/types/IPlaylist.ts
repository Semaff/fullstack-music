import { ITrack } from "modules/Track";
import { IUser } from "modules/User";

export interface IPlaylist {
  id: number;
  name: string;
  tracks: ITrack[];
  user: IUser;
}
