import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request, Response } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException, HttpStatus } from "@nestjs/common";
import { TrackService } from "../track.service";
import * as multer from "multer";

/* imports: [TrackModule, UserModule] */
@Injectable()
export class TrackOccupiedGuard implements CanActivate {
  constructor(private trackService: TrackService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getRequest<Response>();
    await new Promise((resolve, reject) => {
      multer().any()(req, res, function (err: any) {
        if (err) reject(err);
        resolve(req);
      });
    });

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
