import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query
} from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { Request } from "express";
import { UploadedMusicFile } from "src/common/decorators/uploaded-music-file.decorator";
import { ServeFile } from "src/common/decorators/serve-file.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";
import { TrackGuard } from "./guards/track.guard";
import { NameGuard } from "./guards/name.guard";
import { ProfileGuard } from "../profile/guards/profile.guard";

@Controller("track")
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  /*
    Create
    =========
  */
  @Post()
  @UseGuards(AuthGuard, ProfileGuard)
  @ServeFile("track")
  create(
    @Req()
    request: Request,

    @Body()
    createTrackDto: CreateTrackDto,

    @UploadedMusicFile()
    file: Express.Multer.File
  ) {
    return this.trackService.create(createTrackDto, file, request.user.id);
  }

  /*
    Find By Id
    ============
  */
  @Get(":id")
  @UseGuards(AuthGuard)
  findById(@Param("id") id: string) {
    return this.trackService.findById(+id);
  }

  /*
    Find By User Id
    ============
  */
  @Get("my")
  @UseGuards(AuthGuard)
  findByUserId(@Req() request: Request) {
    return this.trackService.findByUserId(+request.user.id);
  }

  /*
    Search
    ============
  */
  @Get()
  @UseGuards(AuthGuard)
  search(@Query("search") search: string) {
    console.log(search);
    return this.trackService.search(search);
  }

  /*
    Update
    ========
  */
  @Patch(":id")
  @UseGuards(AuthGuard, ProfileGuard, TrackGuard, NameGuard)
  update(
    @Param("id")
    id: string,

    @Body()
    updateTrackDto: UpdateTrackDto
  ) {
    return this.trackService.update(+id, updateTrackDto);
  }

  /*
    Delete
    =========
  */
  @Delete(":id")
  @UseGuards(AuthGuard, ProfileGuard, TrackGuard)
  delete(@Param("id") id: string) {
    return this.trackService.delete(+id);
  }
}
