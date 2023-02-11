import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "src/app.module";
import * as cookieParser from "cookie-parser";
import { AuthService } from "../../auth/auth.service";
import { User } from "../../auth/entities/user.entity";
import { signUpDto } from "./helpers/user";
import { createTrackDto } from "./helpers/track";
import { PlaylistService } from "../playlist.service";
import { createPlaylistDto, updatePlaylistDto } from "./helpers/playlist";
import { Playlist } from "../entities/playlist.entity";
import { Track } from "../../track/entities/track.entity";
import { TrackService } from "../../track/track.service";

describe("playlistController (e2e)", () => {
  let app: INestApplication;
  let authService: AuthService;
  let playlistService: PlaylistService;
  let trackService: TrackService;

  let token: string;
  let user: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = app.get(AuthService);
    playlistService = app.get(PlaylistService);
    trackService = app.get(TrackService);

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();
  });

  beforeAll(async () => {
    token = await authService.signup(signUpDto);
    user = await authService.findByEmail(signUpDto.email);
  });

  afterEach(async () => {
    const playlist = await playlistService.findByName(createPlaylistDto.name);
    await playlistService.delete(playlist?.id);
  });

  afterAll(async () => {
    await app.close();
  });

  /*
    Create
    =========
  */
  describe("Create - POST /playlist/", () => {
    const CREATE_URL = `/playlist/`;

    it("Should create a new playlist", () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .send(createPlaylistDto)
        .expect(201);
    });

    it("Should throw 400 if invalid name", async () => {
      await authService.signup(signUpDto);
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .send({ ...createPlaylistDto, name: "ab" })
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=`])
        .send(createPlaylistDto)
        .expect(401);
    });
  });

  /*
    Add Tracks
    ============
  */
  describe("Add Tracks - PATCH /playlist/:id", () => {
    const mockedFile = { filename: "abc" } as unknown as Express.Multer.File;
    let track: Track;
    let playlist: Playlist;

    beforeEach(async () => {
      playlist = await playlistService.create(createPlaylistDto, user.id);
      playlist = await playlistService.findById(playlist.id);
      track = await trackService.create(createTrackDto, mockedFile, user.id);
    });

    afterEach(async () => {
      await trackService.delete(track.id);
    });

    it("Should add tracks", async () => {
      const res = await request(app.getHttpServer())
        .patch(`/playlist/${playlist.id}/add-tracks`)
        .set("Cookie", [`token=${token}`])
        .send([track])
        .expect(200);

      const playlistEl = await playlistService.findById(playlist.id);
      expect(res.body).toEqual(playlistEl);
    });

    it("Should throw 400 if playlist doesn't exist", () => {
      return request(app.getHttpServer())
        .patch(`/playlist/-1/add-tracks`)
        .set("Cookie", [`token=${token}`])
        .send([track])
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer())
        .patch(`/playlist/${playlist.id}/add-tracks`)
        .set("Cookie", [`token=`])
        .send([track])
        .expect(401);
    });
  });

  /*
    Remove Tracks
    ===============
  */
  describe("Remove Tracks - PATCH /playlist/:id", () => {
    const mockedFile = { filename: "abc" } as unknown as Express.Multer.File;
    let track: Track;
    let playlist: Playlist;

    beforeEach(async () => {
      playlist = await playlistService.create(createPlaylistDto, user.id);
      playlist = await playlistService.findById(playlist.id);
      track = await trackService.create(createTrackDto, mockedFile, user.id);
      await playlistService.addTracks(playlist.id, [track]);
    });

    afterEach(async () => {
      await trackService.delete(track.id);
    });

    it("Should remove tracks from playlist", async () => {
      const res = await request(app.getHttpServer())
        .patch(`/playlist/${playlist.id}/remove-tracks/`)
        .set("Cookie", [`token=${token}`])
        .send([track])
        .expect(200);
      const playlistEl = await playlistService.findById(playlist.id);
      expect(res.body).toEqual(playlistEl);
    });

    it("Should do nothing if tracks are not provided", async () => {
      const res = await request(app.getHttpServer())
        .patch(`/playlist/${playlist.id}/remove-tracks/`)
        .set("Cookie", [`token=${token}`])
        .send([])
        .expect(200);

      const playlistEl = await playlistService.findById(playlist.id);
      expect(res.body).toEqual(playlistEl);
    });

    it("Should throw 400 if playlist doesn't exist", () => {
      return request(app.getHttpServer())
        .patch(`/playlist/-1/remove-tracks/`)
        .set("Cookie", [`token=${token}`])
        .send([])
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer())
        .patch(`/playlist/${playlist.id}/remove-tracks/`)
        .set("Cookie", [`token=`])
        .send([])
        .expect(401);
    });
  });

  /*
    Find By Id
    ===================
  */
  describe("Find By Id - GET /playlist/:id", () => {
    let playlist: Playlist;

    beforeEach(async () => {
      playlist = await playlistService.create(createPlaylistDto, user.id);
      playlist = await playlistService.findById(playlist.id);
    });

    it("Should find playlist if Id is correct", async () => {
      const response = await request(app.getHttpServer())
        .get(`/playlist/${playlist.id}`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      expect(response.body).toEqual(playlist);
    });

    it("Should return empty object if playlist wasn't found", async () => {
      const response = await request(app.getHttpServer())
        .get(`/playlist/-1`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual({});
    });

    it("Should throw 401 if not authorized", async () => {
      return request(app.getHttpServer()).get(`/playlist/${playlist.id}`).expect(401);
    });
  });

  /*
    Find My Playlists
    ===================
  */
  describe("Find My Playlists - GET /playlist/", () => {
    const FIND_URL = `/playlist/`;
    let playlist: Playlist;

    beforeEach(async () => {
      playlist = await playlistService.create(createPlaylistDto, user.id);
      playlist = await playlistService.findById(playlist.id);
    });

    it("Should find playlists", async () => {
      const response = await request(app.getHttpServer())
        .get(FIND_URL)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual([playlist]);
    });

    it("Should throw 401 if not authorized", async () => {
      return request(app.getHttpServer()).get(FIND_URL).expect(401);
    });
  });

  /*
    Update
    ==========
  */
  describe("Update - PATCH /playlist/", () => {
    let playlist: Playlist;

    beforeEach(async () => {
      playlist = await playlistService.create(createPlaylistDto, user.id);
      playlist = await playlistService.findById(playlist.id);
    });

    it("Should update fields", async () => {
      await request(app.getHttpServer())
        .patch(`/playlist/${playlist.id}`)
        .set("Cookie", [`token=${token}`])
        .send(updatePlaylistDto)
        .expect(200);

      const changedPlaylist = await playlistService.findById(playlist.id);
      expect(changedPlaylist).toEqual({ ...playlist, ...updatePlaylistDto });
    });

    it("Should throw 400 if incorrect name", () => {
      return request(app.getHttpServer())
        .patch(`/playlist/${playlist.id}`)
        .set("Cookie", [`token=${token}`])
        .send({ ...updatePlaylistDto, name: "ab" })
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).patch(`/playlist/${playlist.id}`).expect(401);
    });
  });

  /*
    Delete
    ==========
  */
  describe("Delete - DELETE /playlist/", () => {
    let playlist: Playlist;

    beforeEach(async () => {
      playlist = await playlistService.create(createPlaylistDto, user.id);
    });

    it("Should delete playlist", async () => {
      await request(app.getHttpServer())
        .delete(`/playlist/${playlist.id}`)
        .set("Cookie", [`token=${token}`])
        .expect(200);

      const playlistEl = await playlistService.findById(playlist.id);
      expect(playlistEl).toBeNull();
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).delete(`/playlist/${playlist.id}`).expect(401);
    });
  });
});
