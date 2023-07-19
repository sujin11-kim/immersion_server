import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { User } from "resource/db/entities/User";
import { Image } from "resource/db/entities/Image";
import { CreatePostDto } from "../dto/create-post.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { readonlyPostDto } from "../dto/readonly-post.dto";

@Injectable()
export class CustomPostCommandRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}

  // 게시물 정보 저장
  async savePost(
    postInfo: CreatePostDto,
    user: UserLoginDto
  ): Promise<readonlyPostDto> {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const post = queryRunner.manager.getRepository(Post).create();
      post.userIdx = user.userIdx;
      post.category = postInfo.category;
      post.title = postInfo.title;
      post.content = postInfo.content;

      // 공백 제거 후 글자수 제한 -> pipe로 수정
      const maxContentLength = 1000;
      const contentWithoutSpace = post.content.replace(/\s/g, "");
      if (contentWithoutSpace.length > maxContentLength) {
        throw new BadRequestException({
          statusCode: 2101,
          message: "Content length exceeds the maximum allowed limit.",
          result: {},
        });
      }

      const savedPost = await queryRunner.manager
        .getRepository(Post)
        .save(post);

      const imagePromises = postInfo.image.map(async (imagePath) => {
        const image = queryRunner.manager.getRepository(Image).create();
        image.postIdx = savedPost.postIdx;
        image.path = imagePath;
        await queryRunner.manager.getRepository(Image).save(image);
      });

      await Promise.all(imagePromises);

      await queryRunner.commitTransaction();
      return {
        ...savedPost,
        nickName: user.nickName,
        imagePath: postInfo.image,
        commentList: [],
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
