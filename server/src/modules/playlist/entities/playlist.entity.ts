import { Track } from "../../track/entities/track.entity";
import { User } from "../../auth/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Track, (track) => track.playlists)
  @JoinTable()
  tracks: Track[];

  @ManyToOne(() => User, (user) => user.playlists, { onDelete: "CASCADE" })
  user: User;
}
