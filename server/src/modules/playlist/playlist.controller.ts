import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { Request } from "express";
import { AuthGuard } from "../auth/guards/auth.guard";
import { Track } from "../track/entities/track.entity";
import { NameGuard } from "./guards/name.guard";
import { PlaylistGuard } from "./guards/playlist.guard";

@Controller("playlist")
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  /*
    Create
    ===========
  */
  @Post()
  @UseGuards(AuthGuard, NameGuard)
  create(@Body() createPlaylistDto: CreatePlaylistDto, @Req() request: Request) {
    return this.playlistService.create(createPlaylistDto, request.user.id);
  }

  /*
    Add Tracks
    =============
  */
  @Patch(":id/add-tracks")
  @UseGuards(AuthGuard, PlaylistGuard)
  addTracks(@Param("id") id: string, @Body() tracks: Track[]) {
    return this.playlistService.addTracks(+id, tracks);
  }

  /*
      Remove Tracks
      ==============
    */
  @Patch(":id/remove-tracks")
  @UseGuards(AuthGuard, PlaylistGuard)
  removeTracks(@Param("id") id: string, @Body() tracks: Track[]) {
    return this.playlistService.removeTracks(+id, tracks);
  }

  /*
    Find By Id
    ===========
  */
  @Get(":id")
  findById(@Param("id") id: string) {
    return this.playlistService.findById(+id);
  }

  /*
    Update
    ===========
  */
  @Patch(":id")
  @UseGuards(AuthGuard, PlaylistGuard, NameGuard)
  update(@Param("id") id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  /*
    Delete
    ===========
  */
  @Delete(":id")
  @UseGuards(AuthGuard, PlaylistGuard)
  delete(@Param("id") id: string) {
    return this.playlistService.delete(+id);
  }
}
