import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { CommentService } from "../comment.service";

@Injectable()
export class CommentGuard implements CanActivate {
  constructor(private commentService: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const user = req.user;
      const commentId = +req.params.id;
      const owner = await this.commentService.findCommentOwner(commentId);
      if (owner.id !== user.id) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException(
        "You don't have a comment or you're trying to change someone else's",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
