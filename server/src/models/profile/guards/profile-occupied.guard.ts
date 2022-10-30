import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { ProfileService } from "../profile.service";

/* imports: [ProfileModule] */
@Injectable()
export class ProfileOccupiedGuard implements CanActivate {
  constructor(private profileService: ProfileService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const profileName = req.body.nickname;
      const profile = await this.profileService.findByName(profileName);
      if (profile) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException("Profile with that name already exists!", HttpStatus.BAD_REQUEST);
    }
  }
}
