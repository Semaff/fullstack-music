import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { Request } from "express";
import { JwtAuthGuard } from "../user/guards/user-jwt-auth.guard";
import { TrackOwnerGuard } from "./guards/track-owner.guard";
import { UploadedMusicFile } from "src/common/decorators/uploaded-music-file.decorator";
import { ServeFile } from "src/common/decorators/serve-file.decorator";

@Controller("track")
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ServeFile("track")
  create(
    @Body() createTrackDto: CreateTrackDto,
    @UploadedMusicFile() file: Express.Multer.File,
    @Req() request: Request
  ) {
    return this.trackService.create(createTrackDto, file, request.user);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.trackService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, TrackOwnerGuard)
  update(@Param("id") id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(+id, updateTrackDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, TrackOwnerGuard)
  remove(@Param("id") id: string) {
    return this.trackService.remove(+id);
  }
}
