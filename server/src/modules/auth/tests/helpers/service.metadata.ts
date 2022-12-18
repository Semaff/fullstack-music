import { ModuleMetadata } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthService } from "../../auth.service";
import { User } from "../../entities/user.entity";
import { mockedToken, users } from "./users";

export const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

export const ServiceMetadata: ModuleMetadata = {
  providers: [
    AuthService,
    {
      provide: USER_REPOSITORY_TOKEN,
      useValue: {
        create: jest.fn(() => users[0]),
        save: jest.fn(() => users[0]),
        findOne: jest.fn(({ where: { id, email } }) =>
          users.find((el) => el.id === id || el.email === email)
        ),
        find: jest.fn(() => users),
        update: jest.fn().mockReturnValue(true),
        delete: jest.fn().mockReturnValue(true)
      }
    },
    {
      provide: JwtService,
      useValue: {
        sign: jest.fn().mockResolvedValue(mockedToken),
        signAsync: jest.fn().mockResolvedValue(mockedToken)
      }
    }
  ]
};
