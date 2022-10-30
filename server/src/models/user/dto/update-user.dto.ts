import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { Group } from "src/models/group/entities/group.entity";
import { Profile } from "src/models/profile/entities/profile.entity";
import { SignUpUserDto } from "./signup-user.dto";

export class UpdateUserDto extends PartialType(SignUpUserDto) {
  @IsBoolean()
  @IsOptional()
  isMusician?: boolean;

  @Type(() => Profile)
  @IsOptional()
  profile?: Profile;

  @Type(() => Group)
  @IsOptional()
  group?: Group;
}
