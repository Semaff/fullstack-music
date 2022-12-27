import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { changePasswordDto, signInDto, signUpDto, updateDto } from "./helpers/users";
import { AppModule } from "src/app.module";
import { AuthService } from "../auth.service";
import * as cookieParser from "cookie-parser";
import { User } from "../entities/user.entity";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = app.get(AuthService);

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();
  });

  afterEach(async () => {
    const user = await authService.findByEmail(signUpDto.email);
    await authService.delete(user?.id);
  });

  afterAll(async () => {
    await app.close();
  });

  /*
    Sign Up
    =========
  */
  describe("Create new users - POST /user/signup", () => {
    const SIGN_UP_USER_URL = `/user/signup`;

    it("Should create a new user", () => {
      return request(app.getHttpServer()).post(SIGN_UP_USER_URL).send(signUpDto).expect(201);
    });

    it("Should throw 400 if email already exists", async () => {
      await authService.signup(signUpDto);
      return request(app.getHttpServer()).post(SIGN_UP_USER_URL).send(signUpDto).expect(400);
    });

    it("Should throw 400 if invalid firstName", () => {
      return request(app.getHttpServer())
        .post(SIGN_UP_USER_URL)
        .send({ ...signUpDto, firstName: "ab" })
        .expect(400);
    });

    it("Should throw 400 if invalid lastName", () => {
      return request(app.getHttpServer())
        .post(SIGN_UP_USER_URL)
        .send({ ...signUpDto, lastName: "ab" })
        .expect(400);
    });

    it("Should throw 400 if invalid password", () => {
      return request(app.getHttpServer())
        .post(SIGN_UP_USER_URL)
        .send({ ...signUpDto, password: "bobik!" })
        .expect(400);
    });

    it("Should throw 400 if invalid email", () => {
      return request(app.getHttpServer())
        .post(SIGN_UP_USER_URL)
        .send({ ...signUpDto, email: "bobik" })
        .expect(400);
    });
  });

  /*
    Sign In
    =========
  */
  describe("Signing In - POST /user/signin", () => {
    const SIGN_IN_USER_URL = `/user/signin`;

    beforeEach(async () => {
      await authService.signup({ ...signUpDto });
    });

    it("Should success", () => {
      return request(app.getHttpServer()).post(SIGN_IN_USER_URL).send(signInDto).expect(201);
    });

    it("Should throw 401 if email doesn't exist", () => {
      return request(app.getHttpServer())
        .post(SIGN_IN_USER_URL)
        .send({ ...signInDto, email: "bobik@example.com" })
        .expect(401);
    });

    it("Should throw 401 if invalid password", () => {
      return request(app.getHttpServer())
        .post(SIGN_IN_USER_URL)
        .send({ ...signInDto, password: "Bobik1!" })
        .expect(401);
    });
  });

  /*
    Refresh Token
    ===================
  */
  describe("Refreshing Token - GET /user/refresh", () => {
    const REFRESH_TOKEN_URL = `/user/refresh`;
    let token: string;

    beforeEach(async () => {
      token = await authService.signup({ ...signUpDto });
    });

    it("Should success", () => {
      return request(app.getHttpServer())
        .get(REFRESH_TOKEN_URL)
        .set("Cookie", [`token=${token}`])
        .expect(200);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer())
        .get(REFRESH_TOKEN_URL)
        .set("Cookie", [`token=`])
        .expect(401);
    });
  });

  /*
    Refresh Token
    ===================
  */
  describe("Logging Out - GET /user/logout", () => {
    const LOGOUT_URL = `/user/logout`;
    let token: string;

    beforeEach(async () => {
      token = await authService.signup({ ...signUpDto });
    });

    it("Should success", () => {
      return request(app.getHttpServer())
        .get(LOGOUT_URL)
        .set("Cookie", [`token=${token}`])
        .expect(200);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).get(LOGOUT_URL).set("Cookie", [`token=`]).expect(401);
    });
  });

  /*
    Find By Id
    ===================
  */
  describe("Find By Id - GET /user/:id", () => {
    let user: User;
    let token: string;

    beforeEach(async () => {
      token = await authService.signup({ ...signUpDto });
      user = await authService.findByEmail(signUpDto.email);
    });

    it("Should find user if Id is correct", async () => {
      const response = await request(app.getHttpServer())
        .get(`/user/${user.id}`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual(user);
    });

    it("Should return empty object if user wasn't found", async () => {
      const response = await request(app.getHttpServer())
        .get(`/user/-1`)
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
    Find Me
    ===================
  */
  describe("Find Me - GET /user/", () => {
    const FIND_ME_URL = "/user/";
    let user: User;
    let token: string;

    beforeEach(async () => {
      token = await authService.signup({ ...signUpDto });
      user = await authService.findByEmail(signUpDto.email);
    });

    it("Should find user by token", async () => {
      const response = await request(app.getHttpServer())
        .get(FIND_ME_URL)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual(user);
    });

    it("Should throw 401 if not authorized", async () => {
      return request(app.getHttpServer()).get(FIND_ME_URL).expect(401);
    });
  });

  /*
    Update
    ==========
  */
  describe("Update - PATCH /user/", () => {
    const UPDATE_URL = "/user/";
    let user: User;
    let token: string;

    beforeEach(async () => {
      token = await authService.signup({ ...signUpDto });
      user = await authService.findByEmail(signUpDto.email);
    });

    it("Should update fields", async () => {
      await request(app.getHttpServer())
        .patch(UPDATE_URL)
        .set("Cookie", [`token=${token}`])
        .send(updateDto)
        .expect(200);

      const changedUser = await authService.findByEmail(updateDto.email);
      expect(changedUser).toEqual({ ...user, ...updateDto });

      const userEl = await authService.findByEmail(signUpDto.email);
      expect(userEl).toBeNull();
    });

    it("Should throw 400 if incorrect firstName", () => {
      return request(app.getHttpServer())
        .patch(UPDATE_URL)
        .set("Cookie", [`token=${token}`])
        .send({ ...updateDto, firstName: "ab", lastName: "ab", email: "asd" })
        .expect(400);
    });

    it("Should throw 400 if incorrect lastName", () => {
      return request(app.getHttpServer())
        .patch(UPDATE_URL)
        .set("Cookie", [`token=${token}`])
        .send({ ...updateDto, lastName: "ab" })
        .expect(400);
    });

    it("Should throw 400 if incorrect email", () => {
      return request(app.getHttpServer())
        .patch(UPDATE_URL)
        .set("Cookie", [`token=${token}`])
        .send({ ...updateDto, email: "asd" })
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).patch(UPDATE_URL).expect(401);
    });
  });

  /*
    Change Password
    ===================
  */
  describe("Change Password - PATCH /user/change-password", () => {
    const CHANGE_PASSWORD_URL = "/user/change-password";
    let user: User;
    let password: string;
    let token: string;

    beforeEach(async () => {
      token = await authService.signup({ ...signUpDto });
      user = await authService.findByEmail(signUpDto.email);
      password = await authService.findUserPassword(user.id);
    });

    it("Should update password", async () => {
      await request(app.getHttpServer())
        .patch(CHANGE_PASSWORD_URL)
        .set("Cookie", [`token=${token}`])
        .send(changePasswordDto)
        .expect(200);

      const userEl = await authService.findByEmail(signUpDto.email);
      const userElPassword = await authService.findUserPassword(userEl.id);
      expect(userElPassword).not.toEqual(password);
    });

    it("Should throw 400 if incorrect password", () => {
      return request(app.getHttpServer())
        .patch(CHANGE_PASSWORD_URL)
        .set("Cookie", [`token=${token}`])
        .send({ ...changePasswordDto, password: "abc!" })
        .expect(400);
    });

    it("Should throw 400 if password is the same as old", () => {
      return request(app.getHttpServer())
        .patch(CHANGE_PASSWORD_URL)
        .set("Cookie", [`token=${token}`])
        .send({ ...changePasswordDto, password: signUpDto.password })
        .expect(400);
    });

    it("Should throw 401 if not authentificated", () => {
      return request(app.getHttpServer()).patch(CHANGE_PASSWORD_URL).expect(401);
    });
  });

  /*
    Delete
    ==========
  */
  describe("Delete - DELETE /user/", () => {
    const DELETE_URL = "/user/";
    let token: string;

    beforeEach(async () => {
      token = await authService.signup({ ...signUpDto });
    });

    it("Should delete user", async () => {
      await request(app.getHttpServer())
        .delete(DELETE_URL)
        .set("Cookie", [`token=${token}`])
        .expect(200);

      const userEl = await authService.findByEmail(signUpDto.email);
      expect(userEl).toBeNull();
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).delete(DELETE_URL).expect(401);
    });
  });
});
