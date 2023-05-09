import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";

@Index("Comment_commentIdx_uindex", ["commentIdx"], { unique: true })
@Index("FK_Post_TO_Comment_1", ["postIdx"], {})
@Entity("Comment", { schema: "immersion_DB" })
export class Comment {
  @PrimaryGeneratedColumn({ type: "int", name: "commentIdx" })
  commentIdx: number;

  @Column("int", { primary: true, name: "postIdx" })
  postIdx: number;

  @Column("varchar", { name: "CommentWriter", nullable: true, length: 20 })
  CommentWriter: string | null;

  @Column("int", { name: "parentCommentIdx", nullable: true })
  parentCommentIdx: number | null;

  @Column("int", { name: "depth", nullable: true })
  depth: number | null;

  @CreateDateColumn()
  commentAt: Date | null;

  @Column("varchar", { name: "commentContent", nullable: true, length: 500 })
  commentContent: string | null;

  @Column("bool", { name: "isDeleted", nullable: true })
  isDeleted: boolean | null;

  @Column("int", { name: "writeIdx", nullable: true })
  writeIdx: number | null;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "postIdx", referencedColumnName: "postIdx" }])
  postIdx2: Post;
}
