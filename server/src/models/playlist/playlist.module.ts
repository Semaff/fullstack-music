import { Module, forwardRef } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { PlaylistController } from "./playlist.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./entities/playlist.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), forwardRef(() => UserModule)],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService]
})
export class PlaylistModule {}
