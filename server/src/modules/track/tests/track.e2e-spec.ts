import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "src/app.module";
import * as cookieParser from "cookie-parser";
import { TrackService } from "../track.service";
import { AuthService } from "src/modules/auth/auth.service";
import { User } from "src/modules/auth/entities/user.entity";
import { ProfileService } from "src/modules/profile/profile.service";
import * as path from "path";
import { signUpDto } from "./helpers/user";
import { createProfileDto } from "./helpers/profile";
import { createTrackDto, staticPath, trackPath } from "./helpers/tracks";
import * as fs from "fs";
import { Track } from "../entities/track.entity";

describe("TrackController (e2e)", () => {
  let app: INestApplication;
  let trackService: TrackService;
  let authService: AuthService;
  let profileService: ProfileService;

  let token: string;
  let user: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    trackService = app.get(TrackService);
    authService = app.get(AuthService);
    profileService = app.get(ProfileService);

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();
  });

  beforeEach(async () => {
    token = await authService.signup(signUpDto);
    user = await authService.findByEmail(signUpDto.email);
    await profileService.create(user.id, createProfileDto);
  });

  afterEach(async () => {
    const track = await trackService.findByName(createTrackDto.name);
    const trackPath = path.resolve(staticPath, track?.file?.split("/").pop() || "unknown");

    await trackService.delete(track?.id);
    await authService.delete(user.id);
    if (fs.existsSync(trackPath)) {
      fs.unlinkSync(trackPath);
    }
  });

  afterAll(async () => {
    await app.close();
  });

  /*
    Create
    =========
  */
  describe("Create new tracks - POST /track/", () => {
    const CREATE_URL = `/track/`;

    it("Should create a new track", async () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .field("name", createTrackDto.name)
        .attach("track", trackPath)
        .expect(201)
        .then((res) => {
          const track = res.body;
          const filePath = path.resolve(staticPath, track.file.split("/").pop());
          expect(fs.readFileSync(filePath)).toBeDefined();
        });
    });

    it("Should throw 400 if track with that name already exists", async () => {
      const mockedFile = { filename: "abc" } as unknown as Express.Multer.File;
      await trackService.create({ name: createTrackDto.name }, mockedFile, user.id);

      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .field("name", createTrackDto.name)
        .attach("track", trackPath)
        .expect(400);
    });

    it("Should throw 400 if invalid name", () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .field("name", "tr")
        .attach("track", trackPath)
        .expect(400);
    });

    it("Should throw 400 if invalid file", () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .field("name", createTrackDto.name)
        .attach("track", "")
        .expect(400);
    });

    /*
      Bugs with supertest.. Doesn't work here
      ===========================================
    */
    it("Should throw 400 if user don't have a profile", async () => {
      await profileService.delete(user.id);
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .field("name", createTrackDto.name)
        .attach("track", trackPath)
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=`])
        .field("name", createTrackDto.name)
        .attach("track", trackPath)
        .expect(401);
    });
  });

  /*
    Find By Id
    ===================
  */
  describe("Find By Id - GET /track/:id", () => {
    const mockedFile = { filename: "abc" } as unknown as Express.Multer.File;
    let track: Track;

    beforeEach(async () => {
      await trackService.create({ name: createTrackDto.name }, mockedFile, user.id);
      track = await trackService.findByName(createTrackDto.name);
    });

    it("Should find track if Id is correct", async () => {
      const response = await request(app.getHttpServer())
        .get(`/track/${track.id}`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual({ ...track, comments: [] });
    });

    it("Should return empty object if track wasn't found", async () => {
      const response = await request(app.getHttpServer())
        .get(`/track/-1`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual({});
    });

    it("Should throw 401 if not authorized", async () => {
      return request(app.getHttpServer()).get(`/user/${user.id}`).expect(401);
    });
  });

  /*
    Find By User Id
    ===================
  */
  describe("Find By User Id - GET /track/my", () => {
    const mockedFile = { filename: "abc" } as unknown as Express.Multer.File;
    const FIND_BY_USER_ID_URL = "/track/my";
    let track: Track;

    beforeEach(async () => {
      await trackService.create({ name: createTrackDto.name }, mockedFile, user.id);
      track = await trackService.findByName(createTrackDto.name);
    });

    it("Should find tracks by token", async () => {
      return request(app.getHttpServer())
        .get(FIND_BY_USER_ID_URL)
        .set("Cookie", [`token=${token}`])
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual([track]);
        });
    });

    it("Should throw 401 if not authorized", async () => {
      return request(app.getHttpServer()).get(FIND_BY_USER_ID_URL).expect(401);
    });
  });

  /*
    Search
    =========
  */
  describe("Search - GET /track/", () => {
    const mockedFile = { filename: "abc" } as unknown as Express.Multer.File;
    const SEARCH_URL = "/track/";
    let track: Track;

    beforeEach(async () => {
      await trackService.create({ name: createTrackDto.name }, mockedFile, user.id);
      track = await trackService.findByName(createTrackDto.name);
    });

    it("Should find tracks by name", async () => {
      const response = await request(app.getHttpServer())
        .get(SEARCH_URL)
        .set("Cookie", [`token=${token}`])
        .query({ search: "trac" })
        .expect(200);
      const body = response.body;
      expect(body).toEqual([track]);
    });

    it("Should find all tracks if query wasn't provided", async () => {
      const response = await request(app.getHttpServer())
        .get(SEARCH_URL)
        .set("Cookie", [`token=${token}`])
        .query({ search: "" })
        .expect(200);
      const body = response.body;
      expect(body).toEqual([track]);
    });

    it("Should return empty array", async () => {
      const response = await request(app.getHttpServer())
        .get(SEARCH_URL)
        .set("Cookie", [`token=${token}`])
        .query({ search: "Track100" })
        .expect(200);
      const body = response.body;
      expect(body).toEqual([]);
    });

    it("Should throw 401 if not authorized", async () => {
      return request(app.getHttpServer()).get(SEARCH_URL).expect(401);
    });
  });

  /*
    Update
    ==========
  */
  describe("Update - PATCH /track/:id", () => {
    const mockedFile = { filename: "abc" } as unknown as Express.Multer.File;
    let track: Track;

    beforeEach(async () => {
      await trackService.create({ name: createTrackDto.name }, mockedFile, user.id);
      track = await trackService.findByName(createTrackDto.name);
    });

    it("Should update fields", async () => {
      const newName = "Truck112";
      await request(app.getHttpServer())
        .patch(`/track/${track.id}`)
        .set("Cookie", [`token=${token}`])
        .send({ name: newName })
        .expect(200);

      const changedTrack = await trackService.findByName(newName);
      expect(changedTrack).toEqual({ ...track, name: newName });

      const trackEl = await trackService.findByName(track.name);
      expect(trackEl).toBeNull();
    });

    it("Should throw 400 if incorrect name", () => {
      return request(app.getHttpServer())
        .patch(`/track/${track.id}`)
        .set("Cookie", [`token=${token}`])
        .send({ name: "tr" })
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).patch(`/track/${track.id}`).expect(401);
    });
  });

  /*
      Delete
      ==========
    */
  describe("Delete - DELETE /track/", () => {
    const mockedFile = { filename: "abc" } as unknown as Express.Multer.File;
    const DELETE_URL = "/user/";
    let track: Track;

    beforeEach(async () => {
      track = await trackService.create({ name: "Track" }, mockedFile, user.id);
    });

    it("Should delete track", async () => {
      await request(app.getHttpServer())
        .delete(DELETE_URL)
        .set("Cookie", [`token=${token}`])
        .expect(200);

      const trackEl = await trackService.findByName(track.name);
      expect(trackEl).toBeNull();
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).delete(DELETE_URL).expect(401);
    });
  });
});
