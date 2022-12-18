import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { AuthService } from "../auth.service";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { ServiceMetadata, USER_REPOSITORY_TOKEN } from "./helpers/service.metadata";
import { hashedPassword, mockedToken, signInDto, signUpDto, users } from "./helpers/users";
import { HttpException, UnauthorizedException } from "@nestjs/common";

describe("AuthService", () => {
  let service: AuthService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ServiceMetadata).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("usersRepository should be defined", () => {
    expect(usersRepository).toBeDefined();
  });

  /*
    Sign Up
    ==============
  */
  describe("signup", () => {
    jest.spyOn(bcrypt, "hash").mockImplementation(() => hashedPassword);

    it("Should encode password correctly", async () => {
      await service.signup(signUpDto);
      expect(bcrypt.hash).toHaveBeenCalledWith(signUpDto.password, 5);
      expect(bcrypt.hash).toReturnWith(hashedPassword);
    });

    it("Should return token", async () => {
      expect(await service.signup(signUpDto)).toStrictEqual(mockedToken);
    });
  });

  /*
    Sign In
    ==============
  */
  describe("signin", () => {
    jest.spyOn(bcrypt, "compare").mockImplementation((password, hashed) => password === hashed);

    it("Should throw error if user wasn't found", async () => {
      await expect(service.signin({ ...signInDto, email: "not-email" })).rejects.toThrowError(
        UnauthorizedException
      );
    });

    it("Should throw error if password incorrect", async () => {
      await expect(service.signin({ ...signInDto })).rejects.toThrowError(UnauthorizedException);
    });

    it("Should return token", async () => {
      expect(await service.signin({ ...signInDto, password: users[0].password })).toStrictEqual(
        mockedToken
      );
    });
  });

  /*
    Find By Id
    ==============
  */
  describe("findById", () => {
    it("Should find user", async () => {
      expect(await service.findById(users[0].id)).toStrictEqual(users[0]);
    });

    it("Should return undefined if user wasn't found", async () => {
      expect(await service.findById(users[3]?.id)).toStrictEqual(undefined);
    });
  });

  /*
    Find By Email
    ==============
  */
  describe("findByEmail", () => {
    it("Should find user", async () => {
      expect(await service.findByEmail(users[0].email)).toStrictEqual(users[0]);
    });

    it("Should return undefined if user wasn't found", async () => {
      expect(await service.findByEmail(users[3]?.email)).toStrictEqual(undefined);
    });
  });

  /*
    Find User Password
    ====================
  */
  describe("findUserPassword", () => {
    it("Should find password", async () => {
      expect(await service.findUserPassword(users[0].id)).toStrictEqual(users[0].password);
    });

    it("Should return undefined if user wasn't found", async () => {
      expect(await service.findUserPassword(users[3]?.id)).toStrictEqual(undefined);
    });
  });

  /*
    Update
    =========
  */
  describe("update", () => {
    it("Should call the update method", async () => {
      expect(await service.update(users[0].id, { firstName: "Bob1" })).toStrictEqual(true);
      expect(usersRepository.update).toBeCalledTimes(1);
      expect(usersRepository.update).toBeCalledWith({ id: users[0].id }, { firstName: "Bob1" });
    });
  });

  /*
    Change Password
    ================
  */
  describe("changePassword", () => {
    jest.spyOn(bcrypt, "compare").mockImplementation((password, hashed) => password === hashed);
    jest.spyOn(bcrypt, "hash").mockImplementation(() => hashedPassword);
    const newPassword = "Bob123!";

    it("Should encode changed password correctly", async () => {
      const newPassword = "Bob123!";
      await service.changePassword(users[0].id, { password: newPassword });
      expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 5);
      expect(bcrypt.hash).toReturnWith(hashedPassword);
    });

    it("Should throw if password is the same", async () => {
      await expect(
        service.changePassword(users[0].id, { password: users[0].password })
      ).rejects.toThrowError(HttpException);
    });

    it("Should change password", async () => {
      expect(await service.changePassword(users[0].id, { password: newPassword })).toStrictEqual(
        true
      );
    });
  });

  /*
    Delete
    =========
  */
  describe("delete", () => {
    it("Should call the delete method", async () => {
      expect(await service.delete(users[0].id)).toStrictEqual(true);
      expect(usersRepository.delete).toBeCalledTimes(1);
      expect(usersRepository.delete).toBeCalledWith({ id: users[0].id });
    });
  });

  /*
    Other
    =========
  */
  describe("generateToken", () => {
    it("Should return token", async () => {
      expect(await service.generateToken(users[0])).toStrictEqual(mockedToken);
    });
  });
});
