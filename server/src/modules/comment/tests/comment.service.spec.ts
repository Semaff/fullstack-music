import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { CommentService } from "../comment.service";
import { Comment } from "../entities/comment.entity";
import { COMMENT_REPOSITORY_TOKEN, ServiceMetadata } from "./helpers/service.metadata";
import { comments, createCommentDto, updateCommentDto } from "./helpers/comments";
import { user } from "./helpers/user";

describe("CommentService", () => {
  let service: CommentService;
  let commentRepository: Repository<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ServiceMetadata).compile();

    service = module.get(CommentService);
    commentRepository = module.get(COMMENT_REPOSITORY_TOKEN);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("commentRepository should be defined", () => {
    expect(commentRepository).toBeDefined();
  });

  /*
    Create
    ==============
  */
  describe("Create", () => {
    it("Should return Comment", async () => {
      expect(await service.create(createCommentDto, user.id)).toStrictEqual(comments[0]);
    });
  });

  /*
    Find By Id
    ==============
  */
  describe("findById", () => {
    it("Should return comment", async () => {
      expect(await service.findById(comments[0].id)).toStrictEqual(comments[0]);
    });

    it("Should return undefined if comment wasn't found", async () => {
      expect(await service.findById(comments[3]?.id)).toStrictEqual(undefined);
    });
  });

  /*
    Find By Name
    ==============
  */
  describe("findByName", () => {
    it("Should find comment", async () => {
      expect(await service.findByTrack({ trackId: comments[0].track.id })).toStrictEqual(comments);
    });

    it("Should return empty array if track wasn't found", async () => {
      expect(await service.findByTrack({ trackId: comments[3]?.track?.id })).toStrictEqual([]);
    });
  });

  /*
    Find Comment Owner
    =====================
  */
  describe("findCommentOwner", () => {
    it("Should find comment's owner", async () => {
      expect(await service.findCommentOwner(comments[0].id)).toStrictEqual(comments[0].user);
    });
  });

  /*
    Find Comment Parent
    ====================
  */
  describe("findCommentParent", () => {
    it("Should return null if parent doesn't exist", async () => {
      expect(await service.findCommentParent(comments[0].id)).toStrictEqual(null);
    });

    it("Should return parent", async () => {
      expect(await service.findCommentParent(comments[2].id)).toStrictEqual(comments[2].parent);
    });
  });

  /*
    Update
    =========
  */
  describe("update", () => {
    it("Should call the update method", async () => {
      expect(await service.update(comments[0].id, updateCommentDto)).toStrictEqual(true);
      expect(commentRepository.update).toBeCalledTimes(1);
      expect(commentRepository.update).toBeCalledWith({ id: comments[0].id }, updateCommentDto);
    });
  });

  /*
    Delete
    =========
  */
  describe("delete", () => {
    it("Should call the delete method", async () => {
      expect(await service.delete(comments[0].id)).toStrictEqual(true);
      expect(commentRepository.delete).toBeCalledTimes(1);
      expect(commentRepository.delete).toBeCalledWith({ id: comments[0].id });
    });
  });
});
