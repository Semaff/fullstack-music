import { request } from "api/requests";
import { ITrack } from "../types";

export interface CreateTrackBody {
  name: string;
  file: File;
}

export const createTrack = async ({ file, name }: CreateTrackBody) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("track", file);
  const response = await request.post<ITrack[]>(`/track/`, formData);
  return response.data;
};
