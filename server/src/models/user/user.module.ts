import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { AlbumModule } from "../album/album.module";
import { PlaylistModule } from "../playlist/playlist.module";
import { TrackModule } from "../track/track.module";
import { ProfileModule } from "../profile/profile.module";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: "24h"
      }
    }),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AlbumModule),
    forwardRef(() => PlaylistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => ProfileModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, JwtModule]
})
export class UserModule {}
