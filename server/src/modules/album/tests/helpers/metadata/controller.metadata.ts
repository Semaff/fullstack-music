import { ModuleMetadata } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AlbumController } from "src/modules/album/album.controller";
import { AlbumService } from "src/modules/album/album.service";
import { UpdateAlbumDto } from "src/modules/album/dto/update-album.dto";
import { AuthService } from "src/modules/auth/auth.service";
import { ProfileService } from "src/modules/profile/profile.service";
import { Track } from "src/modules/track/entities/track.entity";
import { albums } from "../album";

export const mockedToken = `randomtoken123`;

export const ControllerMetadata: ModuleMetadata = {
  controllers: [AlbumController],
  providers: [
    {
      provide: AlbumService,
      useValue: {
        create: jest.fn().mockImplementation(() => Promise.resolve(albums[0])),

        addTracks: jest.fn().mockImplementation((id: number, tracks: Track[]) => {
          const album = albums.find((el) => el.id === id);
          return Promise.resolve({ ...album, tracks: [...album.tracks, tracks] });
        }),

        removeTracks: jest.fn().mockImplementation((id: number, tracks: Track[]) => {
          const album = albums.find((el) => el.id === id);
          return Promise.resolve({
            ...album,
            tracks: album.tracks.filter((el) => !!tracks.find((track) => track.id === el.id))
          });
        }),

        findById: jest
          .fn()
          .mockImplementation((id: number) => Promise.resolve(albums.find((el) => el.id === id))),

        findMyAlbums: jest
          .fn()
          .mockImplementation((userId: number) =>
            Promise.resolve(albums.filter((el) => el.user.id === userId))
          ),

        update: jest
          .fn()
          .mockImplementation((id: number, updateDto: UpdateAlbumDto) =>
            Promise.resolve({ ...albums.find((el) => el.id === id), ...updateDto })
          ),

        delete: jest.fn().mockResolvedValue({ deleted: true })
      }
    },
    {
      provide: ProfileService,
      useValue: jest.fn()
    },
    {
      provide: AuthService,
      useValue: jest.fn()
    },
    {
      provide: JwtService,
      useValue: jest.fn()
    }
  ]
};
