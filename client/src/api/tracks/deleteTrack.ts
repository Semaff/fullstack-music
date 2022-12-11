import { request } from "@api/requests";
import { ITrack } from "@typings/tracks/ITrack";

export interface CreateTrackBody {
  id: number;
}

export const deleteTrack = async ({ id }: CreateTrackBody) => {
  const response = await request.delete<ITrack[]>(`/track/${id}`);
  return response.data;
};
