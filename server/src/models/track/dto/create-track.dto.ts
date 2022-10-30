import { IsString, MaxLength, MinLength, IsBoolean, IsOptional } from "class-validator";

export class CreateTrackDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsBoolean()
  @IsOptional()
  asGroup?: boolean;
}
