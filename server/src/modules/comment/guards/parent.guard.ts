import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { CommentService } from "../comment.service";

@Injectable()
export class ParentGuard implements CanActivate {
  constructor(private commentService: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const { parentId } = req.body;
      if (parentId) {
        const parentComment = await this.commentService.findById(parentId);
        const parent = await this.commentService.findCommentParent(parentId);
        if (!parentComment || parent) {
          throw new Error();
        }
      }

      return true;
    } catch (err) {
      throw new HttpException("You can't create comment!", HttpStatus.BAD_REQUEST);
    }
  }
}
