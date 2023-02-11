import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/auth/entities/user.entity";
import { Profile } from "src/modules/profile/entities/profile.entity";
import { Album } from "src/modules/album/entities/album.entity";
import { Track } from "src/modules/track/entities/track.entity";
import { Playlist } from "src/modules/playlist/entities/playlist.entity";
import { Comment } from "src/modules/comment/entities/comment.entity";

export const ENTITIES = [User, Profile, Track, Album, Playlist, Comment];

const isProduction = process.env.NODE_ENV === "PRODUCTION";
const isTesting = process.env.NODE_ENV === "TEST";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("PGHOST"),
        port: configService.get<number>("POSTGRES_PORT"),
        username: configService.get<string>("PGUSER"),
        password: configService.get<string>("PGPASSWORD"),
        database: configService.get<string>("PGDATABASE"),
        url: "DATABASE_URL",
        entities: ENTITIES,
        dropSchema: isTesting,
        synchronize: !isProduction
      }),
      inject: [ConfigService]
    })
  ]
})
export class PosgresDBProvider {}
