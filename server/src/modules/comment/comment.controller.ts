import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { QueryDto } from "./dto/query.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentGuard } from "./guards/comment.guard";
import { ParentGuard } from "./guards/parent.guard";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /*
    Create
    ===========
  */
  @Post()
  @UseGuards(AuthGuard, ParentGuard)
  create(@Body() createCommentDto: CreateCommentDto, @Req() request: Request) {
    return this.commentService.create(createCommentDto, request.user.id);
  }

  /*
    Find By Id
    =================
  */
  @Get(":id")
  findById(@Param("id") id: string) {
    return this.commentService.findById(+id);
  }

  /*
    Find By Track Id
    =================
  */
  @Get()
  findByTrackId(@Query() query: QueryDto) {
    return this.commentService.findByTrack(query);
  }

  /*
    Update
    ==============
  */
  @Patch(":id")
  @UseGuards(AuthGuard, CommentGuard)
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  /*
    Delete
    ================
  */
  @Delete(":id")
  @UseGuards(AuthGuard, CommentGuard)
  delete(@Param("id") id: string) {
    return this.commentService.delete(+id);
  }
}
