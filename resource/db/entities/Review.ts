import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
}
