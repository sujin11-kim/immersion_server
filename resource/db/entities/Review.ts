import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ReviewImage } from "./ReviewImage";
import { ReviewComment } from "./ReviewComment";

@Entity("Review", { schema: "immersion_DB" })
export class Review {
  @PrimaryGeneratedColumn({ type: "int", name: "reviewIdx" })
  reviewIdx: number;

  @Column("int", { name: "userIdx" })
  userIdx: number;

  @Column("int", { name: "postIdx" })
  postIdx: number;

  @Column("int", { name: "restaurantIdx" })
  restaurantIdx: number;

  @Column("varchar", { name: "content", nullable: true, length: 300 })
  content: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column("double", { name: "score", nullable: true })
  score: number | null;

  @OneToMany(() => ReviewImage, (reviewImage) => reviewImage.reviewIdx2)
  Images: ReviewImage[];

  @OneToOne(() => ReviewComment, (reviewComment) => reviewComment.reviewIdx2) // 수정
  comment: ReviewComment;
}
