import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateProfileDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  nickname: string;
}
