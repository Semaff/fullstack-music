import { ITrack } from "modules/Track";
import { IUser } from "modules/User";

export interface IAlbum {
  id: number;
  name: string;
  tracks: ITrack[];
  user: IUser;
}
