import { request } from "api/requests";
import { IAlbum } from "../types";

export const findById = async (id: number) => {
  const response = await request.get<IAlbum>(`/album/${id}`);
  return response.data;
};
