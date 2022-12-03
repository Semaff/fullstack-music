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

@Injectable()
export class CleanTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        try {
          response.cookie("token", "", { expires: new Date() });
        } catch (err) {
          throw new HttpException("Couldn't clean cookies!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      })
    );
  }
}
