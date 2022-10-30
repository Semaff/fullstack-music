import { Module } from "@nestjs/common";
import { AlbumModule } from "src/models/album/album.module";
import { GroupModule } from "src/models/group/group.module";
import { PlaylistModule } from "src/models/playlist/playlist.module";
import { ProfileModule } from "src/models/profile/profile.module";
import { TrackModule } from "src/models/track/track.module";
import { UserModule } from "src/models/user/user.module";

@Module({
  imports: [UserModule, ProfileModule, GroupModule, TrackModule, AlbumModule, PlaylistModule]
})
export class InternalModulesProvider {}
