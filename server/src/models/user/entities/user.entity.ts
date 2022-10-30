import { Album } from "src/models/album/entities/album.entity";
import { Group } from "src/models/group/entities/group.entity";
import { Playlist } from "src/models/playlist/entities/playlist.entity";
import { Profile } from "src/models/profile/entities/profile.entity";
import { Track } from "src/models/track/entities/track.entity";
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

  @Column()
  password: string;

  @Column({ default: false })
  isMusician: boolean;

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
