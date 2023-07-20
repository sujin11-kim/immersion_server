import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { User } from "resource/db/entities/User";
import { Image } from "resource/db/entities/Image";
import { Comment } from "resource/db/entities/Comment";
import { readonlyPostDto } from "../dto/readonly-post.dto";
import { LikeComment } from "resource/db/entities/LikeComment";
import { LikePost } from "resource/db/entities/LikePost";

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
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(LikePost)
    private readonly likePostRepository: Repository<LikePost>
  ) {}

  // userIdx로 post 조회
  async findPostsById(userIdx: number): Promise<Post[]> {
    const posts = await this.postRepository.find({
      where: { userIdx },
    });

    if (posts.length === 0) {
      throw new BadRequestException({
        statusCode: 2102,
        message: "해당 유저의 게시물이 존재하지 않습니다.",
        result: [],
      });
    }

    return posts;
  }

  // 카테고리로 post 조회
  async findPostsByCategory(category: string): Promise<Post[]> {
    const posts = await this.postRepository.find({
      where: { category },
    });

    if (posts.length === 0) {
      throw new BadRequestException({
        statusCode: 2103,
        message: "해당 카테고리의 게시물이 존재하지 않습니다.",
        result: [],
      });
    }
    return posts;
  }

  // 조회하려는 게시물 수가 전체 개시물 수 초과하는지 확인
  async checkTotalPostCountExceeded(page: number, pageSize: number) {
    const totalPosts = await this.postRepository.count();
    if (page + pageSize - 1 > 0) {
      throw new BadRequestException({
        statusCode: 2103,
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
    return posts;
  }

  // 게시물에 해당하는 이미지, 댓글 가져오기
  async getPostWithImageComment(posts: Post[]) {
    const result: readonlyPostDto[] = await Promise.all(
      posts.map(async (post) => {
        const user = await this.userRepository.findOne({
          where: { userIdx: post.userIdx },
        });
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

  // post 조회
  async findPostByPostIdx(postIdx: number): Promise<Post | undefined> {
    const post = await this.postRepository.findOne({
      where: { postIdx },
    });
    if (!post) {
      throw new BadRequestException({
        statusCode: 2104,
        message: `postIdx:${postIdx} 에 해당하는 게시물이 없습니다.`,
        result: {},
      });
    }
    return post;
  }

  async checkUserLikedPost(post: Post, userIdx: number) {
    const likeCount = await this.likePostRepository.count({
      where: { postIdx: post.postIdx, userIdx: userIdx },
    });

    if (likeCount === 0) {
      throw new BadRequestException({
        statusCode: 2105,
        message: "해당 게시물에 좋아요를 누르지 않은 유저입니다.",
        result: {},
      });
    }
  }
}
