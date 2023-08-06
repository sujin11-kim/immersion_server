import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./Message";

@Index("ChatRoom_roomIdx_uindex", ["roomIdx"], { unique: true })
@Entity("ChatRoom", { schema: "immersion_DB" })
export class ChatRoom {
  @PrimaryGeneratedColumn({ type: "int", name: "roomIdx" })
  roomIdx: number;

  @Column("varchar", { name: "roomName", nullable: true, length: 50 })
  roomName: string | null;

  @Column("tinyint", { name: "isSentPush", nullable: true, width: 1 })
  isSentPush: boolean | null;

  @Column("tinyint", { name: "isLoginUser", nullable: true, width: 1 })
  isLoginUser: boolean | null;

  @Column("int", { name: "newMessageCount", nullable: true })
  newMessageCount: number | null;

  @Column("timestamp", { name: "createdAt", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updatedAt", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Message, (message) => message.roomIdx2)
  messages: Message[];
}
