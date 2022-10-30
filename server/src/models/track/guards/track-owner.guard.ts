import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { TrackService } from "../track.service";

/* imports: [TrackModule, UserModule] */
@Injectable()
export class TrackOwnerGuard implements CanActivate {
  constructor(private trackService: TrackService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const trackId = +req.params.id;
      const user = req.user;
      const track = await this.trackService.findOne(trackId);

      const isGroupOwner = !track.user && track.group.id === user.group.id;
      const isUserOwner = !track.group && track.user.id === user.id;
      if (!track || (!isGroupOwner && !isUserOwner)) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException(
        "Track with that name doesn't exists or you're trying to change someone else's!",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
