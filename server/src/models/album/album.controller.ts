import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "../user/guards/user-jwt-auth.guard";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { AlbumOccupiedGuard } from "./guards/album-occupied.guard";
import { AlbumOwnerGuard } from "./guards/album-owner.guard";

@Controller("album")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AlbumOccupiedGuard)
  create(@Body() createAlbumDto: CreateAlbumDto, @Req() request: Request) {
    return this.albumService.create(createAlbumDto, request.user);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.albumService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, AlbumOwnerGuard, AlbumOccupiedGuard)
  update(@Param("id") id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, AlbumOwnerGuard)
  remove(@Param("id") id: string) {
    return this.albumService.remove(+id);
  }
}
