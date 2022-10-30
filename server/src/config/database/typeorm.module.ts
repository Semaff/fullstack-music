import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/models/user/entities/user.entity";
import { Group } from "src/models/group/entities/group.entity";
import { Profile } from "src/models/profile/entities/profile.entity";
import { Album } from "src/models/album/entities/album.entity";
import { Track } from "src/models/track/entities/track.entity";
import { Playlist } from "src/models/playlist/entities/playlist.entity";

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
        entities: [User, Group, Profile, Track, Album, Playlist],
        synchronize: true
      }),
      inject: [ConfigService]
    })
  ]
})
export class PosgresDBProvider {}
