import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  text: string;

  @IsNumber()
  trackId: number;

  @IsNumber()
  @IsOptional()
  parentId?: number;
}
