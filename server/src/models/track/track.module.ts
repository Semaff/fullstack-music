import { Module, forwardRef } from "@nestjs/common";
import { TrackService } from "./track.service";
import { TrackController } from "./track.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Track } from "./entities/track.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Track]), forwardRef(() => UserModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService]
})
export class TrackModule {}
