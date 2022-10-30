import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { UserService } from "../user.service";

/* Depends on JwtAuthGuard
  imports: [AuthModule]
*/
@Injectable()
export class UserOccupiedGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const userEmail = req.body.email;
      const user = await this.userService.findByEmail(userEmail);
      if (user) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException("User with that email already exists!", HttpStatus.BAD_REQUEST);
    }
  }
}
