import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { GroupService } from "src/models/group/group.service";

/* Depends on JwtAuthGuard
  imports: [AuthModule, GroupModule]
*/
@Injectable()
export class GroupOwnerGuard implements CanActivate {
  constructor(private groupService: GroupService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const user = req.user;
      const group = await this.groupService.findOne(user.group?.id);
      if (!group || user.group?.id !== group.id) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException(
        "You don't have a group or you're trying to change someone else's",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
