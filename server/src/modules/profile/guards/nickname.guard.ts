import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { ProfileService } from "../profile.service";

@Injectable()
export class NicknameGuard implements CanActivate {
  constructor(private profileService: ProfileService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const nickname = req.body.nickname;
      const profile = await this.profileService.findByNickname(nickname);
      if (profile) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException("Profile with that nickname already exists!", HttpStatus.BAD_REQUEST);
    }
  }
}
