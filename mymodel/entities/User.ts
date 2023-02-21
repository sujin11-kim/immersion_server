import { Column, Entity } from "typeorm";

@Entity("user", { schema: "immersion_DB" })
export class User {
  @Column("varchar", { primary: true, name: "id", length: 15 })
  id: string;

  @Column("varchar", { name: "nickname", nullable: true, length: 20 })
  nickname: string | null;

  @Column("char", { name: "phone", nullable: true, length: 11 })
  phone: string | null;

  @Column("varchar", { name: "favorite", nullable: true, length: 50 })
  favorite: string | null;

  @Column("datetime", { name: "enrolldate", nullable: true })
  enrolldate: Date | null;

  @Column("char", { name: "regflag", nullable: true, length: 1 })
  regflag: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 300 })
  password: string | null;

  @Column("varchar", { name: "type", nullable: true, length: 300 })
  type: string | null;
}
