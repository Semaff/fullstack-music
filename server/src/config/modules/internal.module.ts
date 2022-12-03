import { Module } from "@nestjs/common";
import { AlbumModule } from "src/modules/album/album.module";
import { GroupModule } from "src/modules/group/group.module";
import { PlaylistModule } from "src/modules/playlist/playlist.module";
import { ProfileModule } from "src/modules/profile/profile.module";
import { TrackModule } from "src/modules/track/track.module";
import { AuthModule } from "src/modules/auth/auth.module";

@Module({
  imports: [AuthModule, ProfileModule, GroupModule, TrackModule, AlbumModule, PlaylistModule]
})
export class InternalModulesProvider {}
