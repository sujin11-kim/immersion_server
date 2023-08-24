import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity("Image", { schema: "immersion_DB" })
export class Image {
  @PrimaryGeneratedColumn({ type: "int", name: "imageIdx" })
  imageIdx: number;

  @Column("int", { name: "postIdx" })
  postIdx: number;

  @Column("varchar", { name: "path", length: 100 })
  path: string;

  @Column("varchar", { name: "imageName", length: 255 })
  imageName: string;

  @Column("int", { name: "size" })
  size: number;

  @Column("varchar", { name: "Type", length: 100 })
  Type: string;

  @Column("varchar", { name: "imageKey", length: 100 })
  imageKey: string;

  @ManyToOne(() => Post, (post) => post.postIdx, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "postIdx", referencedColumnName: "postIdx" }])
  postIdx2: Post;
}
