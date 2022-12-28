import { ModuleMetadata } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Playlist } from "../../entities/playlist.entity";
import { PlaylistService } from "../../playlist.service";
import { playlists } from "./playlist";

export const PLAYLIST_REPOSITORY_TOKEN = getRepositoryToken(Playlist);

export const ServiceMetadata: ModuleMetadata = {
  providers: [
    PlaylistService,
    {
      provide: PLAYLIST_REPOSITORY_TOKEN,
      useValue: {
        create: jest.fn(() => playlists[0]),
        save: jest.fn(() => playlists[0]),
        findOne: jest.fn(({ where: { id, name, user } }) =>
          playlists.find((el) => el.id === id || el.name === name || el.user.id === user?.id)
        ),
        find: jest.fn(({ where: { user } }) => playlists.filter((el) => el.user.id === user?.id)),
        update: jest.fn().mockReturnValue(true),
        delete: jest.fn().mockReturnValue(true)
      }
    }
  ]
};
