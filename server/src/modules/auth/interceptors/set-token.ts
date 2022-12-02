import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { Response } from "express";
import { Observable, tap } from "rxjs";
import { generateOneDay } from "src/common/utils/generateDate";
import { JwtUser } from "../interfaces/JwtUser";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SetTokenInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<Response>();
    return next.handle().pipe(
      tap((data) => {
        try {
          if (typeof data !== "string") return;

          const jwtUser = this.jwtService.verify<JwtUser>(data);
          if (jwtUser) {
            response.cookie("token", data, { expires: generateOneDay() });
          }
        } catch (err) {
          throw new HttpException("Couldn't assign cookies!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      })
    );
  }
}
