import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { TrackService } from "../track.service";

@Injectable()
export class TrackGuard implements CanActivate {
  constructor(private trackService: TrackService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const trackId = +req.params.id;
      const owner = await this.trackService.findTrackOwner(trackId);
      const user = req.user;
      if (owner.id !== user.id) {
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
