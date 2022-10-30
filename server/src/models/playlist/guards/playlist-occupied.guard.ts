import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { PlaylistService } from "../playlist.service";

/* imports: [PlaylistModule] */
@Injectable()
export class PlaylistOccupiedGuard implements CanActivate {
  constructor(private playlistService: PlaylistService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const playlistName = req.body.name;
      const playlist = await this.playlistService.findByName(playlistName);
      if (playlist) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException("Playlist with that name already exists!", HttpStatus.BAD_REQUEST);
    }
  }
}
