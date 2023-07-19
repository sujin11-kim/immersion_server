import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { User } from "resource/db/entities/User";
import { Image } from "resource/db/entities/Image";
import { Comment } from "resource/db/entities/Comment";
import { readonlyPostDto } from "../dto/readonly-post.dto";

@Injectable()
export class CustomPostQueryRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  // 조회하려는 게시물 수가 전체 개시물 수 초과하는지 확인
  async checkTotalPostCountExceeded(page: number, pageSize: number) {
    const totalPosts = await this.postRepository.count();
    console.log(page, pageSize, totalPosts);
    if (page + pageSize - 1 > 0) {
      console.log("초과");
      throw new BadRequestException({
        statusCode: 2102,
        message: `전체 게시물 수 ${totalPosts}개를 초과하여 조회할 수 없습니다.`,
        result: {},
      });
    }
  }

  // post 조회
  async findPosts(offset: number, pageSize: number): Promise<Post[]> {
    const posts = await this.postRepository.find({
      skip: offset,
      take: pageSize,
    });
    console.log(posts);
    return posts;
  }

  // 게시물에 해당하는 이미지, 댓글 가져오기
  async getPostWithImageComment(posts: Post[]) {
    const result: readonlyPostDto[] = await Promise.all(
      posts.map(async (post) => {
        const user = await this.userRepository.findOne({
          where: { userIdx: post.userIdx },
        });
        if (!user) {
          throw new BadRequestException({
            statusCode: 2103,
            message: `postIdx : ${post.postIdx}의 유저가 존재하지 않습니다.`,
            result: {},
          });
        }
        const nickName = user ? user.nickName : "";

        const images = await this.imageRepository.find({
          where: { postIdx: post.postIdx },
        });
        const imagePath = images.map((image) => image.path);

        const comments = await this.commentRepository.find({
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
}
