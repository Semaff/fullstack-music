import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { JwtUser } from "../interfaces/JwtUser";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const authHeader = req.headers?.authorization;
      const cookieToken = req.cookies?.token;
      const [bearer, token] = (authHeader || "").split(" ");
      if ((bearer !== "Bearer" || !token) && !cookieToken) {
        throw new Error();
      }

      const jwtUser = this.jwtService.verify<JwtUser>(cookieToken || token);
      const user = await this.authService.findById(jwtUser.id);
      if (!user) {
        throw new Error();
      }

      req.user = jwtUser;
      return true;
    } catch (err) {
      throw new UnauthorizedException({ message: "Not authorized!" });
    }
  }
}
