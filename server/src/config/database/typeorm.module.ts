import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/auth/entities/user.entity";
import { Profile } from "src/modules/profile/entities/profile.entity";
import { Album } from "src/modules/album/entities/album.entity";
import { Track } from "src/modules/track/entities/track.entity";
import { Playlist } from "src/modules/playlist/entities/playlist.entity";
import { Comment } from "src/modules/comment/entities/comment.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("POSTGRES_HOST"),
        port: configService.get<number>("POSTGRES_PORT"),
        username: configService.get<string>("POSTGRES_USERNAME"),
        password: configService.get<string>("POSTGRES_PASSWORD"),
        database: configService.get<string>("POSTGRES_DB"),
        entities: [User, Profile, Track, Album, Playlist, Comment],
        synchronize: true
      }),
      inject: [ConfigService]
    })
  ]
})
export class PosgresDBProvider {}
