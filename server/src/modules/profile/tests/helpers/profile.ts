import { CreateProfileDto } from "../../dto/create-profile.dto";
import { UpdateProfileDto } from "../../dto/update-profile.dto";
import { Profile } from "../../entities/profile.entity";
import { user } from "./user";

export const createProfileDto: CreateProfileDto = {
  nickname: "Bobik"
};

export const updateProfileDto: UpdateProfileDto = {
  nickname: "Bobik1"
};

export const profiles: Profile[] = [
  {
    id: 1,
    nickname: "Bobik",
    user: user
  },
  {
    id: 2,
    nickname: "Bobik2",
    user: user
  },
  {
    id: 3,
    nickname: "Bobik3",
    user: user
  }
];
