import { Column, Entity } from "typeorm";

@Entity("User", { schema: "immersion_DB" })
export class User {
  @Column("int", { name: "ID", nullable: true })
  id: number | null;

  @Column("varchar", { name: "name", nullable: true, length: 10 })
  name: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 30 })
  phone: string | null;
}
