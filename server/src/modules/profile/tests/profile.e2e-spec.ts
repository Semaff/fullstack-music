import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "src/app.module";
import * as cookieParser from "cookie-parser";
import { AuthService } from "src/modules/auth/auth.service";
import { User } from "src/modules/auth/entities/user.entity";
import { signUpDto } from "./helpers/user";
import { ProfileService } from "../profile.service";
import { createProfileDto, updateProfileDto } from "./helpers/profile";
import { Profile } from "../entities/profile.entity";

describe("profileController (e2e)", () => {
  let app: INestApplication;
  let authService: AuthService;
  let profileService: ProfileService;

  let token: string;
  let user: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = app.get(AuthService);
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
    await profileService.delete(user.id);
  });

  afterAll(async () => {
    await app.close();
  });

  /*
    Create
    =========
  */
  describe("Create - POST /profile/", () => {
    const CREATE_URL = `/profile/`;

    it("Should create a new profile", () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .send(createProfileDto)
        .expect(201);
    });

    it("Should throw 400 if invalid nickname", async () => {
      await authService.signup(signUpDto);
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .send({ ...createProfileDto, nickname: "ab" })
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=`])
        .send(createProfileDto)
        .expect(401);
    });
  });

  /*
    Find By Id
    ===================
  */
  describe("Find By Id - GET /profile/:id", () => {
    let profile: Profile;

    beforeEach(async () => {
      profile = await profileService.create(user.id, createProfileDto);
      profile = await profileService.findById(profile.id);
    });

    it("Should find profile if Id is correct", async () => {
      const response = await request(app.getHttpServer())
        .get(`/profile/${profile.id}`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual(profile);
    });

    it("Should return empty object if profile wasn't found", async () => {
      const response = await request(app.getHttpServer())
        .get(`/profile/-1`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual({});
    });

    it("Should throw 401 if not authorized", async () => {
      return request(app.getHttpServer()).get(`/profile/${profile.id}`).expect(401);
    });
  });

  /*
    Update
    ==========
  */
  describe("Update - PATCH /profile/", () => {
    const UPDATE_PROFILE_URL = "/profile/";
    let profile: Profile;

    beforeEach(async () => {
      profile = await profileService.create(user.id, createProfileDto);
      profile = await profileService.findById(profile.id);
    });

    it("Should update fields", async () => {
      await request(app.getHttpServer())
        .patch(UPDATE_PROFILE_URL)
        .set("Cookie", [`token=${token}`])
        .send(updateProfileDto)
        .expect(200);

      const changedProfile = await profileService.findById(profile.id);
      expect(changedProfile).toEqual({ ...profile, ...updateProfileDto });
    });

    it("Should throw 400 if incorrect nickname", () => {
      return request(app.getHttpServer())
        .patch(UPDATE_PROFILE_URL)
        .set("Cookie", [`token=${token}`])
        .send({ ...updateProfileDto, nickname: "ab" })
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).patch(UPDATE_PROFILE_URL).expect(401);
    });
  });

  /*
    Delete
    ==========
  */
  describe("Delete - DELETE /profile/", () => {
    const DELETE_PROFILE_URL = "/profile/";
    let profile: Profile;

    beforeEach(async () => {
      profile = await profileService.create(user.id, createProfileDto);
    });

    it("Should delete profile", async () => {
      await request(app.getHttpServer())
        .delete(DELETE_PROFILE_URL)
        .set("Cookie", [`token=${token}`])
        .expect(200);

      const profileEl = await profileService.findById(profile.id);
      expect(profileEl).toBeNull();
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).delete(DELETE_PROFILE_URL).expect(401);
    });
  });
});
