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
export class AlbumOwnerGuard implements CanActivate {
  constructor(private albumService: AlbumService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const user = req.user;
      const albumId = +req.params.id;
      const album = await this.albumService.findOne(albumId);

      const isGroupOwner = !album.user && album.group.id === user.group.id;
      const isUserOwner = !album.group && album.user.id === user.id;

      if (!album || (!isGroupOwner && !isUserOwner)) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException(
        "Album with that name doesn't exists or you're trying to change someone else's!",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
