import { Album } from "src/models/album/entities/album.entity";
import { Group } from "src/models/group/entities/group.entity";
import { Playlist } from "src/models/playlist/entities/playlist.entity";
import { User } from "src/models/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  file: string;

  @ManyToOne(() => User, (user) => user.tracks)
  user?: User;

  @ManyToOne(() => Group, (group) => group.tracks)
  group?: Group;

  @ManyToOne(() => Album, (album) => album.tracks)
  album?: Album;

  @ManyToMany(() => Playlist, (playlist) => playlist.tracks)
  playlists: Playlist[];
}
