import { Menu } from "./Menu";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { RestaurantImage } from "./RestaurantImage";

@Index("FK_User_TO_Restaurant_1", ["userIdx"], {})
@Entity("Restaurant", { schema: "immersion_DB" })
export class Restaurant {
  @PrimaryGeneratedColumn({ type: "int", name: "restaurantIdx" })
  restaurantIdx: number;

  @Column("int", { name: "userIdx" })
  userIdx: number;

  @Column("varchar", { name: "restaurantName", nullable: true, length: 20 })
  restaurantName: string | null;

  @Column("time", { name: "openTime" })
  openTime: string | null;

  @Column("time", { name: "closeTime" })
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

  @Column("varchar", { name: "restaurantIntro", nullable: true, length: 300 })
  restaurantIntro: string | null;

  @Column("tinyint", { name: "isPostedToday", nullable: true, width: 1 })
  isPostedToday: boolean | null;

  @ManyToOne(() => User, (user) => user.restaurants, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userIdx", referencedColumnName: "userIdx" }])
  userIdx2: User;

  @OneToMany(() => Menu, (menu) => menu.restaurantIdx2)
  menus: Menu[];

  @OneToMany(
    () => RestaurantImage,
    (restaurantImage) => restaurantImage.restaurantIdx2
  )
  Images: RestaurantImage[];
}
