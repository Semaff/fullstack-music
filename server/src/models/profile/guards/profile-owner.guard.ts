import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { ProfileService } from "src/models/profile/profile.service";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";

/* Depends on JwtAuthGuard
  imports: [UserModule, ProfileModule]
*/
@Injectable()
export class ProfileOwnerGuard implements CanActivate {
  constructor(private profileService: ProfileService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const user = req.user;
      const profile = await this.profileService.findOne(user.profile?.id);
      if (!profile || user.profile.id !== profile.id) {
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
