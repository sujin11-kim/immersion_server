import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
import { Post } from "../../../resource/db/entities/Post";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { Image } from "../../../resource/db/entities/Image";
import { readonlyPostDto } from "../dto/readonly-post.dto";
import { AwsService } from "src/aop/utils/aws.service";
import { User } from "../../../resource/db/entities/User";
import { Comment } from "../../../resource/db/entities/Comment";
import { LikePost } from "../../../resource/db/entities/LikePost";
import { CreatePostDto } from "../dto/create-post.dto";
import { PostImpl } from "../interface/post.implement";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(LikePost)
    private readonly likePostRepository: Repository<LikePost>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly awsService: AwsService,
    private dataSource: DataSource,
    private postInterface: PostImpl
  ) {}

  // 2-1 로그인한 user로 게시물 작성
  async createPost(
    user: UserLoginDto,
    postInfo: CreatePostDto
  ): Promise<readonlyPostDto> {
    return await this.postInterface.createPost(user, postInfo);
  }

  // 2-4 게시물 전체 조회
  async findAll(page: number, pageSize: number): Promise<readonlyPostDto[]> {
    return await this.postInterface.findAll(page, pageSize);
  }

  async findIdPost(userIdx: number): Promise<readonlyPostDto[]> {
    const posts = await this.postRepository.find({
      where: { userIdx },
    });

    const readonlyPosts = [];

    for (const post of posts) {
      const user = await this.userRepository.findOne({
        where: { userIdx: post.userIdx },
      });
      const nickName = user ? user.nickName : "";

      const images = await this.imageRepository.find({
        where: { postIdx: post.postIdx },
      });
      const imagePath = images.map((image) => image.path);

      const Comments = await this.commentRepository.find({
        where: { postIdx: post.postIdx },
      });
      const commentList = Comments.map((comment) => comment);

      const readonlyPost: readonlyPostDto = {
        ...post,
        nickName,
        imagePath,
        commentList,
      };
      readonlyPosts.push(readonlyPost);
    }

    return readonlyPosts;
  }

  async findCategoryPost(category: string): Promise<readonlyPostDto[]> {
    console.log(category);
    const posts = await this.postRepository.find({
      where: { category: category },
    });

    const readonlyPosts = [];

    for (const post of posts) {
      const user = await this.userRepository.findOne({
        where: { userIdx: post.userIdx },
      });
      const nickName = user ? user.nickName : "";

      const images = await this.imageRepository.find({
        where: { postIdx: post.postIdx },
      });
      const imagePath = images.map((image) => image.path);

      const Comments = await this.commentRepository.find({
        where: { postIdx: post.postIdx },
      });
      const commentList = Comments.map((comment) => comment);

      const readonlyPost: readonlyPostDto = {
        ...post,
        nickName,
        imagePath,
        commentList,
      };
      readonlyPosts.push(readonlyPost);
    }

    return readonlyPosts;
  }

  async postLike(user: UserLoginDto, postIdx: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const editpost = await this.postRepository.findOne({
        where: { postIdx },
      });

      editpost.likeNum += 1;
      const likeEditPost = await queryRunner.manager.save(editpost);

      const likePost = new LikePost();
      likePost.postIdx = postIdx;
      likePost.userIdx = user.userIdx;
      await queryRunner.manager.save(likePost);

      const images = await this.imageRepository.find({
        where: { postIdx },
      });
      const imagePath = images.map((image) => image.path);

      const Comments = await this.commentRepository.find({
        where: { postIdx },
      });
      const commentList = Comments.map((comment) => comment);

      const readonlyPost: readonlyPostDto = {
        ...likeEditPost,
        nickName: user.nickName,
        imagePath,
        commentList,
      };

      await queryRunner.commitTransaction();
      console.log("성공");
      return readonlyPost;
    } catch (error) {
      console.log("실패");
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      console.log("실패?");
      await queryRunner.release();
    }
  }

  async postLikeCancel(user: UserLoginDto, postIdx: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const editpost = await this.postRepository.findOne({
        where: { postIdx },
      });

      editpost.likeNum -= 1;
      const likeEditPost = await queryRunner.manager.save(editpost);

      await this.likePostRepository.delete({ userIdx: user.userIdx });

      const images = await this.imageRepository.find({
        where: { postIdx },
      });
      const imagePath = images.map((image) => image.path);

      const Comments = await this.commentRepository.find({
        where: { postIdx },
      });
      const commentList = Comments.map((comment) => comment);

      const readonlyPost: readonlyPostDto = {
        ...likeEditPost,
        nickName: user.nickName,
        imagePath,
        commentList,
      };

      await queryRunner.commitTransaction();

      return readonlyPost;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
