import { ModuleMetadata } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AlbumService } from "src/modules/album/album.service";
import { Album } from "src/modules/album/entities/album.entity";
import { albums } from "../album";

export const ALBUM_REPOSITORY_TOKEN = getRepositoryToken(Album);

export const ServiceMetadata: ModuleMetadata = {
  providers: [
    AlbumService,
    {
      provide: ALBUM_REPOSITORY_TOKEN,
      useValue: {
        create: jest.fn(() => albums[0]),
        save: jest.fn(() => albums[0]),
        findOne: jest.fn(({ where: { id, name, user } }) =>
          albums.find((el) => el.id === id || el.name === name || el.user.id === user?.id)
        ),
        find: jest.fn(({ where: { user } }) => albums.filter((el) => el.user.id === user?.id)),
        update: jest.fn().mockReturnValue(true),
        delete: jest.fn().mockReturnValue(true)
      }
    }
  ]
};
