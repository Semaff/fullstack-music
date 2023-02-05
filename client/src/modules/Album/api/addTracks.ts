import { request } from "api/requests";
import { ITrack } from "modules/Track";

interface AddTracksBody {
  id: number;
  tracks: ITrack[];
}

export const addTracks = async ({ id, tracks }: AddTracksBody) => {
  const response = await request.patch(`/album/${id}/add-tracks`, tracks);
  return response.data;
};
