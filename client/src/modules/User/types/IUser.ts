import { IProfile } from "./IProfile";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profile?: IProfile;
}
