import { ModuleMetadata } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CommentService } from "../../comment.service";
import { Comment } from "../../entities/comment.entity";
import { comments } from "./comments";

export const COMMENT_REPOSITORY_TOKEN = getRepositoryToken(Comment);

export const ServiceMetadata: ModuleMetadata = {
  providers: [
    CommentService,
    {
      provide: COMMENT_REPOSITORY_TOKEN,
      useValue: {
        create: jest.fn(() => comments[0]),
        save: jest.fn(() => comments[0]),
        findOne: jest.fn(({ where: { id, text, track } }) =>
          comments.find((el) => el.id === id || el.text === text || el.track.id === track?.id)
        ),
        find: jest.fn(({ where: { track } }) => comments.filter((el) => el.track.id === track?.id)),
        update: jest.fn().mockReturnValue(true),
        delete: jest.fn().mockReturnValue(true)
      }
    }
  ]
};
