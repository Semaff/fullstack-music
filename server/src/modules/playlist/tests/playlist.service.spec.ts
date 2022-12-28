import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { Playlist } from "../entities/playlist.entity";
import { PlaylistService } from "../playlist.service";
import { createPlaylistDto, playlists, updatePlaylistDto } from "./helpers/playlist";
import { PLAYLIST_REPOSITORY_TOKEN, ServiceMetadata } from "./helpers/service.metadata";
import { tracks } from "./helpers/track";
import { user } from "./helpers/user";

describe("playlistService", () => {
  let service: PlaylistService;
  let playlistRepository: Repository<Playlist>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ServiceMetadata).compile();

    service = module.get(PlaylistService);
    playlistRepository = module.get(PLAYLIST_REPOSITORY_TOKEN);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("playlistRepository should be defined", () => {
    expect(playlistRepository).toBeDefined();
  });

  /*
    Create
    ==============
  */
  describe("Create", () => {
    it("Should return playlist", async () => {
      expect(await service.create(createPlaylistDto, user.id)).toStrictEqual(playlists[0]);
    });
  });

  /*
    Add Tracks
    ==============
  */
  describe("Add tracks", () => {
    it("Should return playlist with new tracks", async () => {
      expect(await service.addTracks(playlists[0].id, tracks)).toStrictEqual(playlists[0]);
    });
  });

  /*
    Remove Tracks
    ===============
  */
  describe("Remove tracks", () => {
    it("Should return playlist with filtered tracks", async () => {
      expect(await service.removeTracks(playlists[0].id, tracks)).toStrictEqual(playlists[0]);
    });
  });

  /*
    Find My Playlists
    ====================
  */
  describe("findByName", () => {
    it("Should find playlist", async () => {
      expect(await service.findMyPlaylists(playlists[0].user.id)).toStrictEqual(playlists);
    });

    it("Should return empty array if playlist wasn't found", async () => {
      expect(await service.findMyPlaylists(undefined)).toStrictEqual([]);
    });
  });

  /*
    Find Playlist Owner
    =====================
  */
  describe("findPlaylistOwner", () => {
    it("Should find playlist's owner", async () => {
      expect(await service.findPlaylistOwner(playlists[0].id)).toStrictEqual(playlists[0].user);
    });
  });

  /*
    Find By Id
    ====================
  */
  describe("findById", () => {
    it("Should find playlist", async () => {
      expect(await service.findById(playlists[0].id)).toStrictEqual(playlists[0]);
    });

    it("Should return undefined if playlist wasn't found", async () => {
      expect(await service.findById(playlists[3]?.id)).toStrictEqual(undefined);
    });
  });

  /*
    Find By Name
    ====================
  */
  describe("findByName", () => {
    it("Should find playlist", async () => {
      expect(await service.findByName(playlists[0].name)).toStrictEqual(playlists[0]);
    });

    it("Should return undefined if playlist wasn't found", async () => {
      expect(await service.findByName(playlists[3]?.name)).toStrictEqual(undefined);
    });
  });

  /*
    Update
    =========
  */
  describe("update", () => {
    it("Should call the update method", async () => {
      expect(await service.update(playlists[0].id, updatePlaylistDto)).toStrictEqual(true);
      expect(playlistRepository.update).toBeCalledTimes(1);
      expect(playlistRepository.update).toBeCalledWith({ id: playlists[0].id }, updatePlaylistDto);
    });
  });

  /*
    Delete
    =========
  */
  describe("delete", () => {
    it("Should call the delete method", async () => {
      expect(await service.delete(playlists[0].id)).toStrictEqual(true);
      expect(playlistRepository.delete).toBeCalledTimes(1);
      expect(playlistRepository.delete).toBeCalledWith({ id: playlists[0].id });
    });
  });
});
