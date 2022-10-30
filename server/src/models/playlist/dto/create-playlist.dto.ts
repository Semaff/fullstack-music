import {
  ArrayMinSize,
  IsArray,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { Track } from "src/models/track/entities/track.entity";

export class CreatePlaylistDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Track)
  tracks: Track[];
}
