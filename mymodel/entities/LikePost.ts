import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Index("FK_Post_TO_LikePost_1", ["postIdx"], {})
@Entity("LikePost", { schema: "immersion_DB" })
export class LikePost {
  @PrimaryGeneratedColumn({ type: "int", name: "likeIdx" })
  likeIdx: number;

  @Column("int", { name: "userId" })
  userId: number;

  @Column("int", { name: "postIdx" })
  postIdx: number;

  @ManyToOne(() => Post, (post) => post.likePosts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "postIdx", referencedColumnName: "postIdx" }])
  postIdx2: Post;

  @ManyToOne(() => User, (user) => user.likePost, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  userId2: User;
}
