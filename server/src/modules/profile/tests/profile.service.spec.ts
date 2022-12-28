import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { Profile } from "../entities/profile.entity";
import { ProfileService } from "../profile.service";
import { createProfileDto, profiles, updateProfileDto } from "./helpers/profile";
import { PROFILE_REPOSITORY_TOKEN, ServiceMetadata } from "./helpers/service.metadata";
import { user } from "./helpers/user";

describe("ProfileService", () => {
  let service: ProfileService;
  let profileRepository: Repository<Profile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(ServiceMetadata).compile();

    service = module.get(ProfileService);
    profileRepository = module.get(PROFILE_REPOSITORY_TOKEN);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("profileRepository should be defined", () => {
    expect(profileRepository).toBeDefined();
  });

  /*
    Create
    ==============
  */
  describe("Create", () => {
    it("Should return profile", async () => {
      expect(await service.create(user.id, createProfileDto)).toStrictEqual(profiles[0]);
    });
  });

  /*
    Find By User Id
    ==================
  */
  describe("findByUserId", () => {
    it("Should return profile", async () => {
      expect(await service.findByUserId(profiles[0].user.id)).toStrictEqual(profiles[0]);
    });

    it("Should return undefined if profile wasn't found", async () => {
      expect(await service.findByUserId(profiles[3]?.user?.id)).toStrictEqual(undefined);
    });
  });

  /*
    Find By Id
    ==============
  */
  describe("findById", () => {
    it("Should return profile", async () => {
      expect(await service.findById(profiles[0].id)).toStrictEqual(profiles[0]);
    });

    it("Should return undefined if profile wasn't found", async () => {
      expect(await service.findById(profiles[3]?.id)).toStrictEqual(undefined);
    });
  });

  /*
    Find By Nickname
    ==============
  */
  describe("findByNickname", () => {
    it("Should find profile", async () => {
      expect(await service.findByNickname(profiles[0].nickname)).toStrictEqual(profiles[0]);
    });

    it("Should return empty array if track wasn't found", async () => {
      expect(await service.findByNickname(profiles[3]?.nickname)).toStrictEqual(undefined);
    });
  });

  /*
    Update
    =========
  */
  describe("update", () => {
    it("Should call the update method", async () => {
      expect(await service.update(profiles[0].id, updateProfileDto)).toStrictEqual(true);
      expect(profileRepository.update).toBeCalledTimes(1);
      expect(profileRepository.update).toBeCalledWith({ id: profiles[0].id }, updateProfileDto);
    });
  });

  /*
    Delete
    =========
  */
  describe("delete", () => {
    it("Should call the delete method", async () => {
      expect(await service.delete(profiles[0].user.id)).toStrictEqual(true);
      expect(profileRepository.delete).toBeCalledTimes(1);
      expect(profileRepository.delete).toBeCalledWith({ id: profiles[0].id });
    });
  });
});
