import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdateCommentDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  text: string;
}
