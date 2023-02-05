import { request } from "api/requests";
import { ITrack } from "../types";

export const findById = async (id: number) => {
  const response = await request.get<ITrack>(`/track/${id}`);
  return response.data;
};
