import { Album } from "src/modules/album/entities/album.entity";
import { User } from "src/modules/auth/entities/user.entity";
import { Comment } from "src/modules/comment/entities/comment.entity";
import { Playlist } from "src/modules/playlist/entities/playlist.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  file: string;

  @OneToMany(() => Comment, (comment) => comment.track)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.tracks, { onDelete: "CASCADE" })
  user: User;

  @ManyToMany(() => Playlist, (playlist) => playlist.tracks, { onDelete: "CASCADE" })
  playlists: Playlist;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: "SET NULL" })
  album?: Album;
}
