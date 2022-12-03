import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsOptional()
  firstName?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
