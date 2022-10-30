import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../user/guards/user-jwt-auth.guard";
import { Req } from "@nestjs/common";
import { Request } from "express";
import { ProfileOwnerGuard } from "./guards/profile-owner.guard";
import { ProfileOccupiedGuard } from "./guards/profile-occupied.guard";

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard, ProfileOccupiedGuard)
  create(@Body() createProfileDto: CreateProfileDto, @Req() request: Request) {
    return this.profileService.create(createProfileDto, request.user);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard, ProfileOwnerGuard, ProfileOccupiedGuard)
  update(@Req() request: Request, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(request.user.profile.id, updateProfileDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, ProfileOwnerGuard)
  remove(@Req() request: Request) {
    return this.profileService.remove(request.user.profile.id);
  }
}
