import { Album } from "src/modules/album/entities/album.entity";
import { Group } from "src/modules/group/entities/group.entity";
import { Playlist } from "src/modules/playlist/entities/playlist.entity";
import { Profile } from "src/modules/profile/entities/profile.entity";
import { Track } from "src/modules/track/entities/track.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile?: Profile;

  @ManyToOne(() => Group, (group) => group.users)
  group?: Group;

  @OneToMany(() => Track, (track) => track.user)
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.user)
  albums: Album[];

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];
}
