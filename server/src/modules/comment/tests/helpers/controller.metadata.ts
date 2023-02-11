import { ModuleMetadata } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../../../auth/auth.service";
import { CommentController } from "../../comment.controller";
import { CommentService } from "../../comment.service";
import { UpdateCommentDto } from "../../dto/update-comment.dto";
import { comments } from "./comments";
import { QueryDto } from "../../dto/query.dto";

export const mockedToken = `randomtoken123`;

export const ControllerMetadata: ModuleMetadata = {
  controllers: [CommentController],
  providers: [
    {
      provide: CommentService,
      useValue: {
        create: jest.fn().mockImplementation(() => Promise.resolve(comments[0])),

        findById: jest
          .fn()
          .mockImplementation((id: number) => Promise.resolve(comments.find((el) => el.id === id))),

        findByTrack: jest
          .fn()
          .mockImplementation(({ trackId }: QueryDto) =>
            Promise.resolve(comments.filter((el) => el.track.id === trackId))
          ),

        update: jest
          .fn()
          .mockImplementation((id: number, updateDto: UpdateCommentDto) =>
            Promise.resolve({ ...comments.find((el) => el.id === id), ...updateDto })
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
