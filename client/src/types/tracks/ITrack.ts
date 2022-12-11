export interface ITrack {
  id: number;
  name: string;
  file: string;
  user: {
    firstName: string;
    lastName: string;
    profile: {
      nickname: string;
    };
  };
}
