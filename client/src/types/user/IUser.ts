import { IProfile } from "@typings/profile/IProfile";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isMusician: boolean;
  group: unknown;
  profile: IProfile | null;
  tracks: unknown[];
  albums: unknown[];
  playlists: unknown[];
}
