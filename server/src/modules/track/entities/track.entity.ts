import { Album } from "src/modules/album/entities/album.entity";
import { User } from "src/modules/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  file: string;

  @ManyToOne(() => User, (user) => user.tracks, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: "SET NULL" })
  album?: Album;
}
