import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { ProfileService } from "../../profile/profile.service";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";

@Injectable()
export class ProfileAbsenceGuard implements CanActivate {
  constructor(private profileService: ProfileService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const user = req.user;
      const profile = await this.profileService.findByUserId(user.id);
      if (profile) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException("You already have a profile!", HttpStatus.BAD_REQUEST);
    }
  }
}
