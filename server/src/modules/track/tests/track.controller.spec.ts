import { Test, TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { TrackController } from "../track.controller";
import { ControllerMetadata } from "./helpers/controller.metadata";
import { createTrackDto, tracks } from "./helpers/tracks";

describe("TrackController", () => {
  const mockedFile = {} as unknown as Express.Multer.File;
  const mockedRequest = { user: { id: 1 } } as unknown as Request;
  let controller: TrackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ControllerMetadata).compile();
    controller = module.get<TrackController>(TrackController);
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
      const response = await controller.create(mockedRequest, createTrackDto, mockedFile);
      expect(response).toStrictEqual(tracks[0]);
    });
  });

  /*
    Find By Id
    ============
  */
  describe("Find By Id endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.findById(tracks[0].id);
      expect(response).toStrictEqual(tracks[0]);
    });
  });

  /*
    Find By User Id
    =====================
  */
  describe("Find By User Id endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.findByUserId(mockedRequest);
      expect(response).toStrictEqual(tracks);
    });
  });

  /*
    Search
    ========
  */
  describe("Search endpoint", () => {
    it("should return array with 1 element", async () => {
      const response = await controller.search("Track1");
      expect(response).toStrictEqual([tracks[0]]);
    });

    it("should return array with all the elements", async () => {
      const response = await controller.search("Track");
      expect(response).toStrictEqual(tracks);
    });
  });

  /*
    Update
    ========
  */
  describe("Update endpoint", () => {
    it("should return a successful response", async () => {
      const newName = "Track10";
      const response = await controller.update(tracks[0].id, { name: newName });
      expect(response).toStrictEqual({ ...tracks[0], name: newName });
    });
  });

  /*
    Delete
    =========
  */
  describe("Delete endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.delete(tracks[0].id);
      expect(response).toStrictEqual({ deleted: true });
    });
  });
});
