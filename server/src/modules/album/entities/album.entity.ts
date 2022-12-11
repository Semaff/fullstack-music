import { Track } from "src/modules/track/entities/track.entity";
import { User } from "src/modules/auth/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.albums, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
