import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChatUser } from "./ChatUser";
import { LikePost } from "./LikePost";
import { Restaurant } from "./Restaurant";

@Index("User_id_uindex", ["id"], { unique: true })
@Index("User_userIdx_uindex", ["userIdx"], { unique: true })
@Entity("User", { schema: "immersion_DB" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "userIdx" })
  userIdx: number;

  @Column("int", { name: "id", unique: true })
  id: number;

  @Column("varchar", { name: "nickName", nullable: true, length: 20 })
  nickName: string | null;

  @Column("char", { name: "phone", nullable: true, length: 11 })
  phone: string | null;

  @CreateDateColumn()
  enrollDate: Date | null;

  @Column("varchar", { name: "password", nullable: true, length: 300 })
  password: string | null;

  @Column("double", {
    name: "latitude",
    nullable: true,
    precision: 22,
    default: () => "'0'",
  })
  latitude: number | null;

  @Column("double", {
    name: "longitude",
    nullable: true,
    precision: 22,
    default: () => "'0'",
  })
  longitude: number | null;

  @OneToMany(() => ChatUser, (chatUser) => chatUser.userIdx2)
  chatUsers: ChatUser[];

  @OneToOne(() => LikePost, (likePost) => likePost.userId2)
  likePost: LikePost;
  @OneToMany(() => Restaurant, (restaurant) => restaurant.userIdx2)
  restaurants: Restaurant[];
}
