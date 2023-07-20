import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import * as moment from "moment";
import { LikeComment } from "./LikeComment";
import { User } from "./User";

@Index("Comment_commentIdx_uindex", ["commentIdx"], { unique: true })
@Index("FK_Post_TO_Comment_1", ["postIdx"], {})
@Entity("Comment", { schema: "immersion_DB" })
export class Comment {
  @PrimaryGeneratedColumn({ type: "int", name: "commentIdx" })
  commentIdx: number;
  @Column("int", { primary: true, name: "postIdx" })
  postIdx: number;
  @Column("int", { name: "userIdx" })
  userIdx: number;
  @Column("int", { name: "parentCommentIdx", nullable: true })
  parentCommentIdx: number | null;
  @Column("int", { name: "depth", nullable: true })
  depth: number | null;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    transformer: {
      to(value: Date): string {
        return moment(value).format("YYYY-MM-DD HH:mm");
      },
      from(value: Date): string {
        return moment(value).format("YYYY-MM-DD HH:mm");
      },
    },
  })
  commentAt: string;

  @Column("varchar", { name: "commentContent", nullable: true, length: 500 })
  commentContent: string | null;
  @Column("bool", { name: "isDeleted", nullable: true })
  isDeleted: boolean | null;
  @Column("int", { name: "likeNum", nullable: true })
  likeNum: number | null;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "postIdx", referencedColumnName: "postIdx" }])
  postIdx2: Post;

  @OneToMany(() => LikeComment, (likeComment) => likeComment.commentIdx2)
  likeComments: LikeComment[];

  @ManyToOne(() => User)
  @JoinColumn({ name: "userIdx" })
  user: User;
}
