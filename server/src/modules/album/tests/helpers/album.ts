import { CreateAlbumDto } from "../../dto/create-album.dto";
import { UpdateAlbumDto } from "../../dto/update-album.dto";
import { Album } from "../../entities/album.entity";
import { tracks } from "./track";
import { user } from "./user";

export const createAlbumDto: CreateAlbumDto = {
  name: "Hey"
};

export const updateAlbumDto: UpdateAlbumDto = {
  name: "Hey102"
};

export const albums: Album[] = [
  {
    id: 1,
    name: "Hey",
    tracks,
    user: user
  },
  {
    id: 2,
    name: "Hey2",
    tracks,
    user: user
  },
  {
    id: 3,
    name: "Hey3",
    tracks,
    user: user
  }
];
