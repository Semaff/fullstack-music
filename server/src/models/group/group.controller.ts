import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../user/guards/user-jwt-auth.guard";
import { Req } from "@nestjs/common";
import { Request } from "express";
import { GroupOccupiedGuard } from "./guards/group-occupied.guard";
import { GroupOwnerGuard } from "./guards/group-owner.guard";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseGuards(JwtAuthGuard, GroupOccupiedGuard)
  create(@Body() createGroupDto: CreateGroupDto, @Req() request: Request) {
    return this.groupService.create(createGroupDto, request.user);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard, GroupOwnerGuard, GroupOccupiedGuard)
  update(@Req() request: Request, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(request.user?.group?.id, updateGroupDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, GroupOwnerGuard)
  remove(@Req() request: Request) {
    return this.groupService.remove(request.user?.group?.id);
  }
}
