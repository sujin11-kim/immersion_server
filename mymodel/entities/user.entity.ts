import { Column, Entity } from "typeorm";

@Entity("user", { schema: "immersion_DB" }) //user=USER
export class User {
  @Column("varchar", { primary: true, name: "id", length: 10 })
  id: number;

  @Column("varchar", { name: "nickname", nullable: true, length: 20 })
  nickname: string | null;

  @Column("char", { name: "phone", nullable: true, length: 11 })
  phone: string | null;

  @Column("datetime", { name: "enrolldate", nullable: true })
  enrolldate: Date | null;

  @Column("varchar", { name: "password", nullable: true, length: 300 })
  password: string | null;
}
