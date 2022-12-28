import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/guards/auth.guard";
import { Req } from "@nestjs/common";
import { Request } from "express";
import { NicknameGuard } from "./guards/nickname.guard";
import { ProfileGuard } from "./guards/profile.guard";
import { ProfileAbsenceGuard } from "./guards/profile-absence.guard";

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /*
    Create
    ========
  */
  @Post()
  @UseGuards(AuthGuard, NicknameGuard, ProfileAbsenceGuard)
  create(
    @Req()
    request: Request,

    @Body()
    createProfileDto: CreateProfileDto
  ) {
    return this.profileService.create(request.user.id, createProfileDto);
  }

  /*
    Find By Id
    =================
  */
  @Get(":id")
  @UseGuards(AuthGuard)
  findById(@Param("id") id: number) {
    return this.profileService.findById(+id);
  }

  /*
    Update
    =================
  */
  @Patch()
  @UseGuards(AuthGuard, NicknameGuard, ProfileGuard)
  update(
    @Req()
    request: Request,

    @Body()
    updateProfileDto: UpdateProfileDto
  ) {
    return this.profileService.update(request.user.id, { ...updateProfileDto });
  }

  /*
    Delete
    =================
  */
  @Delete()
  @UseGuards(AuthGuard, ProfileGuard)
  delete(@Req() request: Request) {
    return this.profileService.delete(request.user.id);
  }
}
