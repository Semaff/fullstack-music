import { Test, TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { AuthController } from "../auth.controller";
import { ControllerMetadata } from "./helpers/controller.metadata";
import { mockedToken, signInDto, signUpDto, users } from "./helpers/users";

describe("AuthController", () => {
  const mockedRequest = { user: { id: 1 } } as unknown as Request;
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ControllerMetadata).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  /*
    Sign Up
    ===========
  */
  describe("Sign Up endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.signup(signUpDto);
      expect(response).toStrictEqual(mockedToken);
    });
  });

  /*
    Sign In
    =========
  */
  describe("Sign In endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.signin(signInDto);
      expect(response).toStrictEqual(mockedToken);
    });
  });

  /*
    Refresh Token
    =================
  */
  describe("Refresh Token endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.refreshToken(mockedRequest);
      expect(response).toStrictEqual(mockedToken);
    });
  });

  /*
    Logout
    =========
  */
  describe("Logout Token endpoint", () => {
    it("should return a successful response", async () => {
      const response = controller.logout();
      expect(response).toStrictEqual("Logged out!");
    });
  });

  /*
    Find By Id
    ============
  */
  describe("Find By Id endpoint", () => {
    it("should return a successful response", async () => {
      await expect(controller.findById("1")).resolves.toStrictEqual(users[0]);
      await expect(controller.findById("2")).resolves.toStrictEqual(users[1]);
      await expect(controller.findById("3")).resolves.toStrictEqual(users[2]);
    });
  });

  /*
    Find Me
    =================
  */
  describe("Find Me endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.findMe(mockedRequest);
      expect(response).toStrictEqual(users[0]);
    });
  });

  /*
    Update
    =========
  */
  describe("Update endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.update(mockedRequest, { firstName: "Bob" });
      expect(response).toStrictEqual({ ...users[0], firstName: "Bob" });
    });
  });

  /*
    Change Password
    =================
  */
  describe("Change password endpoint", () => {
    it("should return a successful response", async () => {
      const newPassword = "NewBob123!";
      const response = await controller.changePassword(mockedRequest, { password: newPassword });
      expect(response).toStrictEqual({ ...users[0], password: newPassword });
    });
  });

  /*
    Delete
    =========
  */
  describe("Delete endpoint", () => {
    it("should return a successful response", async () => {
      const response = await controller.delete(mockedRequest);
      expect(response).toStrictEqual({ deleted: true });
    });
  });
});
