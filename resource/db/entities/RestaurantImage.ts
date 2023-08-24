import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Restaurant } from "./Restaurant";

@Entity("RestaurantImage", { schema: "immersion_DB" })
export class RestaurantImage {
  @PrimaryGeneratedColumn({ type: "int", name: "imageIdx" })
  imageIdx: number;

  @Column("int", { name: "restaurantIdx" })
  restaurantIdx: number;

  @Column("varchar", { name: "imagePath", length: 1000 })
  imagePath: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.restaurantIdx, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "restaurantIdx", referencedColumnName: "restaurantIdx" },
  ])
  restaurantIdx2: Restaurant;
}
