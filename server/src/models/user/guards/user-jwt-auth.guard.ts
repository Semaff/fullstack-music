import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { JwtUser } from "../interfaces/JwtUser";
import { UserService } from "../user.service";

/* imports: [UserModule] */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(" ");

      if (bearer !== "Bearer" || !token) {
        throw new Error();
      }

      const jwtUser = this.jwtService.verify<JwtUser>(token);
      const user = await this.userService.findOne(jwtUser.id);
      if (!jwtUser || !user) {
        throw new Error();
      }

      req.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException({ message: "Not authorized!" });
    }
  }
}
