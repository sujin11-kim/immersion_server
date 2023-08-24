import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as moment from "moment";
import { Review } from "./Review";

@Index("ReviewComment_commentIdx_uindex", ["commentIdx"], { unique: true })
@Index("FK_Review_TO_ReviewComment_1", ["reviewIdx"], {})
@Entity("ReviewComment", { schema: "immersion_DB" })
export class ReviewComment {
  @PrimaryGeneratedColumn({ type: "int", name: "commentIdx" })
  commentIdx: number;

  @Column("int", { name: "reviewIdx" })
  reviewIdx: number;

  @Column("varchar", { name: "content", nullable: true, length: 1000 })
  content: string | null;

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
  createdAt: string;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    transformer: {
      to(value: Date): string {
        return moment(value).format("YYYY-MM-DD HH:mm");
      },
      from(value: Date): string {
        return moment(value).format("YYYY-MM-DD HH:mm");
      },
    },
  })
  updatedAt: string;

  @OneToOne(() => Review, (review) => review.comment)
  @JoinColumn({ name: "reviewIdx", referencedColumnName: "reviewIdx" })
  reviewIdx2: Review;
}
