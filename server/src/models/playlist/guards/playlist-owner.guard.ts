import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { PlaylistService } from "../playlist.service";

/* imports: [PlaylistModule] */
@Injectable()
export class PlaylistOwnerGuard implements CanActivate {
  constructor(private playlistService: PlaylistService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const user = req.user;
      const groupId = +req.params.id;
      const group = await this.playlistService.findOne(groupId);
      if (!group || group.user.id !== user.id) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException(
        "You don't have a playlist or you're trying to change someone else's",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
