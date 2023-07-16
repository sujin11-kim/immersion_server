import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, QueryRunner } from "typeorm";
import { Post } from "../../../resource/db/entities/Post";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { Image } from "../../../resource/db/entities/Image";
import { readonlyPostDto } from "../dto/readonly-post.dto";
import * as multerS3 from "multer-s3";
import { AwsService } from "src/aop/utils/aws.service";
import { User } from "../../../resource/db/entities/User";
import { Comment } from "../../../resource/db/entities/Comment";
import { LikePost } from "../../../resource/db/entities/LikePost";

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
        where: { userIdx: user.userIdx },
      });

      const post = new Post();
      post.userIdx = user.userIdx;
      post.category = category;
      post.title = title;
      post.content = this.validateContent(content);
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
        nickName: loginUser.nickName,
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

  async findAll(page: number, pageSize: number): Promise<readonlyPostDto[]> {
    if (page <= 0 || pageSize <= 0) {
      throw new HttpException(
        { message: "Page and pageSize must be greater than 0." },
        201
      );
    }

    const manager = this.dataSource.manager;
    const offset = (page - 1) * pageSize;
    const posts = await manager.find(Post, {
      skip: offset,
      take: pageSize,
    });
    const result: readonlyPostDto[] = await Promise.all(
      posts.map(async (post) => {
        const user = await manager.findOne(User, {
          where: { userIdx: post.userIdx },
        });

        const nickName = user ? user.nickName : "";

        const images = await manager.find(Image, {
          where: { postIdx: post.postIdx },
        });
        const imagePath = images.map((image) => image.path);

        const comments = await manager.find(Comment, {
          where: { postIdx: post.postIdx },
        });
        const commentList = comments.map((comment) => comment);

        return {
          ...post,
          nickName,
          imagePath,
          commentList,
        };
      })
    );
    return result;
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

  validateContent(content: string) {
    const maxContentLength = 5;
    const contentWithoutEmojis = content.replace(/[\u{1F600}-\u{1F6FF}]/gu, ""); // 이모지 제거
    const contentWithoutSpecialChars = contentWithoutEmojis.replace(
      /[^\w\s]/gi,
      ""
    ); // 특수문자 제거
    const contentWithoutSpecialCharsAndSpaces =
      contentWithoutSpecialChars.replace(/\s/g, ""); // 공백 제거

    if (contentWithoutSpecialCharsAndSpaces.length > maxContentLength) {
      throw new HttpException(
        { message: "Content length exceeds the maximum allowed limit." },
        201
      );
    }

    return contentWithoutSpecialChars;
  }
}
