import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { GroupService } from "../group.service";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";

/* imports: [GroupModule] */
@Injectable()
export class GroupOccupiedGuard implements CanActivate {
  constructor(private groupService: GroupService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const groupName = req.body.name;
      const group = await this.groupService.findByName(groupName);
      if (group) {
        throw new Error();
      }

      return true;
    } catch (err) {
      throw new HttpException("Group with that name already exists!", HttpStatus.BAD_REQUEST);
    }
  }
}
