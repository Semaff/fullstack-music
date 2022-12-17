import { request } from "@api/requests";
import { ITrack } from "@typings/tracks/ITrack";

export const findById = async (id: number) => {
  const response = await request.get<ITrack>(`/track/${id}`);
  return response.data;
};
