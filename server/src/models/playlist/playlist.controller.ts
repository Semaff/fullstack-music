import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { Request } from "express";
import { JwtAuthGuard } from "../user/guards/user-jwt-auth.guard";
import { PlaylistOccupiedGuard } from "./guards/playlist-occupied.guard";
import { PlaylistOwnerGuard } from "./guards/playlist-owner.guard";

@Controller("playlist")
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PlaylistOccupiedGuard)
  create(@Body() createPlaylistDto: CreatePlaylistDto, @Req() request: Request) {
    return this.playlistService.create(createPlaylistDto, request.user);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.playlistService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, PlaylistOwnerGuard, PlaylistOccupiedGuard)
  update(@Param("id") id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, PlaylistOwnerGuard)
  remove(@Param("id") id: string) {
    return this.playlistService.remove(+id);
  }
}
