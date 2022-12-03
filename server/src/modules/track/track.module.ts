import { Module } from "@nestjs/common";
import { TrackService } from "./track.service";
import { TrackController } from "./track.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Track } from "./entities/track.entity";
import { ProfileModule } from "../profile/profile.module";

@Module({
  imports: [TypeOrmModule.forFeature([Track]), ProfileModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService]
})
export class TrackModule {}
