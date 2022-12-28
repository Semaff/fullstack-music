import { ModuleMetadata } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Profile } from "../../entities/profile.entity";
import { ProfileService } from "../../profile.service";
import { profiles } from "./profile";

export const PROFILE_REPOSITORY_TOKEN = getRepositoryToken(Profile);

export const ServiceMetadata: ModuleMetadata = {
  providers: [
    ProfileService,
    {
      provide: PROFILE_REPOSITORY_TOKEN,
      useValue: {
        create: jest.fn(() => profiles[0]),
        save: jest.fn(() => profiles[0]),
        findOne: jest.fn(({ where: { id, nickname, user } }) =>
          profiles.find((el) => el.id === id || el.nickname === nickname || el.user.id === user?.id)
        ),
        find: jest.fn(({ where: { user } }) => profiles.filter((el) => el.user.id === user?.id)),
        update: jest.fn().mockReturnValue(true),
        delete: jest.fn().mockReturnValue(true)
      }
    }
  ]
};
