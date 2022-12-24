import { ModuleMetadata } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Track } from "../../entities/track.entity";
import { TrackService } from "../../track.service";
import { tracks } from "./tracks";

export const TRACK_REPOSITORY_TOKEN = getRepositoryToken(Track);

export const ServiceMetadata: ModuleMetadata = {
  providers: [
    TrackService,
    {
      provide: TRACK_REPOSITORY_TOKEN,
      useValue: {
        create: jest.fn(() => tracks[0]),
        save: jest.fn(() => tracks[0]),
        findOne: jest.fn(({ where: { id, name, user } }) =>
          tracks.find((el) => el.id === id || el.name === name || el.user.id === user?.id)
        ),
        find: jest.fn(() => tracks),
        update: jest.fn().mockReturnValue(true),
        delete: jest.fn().mockReturnValue(true)
      }
    }
  ]
};
