import { Module } from "@nestjs/common";
import { ProfileModule } from "src/modules/profile/profile.module";
import { TrackModule } from "src/modules/track/track.module";
import { AuthModule } from "src/modules/auth/auth.module";
import { AlbumModule } from "src/modules/album/album.module";
import { PlaylistModule } from "src/modules/playlist/playlist.module";
import { CommentModule } from "src/modules/comment/comment.module";

@Module({
  imports: [AuthModule, ProfileModule, TrackModule, AlbumModule, PlaylistModule, CommentModule]
})
export class InternalModulesProvider {}
