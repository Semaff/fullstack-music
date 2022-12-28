import { ModuleMetadata } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/modules/auth/auth.service";
import { Track } from "src/modules/track/entities/track.entity";
import { UpdatePlaylistDto } from "../../dto/update-playlist.dto";
import { PlaylistController } from "../../playlist.controller";
import { PlaylistService } from "../../playlist.service";
import { playlists } from "./playlist";

export const mockedToken = `randomtoken123`;

export const ControllerMetadata: ModuleMetadata = {
  controllers: [PlaylistController],
  providers: [
    {
      provide: PlaylistService,
      useValue: {
        create: jest.fn().mockImplementation(() => Promise.resolve(playlists[0])),

        addTracks: jest.fn().mockImplementation((id: number, tracks: Track[]) => {
          const playlist = playlists.find((el) => el.id === id);
          return Promise.resolve({ ...playlist, tracks: [...playlist.tracks, tracks] });
        }),

        removeTracks: jest.fn().mockImplementation((id: number, tracks: Track[]) => {
          const playlist = playlists.find((el) => el.id === id);
          return Promise.resolve({
            ...playlist,
            tracks: playlist.tracks.filter((el) => !!tracks.find((track) => track.id === el.id))
          });
        }),

        findById: jest
          .fn()
          .mockImplementation((id: number) =>
            Promise.resolve(playlists.find((el) => el.id === id))
          ),

        findMyPlaylists: jest
          .fn()
          .mockImplementation((userId: number) =>
            Promise.resolve(playlists.filter((el) => el.user.id === userId))
          ),

        update: jest
          .fn()
          .mockImplementation((id: number, updateDto: UpdatePlaylistDto) =>
            Promise.resolve({ ...playlists.find((el) => el.id === id), ...updateDto })
          ),

        delete: jest.fn().mockResolvedValue({ deleted: true })
      }
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
