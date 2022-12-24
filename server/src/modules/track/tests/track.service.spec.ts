import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { HttpException } from "@nestjs/common";
import { TrackService } from "../track.service";
import { Track } from "../entities/track.entity";
import { ServiceMetadata, TRACK_REPOSITORY_TOKEN } from "./helpers/service.metadata";
import * as fs from "fs";
import { createTrackDto, tracks, updateTrackDto } from "./helpers/tracks";
import { Request } from "express";

describe("TrackService", () => {
  const mockedFile = {} as unknown as Express.Multer.File;
  const mockedRequest = { user: { id: 1 } } as unknown as Request;
  let service: TrackService;
  let trackRepository: Repository<Track>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ServiceMetadata).compile();

    service = module.get(TrackService);
    trackRepository = module.get(TRACK_REPOSITORY_TOKEN);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("trackRepository should be defined", () => {
    expect(trackRepository).toBeDefined();
  });

  /*
    Create
    ==============
  */
  describe("signup", () => {
    jest.spyOn(fs, "unlinkSync").mockImplementation(() => ({}));

    it("Should return track", async () => {
      expect(await service.create(createTrackDto, mockedFile, mockedRequest.user.id)).toStrictEqual(
        tracks[0]
      );
    });

    it("Should throw if track with that name exists", async () => {
      await expect(
        service.create({ ...createTrackDto, name: "Track1" }, mockedFile, mockedRequest.user.id)
      ).rejects.toThrowError(HttpException);
    });
  });

  /*
    Find By Id
    ==============
  */
  describe("findById", () => {
    it("Should return track", async () => {
      expect(await service.findById(tracks[0].id)).toStrictEqual(tracks[0]);
    });

    it("Should return undefined if track wasn't found", async () => {
      expect(await service.findById(tracks[3]?.id)).toStrictEqual(undefined);
    });
  });

  /*
    Find By Name
    ==============
  */
  describe("findByName", () => {
    it("Should find track", async () => {
      expect(await service.findByName(tracks[0].name)).toStrictEqual(tracks[0]);
    });

    it("Should return undefined if track wasn't found", async () => {
      expect(await service.findByName(tracks[3]?.name)).toStrictEqual(undefined);
    });
  });

  /*
    Find By User Id
    =================
  */
  describe("findByUserId", () => {
    it("Should find track", async () => {
      expect(await service.findByUserId(tracks[0].user.id)).toStrictEqual(tracks);
    });
  });

  /*
    Find Track Owner
    ====================
  */
  describe("findTrackOwner", () => {
    it("Should find track owner", async () => {
      expect(await service.findTrackOwner(tracks[0].id)).toStrictEqual(tracks[0].user);
    });

    it("Should return undefined if track wasn't found", async () => {
      expect(await service.findTrackOwner(tracks[3]?.id)).toStrictEqual(undefined);
    });
  });

  /*
    Search
    ====================
  */
  describe("search", () => {
    it("Should find tracks", async () => {
      expect(await service.search("Track")).toStrictEqual(tracks);
    });
  });

  /*
    Update
    =========
  */
  describe("update", () => {
    it("Should call the update method", async () => {
      expect(await service.update(tracks[0].id, updateTrackDto)).toStrictEqual(true);
      expect(trackRepository.update).toBeCalledTimes(1);
      expect(trackRepository.update).toBeCalledWith({ id: tracks[0].id }, updateTrackDto);
    });
  });

  /*
    Delete
    =========
  */
  describe("delete", () => {
    it("Should call the delete method", async () => {
      expect(await service.delete(tracks[0].id)).toStrictEqual(true);
      expect(trackRepository.delete).toBeCalledTimes(1);
      expect(trackRepository.delete).toBeCalledWith({ id: tracks[0].id });
    });
  });
});
