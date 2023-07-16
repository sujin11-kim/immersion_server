import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("FK_User_TO_Restaurant_1", ["userIdx"], {})
@Entity("Restaurant", { schema: "immersion_DB" })
export class Restaurant {
  @PrimaryGeneratedColumn({ type: "int", name: "restaurantIdx" })
  restaurantIdx: number;

  @Column("int", { name: "userIdx" })
  userIdx: number;

  @Column("varchar", { name: "restaurantName", nullable: true, length: 20 })
  restaurantName: string | null;

  @Column("time", { name: "openTime", nullable: true })
  openTime: string | null;

  @Column("time", { name: "closeTime", nullable: true })
  closeTime: string | null;

  @Column("char", { name: "telNum", nullable: true, length: 11 })
  telNum: string | null;

  @Column("tinyint", { name: "isAuthorized", nullable: true, width: 1 })
  isAuthorized: boolean | null;

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

  @Column("tinyint", { name: "isPostedToday", nullable: true, width: 1 })
  isPostedToday: boolean | null;

  @ManyToOne(() => User, (user) => user.restaurants, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userIdx", referencedColumnName: "userIdx" }])
  userIdx2: User;
}
