import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Review } from "./Review";

@Entity("ReviewImage", { schema: "immersion_DB" })
export class ReviewImage {
  @PrimaryGeneratedColumn({ type: "int", name: "imageIdx" })
  imageIdx: number;

  @Column("int", { name: "reviewIdx" })
  reviewIdx: number;

  @Column("varchar", { name: "imagePath", length: 1000 })
  imagePath: string;

  @ManyToOne(() => Review, (review) => review.reviewIdx, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "reviewIdx", referencedColumnName: "reviewIdx" }])
  reviewIdx2: Review;
}
