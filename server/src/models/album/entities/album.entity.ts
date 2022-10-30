import { Group } from "src/models/group/entities/group.entity";
import { Track } from "src/models/track/entities/track.entity";
import { User } from "src/models/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.albums)
  user?: User;

  @ManyToOne(() => Group, (track) => track.albums)
  group?: Group;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
