import { Test, TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { ProfileController } from "../profile.controller";
import { ControllerMetadata } from "./helpers/controller.metadata";
import { createProfileDto, profiles, updateProfileDto } from "./helpers/profile";

describe("profileController", () => {
  const mockedRequest = { user: { id: 1 } } as unknown as Request;
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ControllerMetadata).compile();
    controller = module.get<ProfileController>(ProfileController);
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
      const response = await controller.create(mockedRequest, createProfileDto);
      expect(response).toStrictEqual(profiles[0]);
    });
  });

  /*
    Find By Id
    ============
  */
  describe("Find By Id endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.findById(profiles[0].id);
      expect(response).toStrictEqual(profiles[0]);
    });
  });

  /*
    Update
    ========
  */
  describe("Update endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.update(mockedRequest, updateProfileDto);
      expect(response).toStrictEqual({ ...profiles[0], ...updateProfileDto });
    });
  });

  /*
    Delete
    =========
  */
  describe("Delete endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.delete(mockedRequest);
      expect(response).toStrictEqual({ deleted: true });
    });
  });
});
