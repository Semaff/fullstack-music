import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "../auth/guards/auth.guard";
import { Track } from "../track/entities/track.entity";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { AlbumGuard } from "./guards/album.guard";
import { NameGuard } from "./guards/name.guard";

@Controller("album")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  /*
    Create
    ==========
  */
  @Post()
  @UseGuards(AuthGuard, NameGuard)
  create(@Body() createAlbumDto: CreateAlbumDto, @Req() request: Request) {
    return this.albumService.create(createAlbumDto, request.user.id);
  }

  /*
    Add Tracks
    =============
  */
  @Patch(":id/add-tracks")
  @UseGuards(AuthGuard, AlbumGuard)
  addTracks(@Param("id") id: string, @Body() tracks: Track[]) {
    return this.albumService.addTracks(+id, tracks);
  }

  /*
    Remove Tracks
    ==============
  */
  @Patch(":id/remove-tracks")
  @UseGuards(AuthGuard, AlbumGuard)
  removeTracks(@Param("id") id: string, @Body() tracks: Track[]) {
    return this.albumService.removeTracks(+id, tracks);
  }

  /*
    Find By Id
    ==========
  */
  @Get(":id")
  findById(@Param("id") id: string) {
    return this.albumService.findById(+id);
  }

  /*
    Update
    ==========
  */
  @Patch(":id")
  @UseGuards(AuthGuard, AlbumGuard, NameGuard)
  update(@Param("id") id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto);
  }

  /*
    Delete
    ==========
  */
  @Delete(":id")
  @UseGuards(AuthGuard, AlbumGuard)
  delete(@Param("id") id: string) {
    return this.albumService.delete(+id);
  }
}
