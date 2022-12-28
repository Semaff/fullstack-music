import { Test, TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { AlbumController } from "../album.controller";
import { albums, createAlbumDto, updateAlbumDto } from "./helpers/album";
import { ControllerMetadata } from "./helpers/metadata/controller.metadata";
import { tracks } from "./helpers/track";

describe("albumController", () => {
  const mockedRequest = { user: { id: 1 } } as unknown as Request;
  let controller: AlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ControllerMetadata).compile();
    controller = module.get<AlbumController>(AlbumController);
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
      const response = await controller.create(createAlbumDto, mockedRequest);
      expect(response).toStrictEqual(albums[0]);
    });
  });

  /*
    Add Tracks
    =============
  */
  describe("Add tracks endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.addTracks(albums[0].id, tracks);
      expect(response).toStrictEqual({ ...albums[0], tracks: [...albums[0].tracks, tracks] });
    });
  });

  /*
    Remove Tracks
    ===============
  */
  describe("Remove tracks endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.removeTracks(albums[0].id, tracks);
      expect(response).toStrictEqual({
        ...albums[0],
        tracks: albums[0].tracks.filter((el) => !!tracks.find((track) => track.id === el.id))
      });
    });
  });

  /*
    Find By Id
    ============
  */
  describe("Find By Id endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.findById(albums[0].id);
      expect(response).toStrictEqual(albums[0]);
    });
  });

  /*
    Find My albums
    =====================
  */
  describe("Find my albums endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.findMyAlbums(mockedRequest);
      expect(response).toStrictEqual(albums);
    });
  });

  /*
    Update
    ========
  */
  describe("Update endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.update(albums[0].id, updateAlbumDto);
      expect(response).toStrictEqual({ ...albums[0], ...updateAlbumDto });
    });
  });

  /*
    Delete
    =========
  */
  describe("Delete endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.delete(albums[0].id);
      expect(response).toStrictEqual({ deleted: true });
    });
  });
});
