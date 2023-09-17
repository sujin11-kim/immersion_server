import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Restaurant } from "./Restaurant";
import * as moment from "moment";

@Index("Menu_menuIdx_uindex", ["menuIdx"], { unique: true })
@Index("FK_Restaurant_TO_Menu_1", ["restaurantIdx"], {})
@Entity("Menu", { schema: "immersion_DB" })
export class Menu {
  @PrimaryGeneratedColumn({ type: "int", name: "menuIdx" })
  menuIdx: number;

  @Column("int", { name: "restaurantIdx" })
  restaurantIdx: number;

  @Column("varchar", { name: "menuName", length: 100 })
  menuName: string;

  @Column("varchar", { name: "menuContent", nullable: true, length: 1000 })
  menuContent: string | null;

  @Column("int", { name: "price" })
  price: number;

  @Column("int", { name: "viewNum", nullable: true })
  viewNum: number | null;

  @Column("varchar", { name: "MenuImage", nullable: true })
  menuImage: string | null;

  @Column({
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
  saleClosingTime: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "restaurantIdx", referencedColumnName: "restaurantIdx" },
  ])
  restaurantIdx2: Restaurant;
}
