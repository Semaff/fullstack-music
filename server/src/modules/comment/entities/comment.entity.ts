import { User } from "../../auth/entities/user.entity";
import { Track } from "../../track/entities/track.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/* https://github.com/typeorm/typeorm/blob/master/docs/relations-faq.md */
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Track, (track) => track.comments)
  track: Track;

  @ManyToOne(() => Comment, (comment) => comment.children)
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];
}
