import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { ProfileService } from "src/modules/profile/profile.service";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private profileService: ProfileService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const user = req.user;
      const profile = await this.profileService.findByUserId(user.id);
      if (!profile) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException(
        "You don't have a profile or you're trying to change someone else's",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
