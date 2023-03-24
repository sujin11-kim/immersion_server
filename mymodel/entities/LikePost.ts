// import {
//   Column,
//   Entity,
//   Index,
//   JoinColumn,
//   ManyToOne,
//   OneToOne,
// } from "typeorm";
// import { Post } from "./Post";
// import { User } from "./User";

// @Index("FK_Post_TO_LikePost_1", ["postIdx"], {})
// @Entity("LikePost", { schema: "immersion_DB" })
// export class LikePost {
//   @Column("int", { primary: true, name: "userIdx" })
//   userIdx: number;

//   @Column("int", { name: "postIdx" })
//   postIdx: number;

//   @ManyToOne(() => Post, (post) => post.likePosts, {
//     onDelete: "NO ACTION",
//     onUpdate: "NO ACTION",
//   })
//   @JoinColumn([{ name: "postIdx", referencedColumnName: "postIdx" }])
//   postIdx2: Post;

//   @OneToOne(() => User, (user) => user.likePost, {
//     onDelete: "NO ACTION",
//     onUpdate: "NO ACTION",
//   })
//   @JoinColumn([{ name: "userIdx", referencedColumnName: "userIdx" }])
//   userIdx2: User;
// }
