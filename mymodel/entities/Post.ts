import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { LikePost } from "./LikePost";

@Index("Post_postIdx_uindex", ["postIdx"], { unique: true })
@Entity("Post", { schema: "immersion_DB" })
export class Post {
  @PrimaryGeneratedColumn({ type: "int", name: "postIdx" })
  postIdx: number;

  @Column("int", { name: "writeIdx", nullable: true })
  writeIdx: number | null;

  @Column("varchar", { name: "category", nullable: true, length: 20 })
  category: string | null;

  @Column("varchar", { name: "title", nullable: true, length: 30 })
  title: string | null;

  @Column("varchar", { name: "content", nullable: true, length: 300 })
  content: string | null;

  @Column("timestamp", { name: "createdAt", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("mediumblob", { name: "image", nullable: true })
  image: Buffer | null;

  @Column("varchar", { name: "fileName", nullable: true, length: 50 })
  fileName: string | null;

  @Column("int", { name: "likeNum", nullable: true })
  likeNum: number | null;

  @Column("int", { name: "viewNum", nullable: true })
  viewNum: number | null;

  @OneToMany(() => Comment, (comment) => comment.postIdx2)
  comments: Comment[];

  @OneToMany(() => LikePost, (likePost) => likePost.postIdx2)
  likePosts: LikePost[];
}
