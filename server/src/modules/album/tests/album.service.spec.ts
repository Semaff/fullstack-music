import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { AlbumService } from "../album.service";
import { Album } from "../entities/album.entity";
import { albums, createAlbumDto, updateAlbumDto } from "./helpers/album";
import { ALBUM_REPOSITORY_TOKEN, ServiceMetadata } from "./helpers/metadata/service.metadata";
import { tracks } from "./helpers/track";
import { user } from "./helpers/user";

describe("albumService", () => {
  let service: AlbumService;
  let albumRepository: Repository<Album>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ServiceMetadata).compile();

    service = module.get(AlbumService);
    albumRepository = module.get(ALBUM_REPOSITORY_TOKEN);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("albumRepository should be defined", () => {
    expect(albumRepository).toBeDefined();
  });

  /*
    Create
    ==============
  */
  describe("Create", () => {
    it("Should return album", async () => {
      expect(await service.create(createAlbumDto, user.id)).toStrictEqual(albums[0]);
    });
  });

  /*
    Add Tracks
    ==============
  */
  describe("Add tracks", () => {
    it("Should return album with new tracks", async () => {
      expect(await service.addTracks(albums[0].id, tracks)).toStrictEqual(albums[0]);
    });
  });

  /*
    Remove Tracks
    ===============
  */
  describe("Remove tracks", () => {
    it("Should return album with filtered tracks", async () => {
      expect(await service.removeTracks(albums[0].id, tracks)).toStrictEqual(albums[0]);
    });
  });

  /*
    Find My Albums
    ====================
  */
  describe("findMyAlbums", () => {
    it("Should find album", async () => {
      expect(await service.findMyAlbums(albums[0].user.id)).toStrictEqual(albums);
    });

    it("Should return empty array if album wasn't found", async () => {
      expect(await service.findMyAlbums(undefined)).toStrictEqual([]);
    });
  });

  /*
    Find Album Owner
    =====================
  */
  describe("findAlbumOwner", () => {
    it("Should find album's owner", async () => {
      expect(await service.findAlbumOwner(albums[0].id)).toStrictEqual(albums[0].user);
    });
  });

  /*
    Find By Id
    ====================
  */
  describe("findById", () => {
    it("Should find album", async () => {
      expect(await service.findById(albums[0].id)).toStrictEqual(albums[0]);
    });

    it("Should return undefined if album wasn't found", async () => {
      expect(await service.findById(albums[3]?.id)).toStrictEqual(undefined);
    });
  });

  /*
    Find By Name
    ====================
  */
  describe("findByName", () => {
    it("Should find album", async () => {
      expect(await service.findByName(albums[0].name)).toStrictEqual(albums[0]);
    });

    it("Should return undefined if album wasn't found", async () => {
      expect(await service.findByName(albums[3]?.name)).toStrictEqual(undefined);
    });
  });

  /*
    Update
    =========
  */
  describe("update", () => {
    it("Should call the update method", async () => {
      expect(await service.update(albums[0].id, updateAlbumDto)).toStrictEqual(true);
      expect(albumRepository.update).toBeCalledTimes(1);
      expect(albumRepository.update).toBeCalledWith({ id: albums[0].id }, updateAlbumDto);
    });
  });

  /*
    Delete
    =========
  */
  describe("delete", () => {
    it("Should call the delete method", async () => {
      expect(await service.delete(albums[0].id)).toStrictEqual(true);
      expect(albumRepository.delete).toBeCalledTimes(1);
      expect(albumRepository.delete).toBeCalledWith({ id: albums[0].id });
    });
  });
});
