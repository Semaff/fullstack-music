import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateGroupDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;
}
