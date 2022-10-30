import { Album } from "src/models/album/entities/album.entity";
import { Track } from "src/models/track/entities/track.entity";
import { User } from "src/models/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.group)
  users: User[];

  @OneToMany(() => Track, (track) => track.group)
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.group)
  albums: Album[];
}
