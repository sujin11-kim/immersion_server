// import {
//   Column,
//   Entity,
//   Index,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { ChatRoom } from "./ChatRoom";
// import { ChatUser } from "./ChatUser";

// @Index("Message_messageIdx_uindex", ["messageIdx"], { unique: true })
// @Index("FK_ChatUser_TO_Message_1", ["chatUserIdx"], {})
// @Index("FK_ChatRoom_TO_Message_1", ["roomIdx"], {})
// @Entity("Message", { schema: "immersion_DB" })
// export class Message {
//   @PrimaryGeneratedColumn({ type: "int", name: "messageIdx" })
//   messageIdx: number;

//   @Column("int", { primary: true, name: "chatUserIdx" })
//   chatUserIdx: number;

//   @Column("int", { primary: true, name: "roomIdx" })
//   roomIdx: number;

//   @Column("varchar", { name: "content", nullable: true, length: 2000 })
//   content: string | null;

//   @Column("timestamp", { name: "createdAt", nullable: true })
//   createdAt: Date | null;

//   @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages, {
//     onDelete: "NO ACTION",
//     onUpdate: "NO ACTION",
//   })
//   @JoinColumn([{ name: "roomIdx", referencedColumnName: "roomIdx" }])
//   roomIdx2: ChatRoom;

//   @ManyToOne(() => ChatUser, (chatUser) => chatUser.messages, {
//     onDelete: "NO ACTION",
//     onUpdate: "NO ACTION",
//   })
//   @JoinColumn([{ name: "chatUserIdx", referencedColumnName: "chatUserIdx" }])
//   chatUserIdx2: ChatUser;
// }
