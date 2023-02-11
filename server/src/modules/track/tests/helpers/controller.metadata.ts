import { ModuleMetadata } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../../../auth/auth.service";
import { ProfileService } from "../../../profile/profile.service";
import { UpdateTrackDto } from "../../dto/update-track.dto";
import { TrackController } from "../../track.controller";
import { TrackService } from "../../track.service";
import { tracks } from "./tracks";

export const mockedToken = `randomtoken123`;

export const ControllerMetadata: ModuleMetadata = {
  controllers: [TrackController],
  providers: [
    {
      provide: TrackService,
      useValue: {
        create: jest.fn().mockImplementation(() => Promise.resolve(tracks[0])),

        findById: jest
          .fn()
          .mockImplementation((id: number) => Promise.resolve(tracks.find((el) => el.id === id))),

        findByUserId: jest
          .fn()
          .mockImplementation((userId: number) =>
            Promise.resolve(tracks.filter((el) => el.user.id === userId))
          ),

        search: jest
          .fn()
          .mockImplementation((search: string) =>
            Promise.resolve(tracks.filter((el) => el.name.startsWith(search)))
          ),

        update: jest
          .fn()
          .mockImplementation((id: number, updateDto: UpdateTrackDto) =>
            Promise.resolve({ ...tracks.find((el) => el.id === id), ...updateDto })
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
