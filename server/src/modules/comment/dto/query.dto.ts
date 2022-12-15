import { IsOptional, IsString } from "class-validator";

export class QueryDto {
  @IsString()
  trackId: number;

  @IsString()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  limit?: number;
}
