import { IComment } from "@typings/comment/IComment";

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
  comments: IComment[];
}
