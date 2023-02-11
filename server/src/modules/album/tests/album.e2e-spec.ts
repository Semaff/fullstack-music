import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "src/app.module";
import * as cookieParser from "cookie-parser";
import { AuthService } from "../../auth/auth.service";
import { User } from "../../auth/entities/user.entity";
import { signUpDto } from "./helpers/user";
import { createTrackDto } from "./helpers/track";
import { Track } from "../../track/entities/track.entity";
import { TrackService } from "../../track/track.service";
import { AlbumService } from "../album.service";
import { createAlbumDto, updateAlbumDto } from "./helpers/album";
import { Album } from "../entities/album.entity";
import { ProfileService } from "../../profile/profile.service";

describe("albumController (e2e)", () => {
  let app: INestApplication;
  let authService: AuthService;
  let albumService: AlbumService;
  let trackService: TrackService;
  let profileService: ProfileService;

  let token: string;
  let user: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = app.get(AuthService);
    albumService = app.get(AlbumService);
    trackService = app.get(TrackService);
    profileService = app.get(ProfileService);

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();
  });

  beforeAll(async () => {
    token = await authService.signup(signUpDto);
    user = await authService.findByEmail(signUpDto.email);
  });

  afterEach(async () => {
    const album = await albumService.findByName(createAlbumDto.name);
    await albumService.delete(album?.id);
  });

  afterAll(async () => {
    await app.close();
  });

  /*
    Create
    =========
  */
  describe("Create - POST /album/", () => {
    const CREATE_URL = `/album/`;

    beforeEach(async () => {
      await profileService.create(user.id, { nickname: "Bobik" });
    });

    afterEach(async () => {
      await profileService.delete(user.id);
    });

    it("Should create a new album", () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .send(createAlbumDto)
        .expect(201);
    });

    it("Should throw 400 if user don't have a profile", async () => {
      await profileService.delete(user.id);
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .send(createAlbumDto)
        .expect(400);
    });

    it("Should throw 400 if invalid name", async () => {
      await authService.signup(signUpDto);
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .send({ ...createAlbumDto, name: "ab" })
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=`])
        .send(createAlbumDto)
        .expect(401);
    });
  });

  /*
    Add Tracks
    ============
  */
  describe("Add Tracks - PATCH /album/:id", () => {
    const mockedFile = { filename: "abc" } as unknown as Express.Multer.File;
    let track: Track;
    let album: Album;

    beforeEach(async () => {
      album = await albumService.create(createAlbumDto, user.id);
      album = await albumService.findById(album.id);
      track = await trackService.create(createTrackDto, mockedFile, user.id);
    });

    afterEach(async () => {
      await trackService.delete(track.id);
    });

    it("Should add tracks", async () => {
      const res = await request(app.getHttpServer())
        .patch(`/album/${album.id}/add-tracks`)
        .set("Cookie", [`token=${token}`])
        .send([track])
        .expect(200);

      const albumEl = await albumService.findById(album.id);
      expect(res.body).toEqual(albumEl);
    });

    it("Should throw 400 if album doesn't exist", () => {
      return request(app.getHttpServer())
        .patch(`/album/-1/add-tracks`)
        .set("Cookie", [`token=${token}`])
        .send([track])
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer())
        .patch(`/album/${album.id}/add-tracks`)
        .set("Cookie", [`token=`])
        .send([track])
        .expect(401);
    });
  });

  /*
    Remove Tracks
    ===============
  */
  describe("Remove Tracks - PATCH /album/:id", () => {
    const mockedFile = { filename: "abc" } as unknown as Express.Multer.File;
    let track: Track;
    let album: Album;

    beforeEach(async () => {
      album = await albumService.create(createAlbumDto, user.id);
      album = await albumService.findById(album.id);
      track = await trackService.create(createTrackDto, mockedFile, user.id);
      await albumService.addTracks(album.id, [track]);
    });

    afterEach(async () => {
      await trackService.delete(track.id);
    });

    it("Should remove tracks from album", async () => {
      const res = await request(app.getHttpServer())
        .patch(`/album/${album.id}/remove-tracks/`)
        .set("Cookie", [`token=${token}`])
        .send([track])
        .expect(200);
      const albumEl = await albumService.findById(album.id);
      expect(res.body).toEqual(albumEl);
    });

    it("Should do nothing if tracks are not provided", async () => {
      const res = await request(app.getHttpServer())
        .patch(`/album/${album.id}/remove-tracks/`)
        .set("Cookie", [`token=${token}`])
        .send([])
        .expect(200);

      const albumEl = await albumService.findById(album.id);
      expect(res.body).toEqual(albumEl);
    });

    it("Should throw 400 if album doesn't exist", () => {
      return request(app.getHttpServer())
        .patch(`/album/-1/remove-tracks/`)
        .set("Cookie", [`token=${token}`])
        .send([])
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer())
        .patch(`/album/${album.id}/remove-tracks/`)
        .set("Cookie", [`token=`])
        .send([])
        .expect(401);
    });
  });

  /*
    Find By Id
    ===================
  */
  describe("Find By Id - GET /album/:id", () => {
    let album: Album;

    beforeEach(async () => {
      album = await albumService.create(createAlbumDto, user.id);
      album = await albumService.findById(album.id);
    });

    it("Should find album if Id is correct", async () => {
      const response = await request(app.getHttpServer())
        .get(`/album/${album.id}`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      expect(response.body).toEqual(album);
    });

    it("Should return empty object if album wasn't found", async () => {
      const response = await request(app.getHttpServer())
        .get(`/album/-1`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual({});
    });

    it("Should throw 401 if not authorized", async () => {
      return request(app.getHttpServer()).get(`/album/${album.id}`).expect(401);
    });
  });

  /*
    Find My albums
    ===================
  */
  describe("Find My albums - GET /album/", () => {
    const FIND_URL = `/album/`;
    let album: Album;

    beforeEach(async () => {
      album = await albumService.create(createAlbumDto, user.id);
      album = await albumService.findById(album.id);
    });

    it("Should find albums", async () => {
      const response = await request(app.getHttpServer())
        .get(FIND_URL)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual([album]);
    });

    it("Should throw 401 if not authorized", async () => {
      return request(app.getHttpServer()).get(FIND_URL).expect(401);
    });
  });

  /*
    Update
    ==========
  */
  describe("Update - PATCH /album/", () => {
    let album: Album;

    beforeEach(async () => {
      album = await albumService.create(createAlbumDto, user.id);
      album = await albumService.findById(album.id);
    });

    it("Should update fields", async () => {
      await request(app.getHttpServer())
        .patch(`/album/${album.id}`)
        .set("Cookie", [`token=${token}`])
        .send(updateAlbumDto)
        .expect(200);

      const changedalbum = await albumService.findById(album.id);
      expect(changedalbum).toEqual({ ...album, ...updateAlbumDto });
    });

    it("Should throw 400 if incorrect name", () => {
      return request(app.getHttpServer())
        .patch(`/album/${album.id}`)
        .set("Cookie", [`token=${token}`])
        .send({ ...updateAlbumDto, name: "ab" })
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).patch(`/album/${album.id}`).expect(401);
    });
  });

  /*
    Delete
    ==========
  */
  describe("Delete - DELETE /album/", () => {
    let album: Album;

    beforeEach(async () => {
      album = await albumService.create(createAlbumDto, user.id);
    });

    it("Should delete album", async () => {
      await request(app.getHttpServer())
        .delete(`/album/${album.id}`)
        .set("Cookie", [`token=${token}`])
        .expect(200);

      const albumEl = await albumService.findById(album.id);
      expect(albumEl).toBeNull();
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).delete(`/album/${album.id}`).expect(401);
    });
  });
});
