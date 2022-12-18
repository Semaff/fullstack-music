import { ModuleMetadata } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthController } from "../../auth.controller";
import { AuthService } from "../../auth.service";
import { ChangePasswordDto } from "../../dto/change-password.dto";
import { UpdateDto } from "../../dto/update.dto";
import { mockedToken, users } from "./users";

export const ControllerMetadata: ModuleMetadata = {
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useValue: {
        signup: jest.fn().mockImplementation(() => Promise.resolve(mockedToken)),
        signin: jest.fn().mockImplementation(() => mockedToken),

        generateToken: jest.fn().mockImplementation(() => Promise.resolve(mockedToken)),

        findById: jest
          .fn()
          .mockImplementation((id: number) => Promise.resolve(users.find((el) => el.id === id))),

        findMe: jest.fn().mockImplementation(() => Promise.resolve(users[0])),

        update: jest
          .fn()
          .mockImplementation((id: number, updateDto: UpdateDto) =>
            Promise.resolve({ ...users.find((el) => el.id === id), ...updateDto })
          ),

        changePassword: jest
          .fn()
          .mockImplementation((id: number, changePasswordDto: ChangePasswordDto) =>
            Promise.resolve({ ...users.find((el) => el.id === id), ...changePasswordDto })
          ),

        delete: jest.fn().mockResolvedValue({ deleted: true })
      }
    },
    {
      provide: JwtService,
      useValue: {
        sign: jest.fn().mockResolvedValue(mockedToken)
      }
    }
  ]
};
