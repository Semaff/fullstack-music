import { ArrayMinSize, IsArray, IsBoolean, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Track } from "src/models/track/entities/track.entity";

export class CreateAlbumDto {
  name: string;

  @IsOptional()
  @IsBoolean()
  useGroup?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Track)
  tracks: Track[];
}
