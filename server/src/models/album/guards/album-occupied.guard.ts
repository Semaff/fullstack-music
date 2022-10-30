import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { AlbumService } from "../album.service";

/* Depends on JwtAuthGuard
  imports: [AuthModule]
*/
@Injectable()
export class AlbumOccupiedGuard implements CanActivate {
  constructor(private albumService: AlbumService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const albumName = req.body.name;
      const album = await this.albumService.findByName(albumName);
      if (album) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException("Album with that name already exists!", HttpStatus.BAD_REQUEST);
    }
  }
}
