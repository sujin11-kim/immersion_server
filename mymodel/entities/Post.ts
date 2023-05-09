import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { LikePost } from "./LikePost";

@Index("Post_postIdx_uindex", ["postIdx"], { unique: true })
@Entity("Post", { schema: "immersion_DB" })
export class Post {
  @PrimaryGeneratedColumn({ type: "int", name: "postIdx" })
  postIdx: number;

  @Column("int", { name: "writeIdx" })
  writeIdx: number | null;

  @Column("varchar", { name: "category", nullable: true, length: 20 })
  category: string | null;

  @Column("varchar", { name: "title", nullable: true, length: 30 })
  title: string | null;

  @Column("varchar", { name: "content", nullable: true, length: 300 })
  content: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column("int", { name: "likeNum", nullable: true })
  likeNum: number | null;

  @Column("int", { name: "viewNum", nullable: true })
  viewNum: number | null;

  @Column("varchar", { name: "nickName", nullable: true, length: 300 })
  nickName: string | null;

  @OneToMany(() => Comment, (comment) => comment.postIdx2)
  comments: Comment[];

  @OneToMany(() => LikePost, (likePost) => likePost.postIdx2)
  likePosts: LikePost[];
}
