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

@Index("Meun_meunIdx_uindex", ["meunIdx"], { unique: true })
@Index("FK_Restaurant_TO_Meun_1", ["restaurantIdx"], {})
@Entity("Meun", { schema: "immersion_DB" })
export class Meun {
  @PrimaryGeneratedColumn({ type: "int", name: "meunIdx" })
  meunIdx: number;

  @Column("int", { name: "restaurantIdx" })
  restaurantIdx: number;

  @Column("varchar", { name: "contentName", nullable: true, length: 100 })
  contentName: string | null;

  @Column("int", { name: "price", nullable: true })
  price: number | null;

  @Column("varchar", { name: "meunContent", nullable: true, length: 100 })
  meunContent: string | null;

  @Column("int", { name: "MeunViewNum", nullable: true })
  MeunViewNum: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column("varchar", { name: "MeunImage", nullable: true })
  MeunImage: string | null;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.meuns, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "restaurantIdx", referencedColumnName: "restaurantIdx" },
  ])
  restaurantIdx2: Restaurant;
}
