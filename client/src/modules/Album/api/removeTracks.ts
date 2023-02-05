import { request } from "api/requests";
import { ITrack } from "modules/Track";

interface RemoveTracksBody {
  id: number;
  tracks: ITrack[];
}

export const removeTracks = async ({ id, tracks }: RemoveTracksBody) => {
  const response = await request.patch<string>(`/album/${id}/remove-tracks`, tracks);
  return response.data;
};
