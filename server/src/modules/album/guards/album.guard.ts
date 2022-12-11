import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { AlbumService } from "../album.service";

@Injectable()
export class AlbumGuard implements CanActivate {
  constructor(private albumService: AlbumService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const user = req.user;
      const albumId = +req.params.id;
      const owner = await this.albumService.findAlbumOwner(albumId);

      const isOwner = owner.id === user.id;
      if (!isOwner) {
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
