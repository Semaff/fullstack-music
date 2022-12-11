import { request } from "@api/requests";
import { ITrack } from "@typings/tracks/ITrack";

interface AddTracksBody {
  id: number;
  tracks: ITrack[];
}

export const addTracks = async ({ id, tracks }: AddTracksBody) => {
  const response = await request.patch(`/album/${id}/add-tracks`, tracks);
  return response.data;
};
