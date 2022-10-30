import { Track } from "src/models/track/entities/track.entity";
import { User } from "src/models/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Track, (track) => track.playlists, {
    cascade: true
  })
  @JoinTable()
  tracks: Track[];

  @ManyToOne(() => User, (user) => user.playlists)
  user: User;
}
