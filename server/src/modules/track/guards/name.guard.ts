import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException, HttpStatus } from "@nestjs/common";
import { TrackService } from "../track.service";

/* Doesn't work, because guard working before Multer interceptor */
@Injectable()
export class NameGuard implements CanActivate {
  constructor(private trackService: TrackService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    try {
      const trackName = req.body.name;
      const track = await this.trackService.findByName(trackName);
      if (track) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException("Track with that name already exists!", HttpStatus.BAD_REQUEST);
    }
  }
}
