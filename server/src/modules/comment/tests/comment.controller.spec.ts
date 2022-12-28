import { Test, TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { CommentController } from "../comment.controller";
import { comments, createCommentDto, updateCommentDto } from "./helpers/comments";
import { ControllerMetadata } from "./helpers/controller.metadata";

describe("CommentController", () => {
  const mockedRequest = { user: { id: 1 } } as unknown as Request;
  let controller: CommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ControllerMetadata).compile();
    controller = module.get<CommentController>(CommentController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  /*
    Create
    ===========
  */
  describe("Create endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.create(createCommentDto, mockedRequest);
      expect(response).toStrictEqual(comments[0]);
    });
  });

  /*
    Find By Id
    ============
  */
  describe("Find By Id endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.findById(comments[0].id);
      expect(response).toStrictEqual(comments[0]);
    });
  });

  /*
    Find By Track Id
    =====================
  */
  describe("Find By Track Id endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.findByTrackId({ trackId: comments[0].track.id });
      expect(response).toStrictEqual(comments);
    });
  });

  /*
    Update
    ========
  */
  describe("Update endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.update(comments[0].id, updateCommentDto);
      expect(response).toStrictEqual({ ...comments[0], ...updateCommentDto });
    });
  });

  /*
    Delete
    =========
  */
  describe("Delete endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.delete(comments[0].id);
      expect(response).toStrictEqual({ deleted: true });
    });
  });
});
