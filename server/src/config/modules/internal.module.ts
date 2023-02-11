import { Module } from "@nestjs/common";
import { ProfileModule } from "../../modules/profile/profile.module";
import { TrackModule } from "../../modules/track/track.module";
import { AuthModule } from "../../modules/auth/auth.module";
import { AlbumModule } from "../../modules/album/album.module";
import { PlaylistModule } from "../../modules/playlist/playlist.module";
import { CommentModule } from "../../modules/comment/comment.module";

@Module({
  imports: [AuthModule, ProfileModule, TrackModule, AlbumModule, PlaylistModule, CommentModule]
})
export class InternalModulesProvider {}
