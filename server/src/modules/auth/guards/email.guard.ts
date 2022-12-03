import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class EmailGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const email = req.body.email;
      const user = await this.authService.findByEmail(email);
      const isEmailOwner = user?.id === req.user?.id;
      if (!isEmailOwner && user) {
        throw new Error();
      }

      return true;
    } catch (err) {
      console.log(err);
      throw new HttpException("User with that email already exists!", HttpStatus.BAD_REQUEST);
    }
  }
}
