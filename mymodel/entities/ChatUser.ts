// import {
//   Column,
//   Entity,
//   Index,
//   JoinColumn,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { User } from "./User";
// import { Message } from "./Message";

// @Index("ChatUser_chatUserIdx_uindex", ["chatUserIdx"], { unique: true })
// @Index("FK_User_TO_ChatUser_1", ["userIdx"], {})
// @Entity("ChatUser", { schema: "immersion_DB" })
// export class ChatUser {
//   @PrimaryGeneratedColumn({ type: "int", name: "chatUserIdx" })
//   chatUserIdx: number;

//   @Column("int", { name: "userIdx" })
//   userIdx: number;

//   @ManyToOne(() => User, (user) => user.chatUsers, {
//     onDelete: "NO ACTION",
//     onUpdate: "NO ACTION",
//   })
//   @JoinColumn([{ name: "userIdx", referencedColumnName: "userIdx" }])
//   userIdx2: User;

//   @OneToMany(() => Message, (message) => message.chatUserIdx2)
//   messages: Message[];
// }
