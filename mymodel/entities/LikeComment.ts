// import {
//   Column,
//   Entity,
//   Index,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { Post } from "./Post";
// import { User } from "./User";
// import { Comment } from "./Comment";

// // TODO__@Index("FK_Post_TO_LikePost_1", ["postIdx"], {})
// @Entity("LikeComments", { schema: "immersion_DB" })
// export class LikeComments {
//   @PrimaryGeneratedColumn({ type: "int", name: "commentlikeIdx" })
//   commentlikeIdx: number;

//   @Column("int", { name: "userIdx" })
//   userIdx: number;

//   @Column("int", { name: "postIdx" })
//   postIdx: number;

//   @Column("int", { name: "commentIdx" })
//   commentIdx: number;

//   @ManyToOne(() => Post, (post) => post.likePosts, {
//     onDelete: "NO ACTION",
//     onUpdate: "NO ACTION",
//   })
//   @JoinColumn([{ name: "postIdx", referencedColumnName: "postIdx" }])
//   postIdx2: Post;

//   @ManyToOne(() => User, (user) => user.likePost, {
//     onDelete: "NO ACTION",
//     onUpdate: "NO ACTION",
//   })
//   @JoinColumn([{ name: "userIdx", referencedColumnName: "userIdx" }])
//   userIdx2: User;

//   @ManyToOne(() => User, (user) => user.likePost, {
//     onDelete: "NO ACTION",
//     onUpdate: "NO ACTION",
//   })
//   @JoinColumn([{ name: "userIdx", referencedColumnName: "userIdx" }])
//   userIdx2: User;
// }
