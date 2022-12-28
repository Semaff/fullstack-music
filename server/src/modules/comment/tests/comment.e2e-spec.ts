import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "src/app.module";
import * as cookieParser from "cookie-parser";
import { CommentService } from "../comment.service";
import { AuthService } from "src/modules/auth/auth.service";
import { createCommentDto, updateCommentDto } from "./helpers/comments";
import { User } from "src/modules/auth/entities/user.entity";
import { signUpDto } from "./helpers/user";
import { Comment } from "../entities/comment.entity";
import { createTrackDto } from "./helpers/track";
import { Track } from "src/modules/track/entities/track.entity";
import { TrackService } from "src/modules/track/track.service";

describe("CommentController (e2e)", () => {
  let app: INestApplication;
  let authService: AuthService;
  let commentService: CommentService;
  let trackService: TrackService;

  let token: string;
  let user: User;
  let track: Track;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = app.get(AuthService);
    commentService = app.get(CommentService);
    trackService = app.get(TrackService);

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();
  });

  beforeAll(async () => {
    const mockedFile = { filename: "abc" } as unknown as Express.Multer.File;
    token = await authService.signup(signUpDto);
    user = await authService.findByEmail(signUpDto.email);
    track = await trackService.create(createTrackDto, mockedFile, user.id);
  });

  afterEach(async () => {
    const comments = await commentService.findByTrack({ trackId: track.id });
    comments.forEach(async (el) => await commentService.delete(el.id));
  });

  afterAll(async () => {
    await trackService.delete(track.id);
    await authService.delete(user.id);
    await app.close();
  });

  /*
    Create
    =========
  */
  describe("Create - POST /comment/", () => {
    const CREATE_URL = `/comment/`;

    it("Should create a new comment", () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .send({ ...createCommentDto, trackId: track.id })
        .expect(201);
    });

    it("Should throw 400 if invalid text", async () => {
      await authService.signup(signUpDto);
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .send({ ...createCommentDto, trackId: track.id, text: "ab" })
        .expect(400);
    });

    it("Should throw 500 if invalid trackId", () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=${token}`])
        .send({ ...createCommentDto, trackId: -1 })
        .expect(500);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer())
        .post(CREATE_URL)
        .set("Cookie", [`token=`])
        .send({ ...createCommentDto, trackId: -1 })
        .expect(401);
    });
  });

  /*
    Find By Id
    ===================
  */
  describe("Find By Id - GET /comment/:id", () => {
    let comment: Comment;

    beforeEach(async () => {
      comment = await commentService.create(createCommentDto, user.id);
      comment = await commentService.findById(comment.id);
    });

    it("Should find comment if Id is correct", async () => {
      const response = await request(app.getHttpServer())
        .get(`/comment/${comment.id}`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual(comment);
    });

    it("Should return empty object if comment wasn't found", async () => {
      const response = await request(app.getHttpServer())
        .get(`/comment/-1`)
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual({});
    });

    it("Should throw 401 if not authorized", async () => {
      return request(app.getHttpServer()).get(`/comment/${comment.id}`).expect(401);
    });
  });

  /*
    Find By Track Id
    ===================
  */
  describe("Find By Track Id - GET /comment?trackId=", () => {
    const FIND_URL = `/comment/`;
    let comment: Comment;

    beforeEach(async () => {
      comment = await commentService.create(createCommentDto, user.id);
      comment = await commentService.findById(comment.id);
      delete comment.children;
    });

    it("Should find comment by track id", async () => {
      const response = await request(app.getHttpServer())
        .get(FIND_URL)
        .query({ trackId: track.id })
        .set("Cookie", [`token=${token}`])
        .expect(200);
      const body = response.body;
      expect(body).toEqual([comment]);
    });

    it("Should throw 401 if not authorized", async () => {
      return request(app.getHttpServer()).get(FIND_URL).query({ trackId: track.id }).expect(401);
    });
  });

  /*
    Update
    ==========
  */
  describe("Update - PATCH /comment/", () => {
    let comment: Comment;

    beforeEach(async () => {
      comment = await commentService.create(createCommentDto, user.id);
    });

    it("Should update fields", async () => {
      await request(app.getHttpServer())
        .patch(`/comment/${comment.id}`)
        .set("Cookie", [`token=${token}`])
        .send(updateCommentDto)
        .expect(200);

      const changedComment = await commentService.findById(comment.id);
      expect(changedComment).toEqual({ ...changedComment, ...updateCommentDto });
    });

    it("Should throw 400 if incorrect text", () => {
      return request(app.getHttpServer())
        .patch(`/comment/${comment.id}`)
        .set("Cookie", [`token=${token}`])
        .send({ ...updateCommentDto, text: "ab" })
        .expect(400);
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).patch(`/comment/${comment.id}`).expect(401);
    });
  });

  /*
    Delete
    ==========
  */
  describe("Delete - DELETE /comment/", () => {
    let comment: Comment;

    beforeEach(async () => {
      comment = await commentService.create(createCommentDto, user.id);
    });

    it("Should delete comment", async () => {
      await request(app.getHttpServer())
        .delete(`/comment/${comment.id}`)
        .set("Cookie", [`token=${token}`])
        .expect(200);

      const commentEl = await commentService.findById(comment.id);
      expect(commentEl).toBeNull();
    });

    it("Should throw 401 if not authorized", () => {
      return request(app.getHttpServer()).delete(`/comment/${comment.id}`).expect(401);
    });
  });
});
