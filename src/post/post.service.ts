import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, QueryRunner } from "typeorm";
import { Post } from "../../mymodel/entities/Post";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { Image } from "mymodel/entities/Image";
import { readonlyPostDto } from "./dto/readonly-post.dto";
import * as multerS3 from "multer-s3";
import * as AWS from "aws-sdk";
import { AwsService } from "src/aws.service";
import { User } from "mymodel/entities/User";
import { Comment } from "mymodel/entities/Comment";
import { LikePost } from "mymodel/entities/LikePost";

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
    private dataSource: DataSource
  ) {}

  async createPost(
    user: UserLoginDto,
    category: string,
    title: string,
    content: string,
    files: multerS3.File[]
  ): Promise<readonlyPostDto> {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const loginUser = await this.userRepository.findOne({
        where: { id: user.id },
      });
      const nickName = loginUser.nickName;

      const post = new Post();
      post.writeIdx = user.id;
      post.category = category;
      post.title = title;
      post.content = content;
      post.nickName = nickName;
      const savedPost = await queryRunner.manager.save(post);

      const pathArray = [];

      const imagePromise = files.map(async (file) => {
        const s3Object = await this.awsService.uploadFileToS3("post", file);
        const image = new Image();
        image.postIdx = savedPost.postIdx;
        image.path = this.awsService.getAwsS3FileUrl(s3Object.key);
        pathArray.push(image.path);
        image.imageName = file.originalname;
        image.size = file.size;
        image.Type = file.mimetype;
        image.imageKey = s3Object.key;
        return queryRunner.manager.save(image);
      });
      await Promise.all(imagePromise);

      await queryRunner.commitTransaction();
      return {
        ...savedPost,
        imagePath: pathArray,
        commentList: [],
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<readonlyPostDto[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      const posts = await queryRunner.manager.find(Post);
      const result: readonlyPostDto[] = await Promise.all(
        posts.map(async (post) => {
          const images = await queryRunner.manager.find(Image, {
            where: { postIdx: post.postIdx },
          });
          const imagePath = images.map((image) => image.path);
          const Comments = await queryRunner.manager.find(Comment, {
            where: { postIdx: post.postIdx },
          });
          const commentList = Comments.map((comment) => comment);
          return { ...post, imagePath, commentList };
        })
      );
      return result;
    } finally {
      await queryRunner.release();
    }
  }

  async findIdPost(id: number): Promise<readonlyPostDto[]> {
    const posts = await this.postRepository.find({
      where: { writeIdx: id },
    });

    const readonlyPosts = [];

    for (const post of posts) {
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
      likePost.userId = user.id;
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

      await this.likePostRepository.delete({ userId: user.id });

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
