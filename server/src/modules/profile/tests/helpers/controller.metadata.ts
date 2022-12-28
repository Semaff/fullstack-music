import { ModuleMetadata } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/modules/auth/auth.service";
import { UpdateTrackDto } from "src/modules/track/dto/update-track.dto";
import { ProfileController } from "../../profile.controller";
import { ProfileService } from "../../profile.service";
import { profiles } from "./profile";

export const mockedToken = `randomtoken123`;

export const ControllerMetadata: ModuleMetadata = {
  controllers: [ProfileController],
  providers: [
    {
      provide: ProfileService,
      useValue: {
        create: jest.fn().mockImplementation(() => Promise.resolve(profiles[0])),

        findById: jest
          .fn()
          .mockImplementation((id: number) => Promise.resolve(profiles.find((el) => el.id === id))),

        update: jest
          .fn()
          .mockImplementation((id: number, updateDto: UpdateTrackDto) =>
            Promise.resolve({ ...profiles.find((el) => el.id === id), ...updateDto })
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
