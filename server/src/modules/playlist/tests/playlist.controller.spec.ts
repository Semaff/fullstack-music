import { Test, TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { PlaylistController } from "../playlist.controller";
import { ControllerMetadata } from "./helpers/controller.metadata";
import { createPlaylistDto, playlists, updatePlaylistDto } from "./helpers/playlist";
import { tracks } from "./helpers/track";

describe("playlistController", () => {
  const mockedRequest = { user: { id: 1 } } as unknown as Request;
  let controller: PlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ControllerMetadata).compile();
    controller = module.get<PlaylistController>(PlaylistController);
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
      const response = await controller.create(createPlaylistDto, mockedRequest);
      expect(response).toStrictEqual(playlists[0]);
    });
  });

  /*
    Add Tracks
    =============
  */
  describe("Add tracks endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.addTracks(playlists[0].id, tracks);
      expect(response).toStrictEqual({ ...playlists[0], tracks: [...playlists[0].tracks, tracks] });
    });
  });

  /*
    Remove Tracks
    ===============
  */
  describe("Remove tracks endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.removeTracks(playlists[0].id, tracks);
      expect(response).toStrictEqual({
        ...playlists[0],
        tracks: playlists[0].tracks.filter((el) => !!tracks.find((track) => track.id === el.id))
      });
    });
  });

  /*
    Find By Id
    ============
  */
  describe("Find By Id endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.findById(playlists[0].id);
      expect(response).toStrictEqual(playlists[0]);
    });
  });

  /*
    Find My Playlists
    =====================
  */
  describe("Find my playlists endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.findMyPlaylists(mockedRequest);
      expect(response).toStrictEqual(playlists);
    });
  });

  /*
    Update
    ========
  */
  describe("Update endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.update(playlists[0].id, updatePlaylistDto);
      expect(response).toStrictEqual({ ...playlists[0], ...updatePlaylistDto });
    });
  });

  /*
    Delete
    =========
  */
  describe("Delete endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.delete(playlists[0].id);
      expect(response).toStrictEqual({ deleted: true });
    });
  });
});
