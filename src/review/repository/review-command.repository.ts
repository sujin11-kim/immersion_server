//creat,update,delete            save 관련
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
import { Post } from "resource/db/entities/Post";
import { Review } from "resource/db/entities/Review";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";

@Injectable()
export class CustomReviewCommandRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly reviewRepository: Repository<Review>
  ) {}

  async create(
    user: UserLoginDto,
    createReviewDto: CreateReviewDto
  ): Promise<Review> {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const review = queryRunner.manager.getRepository(Review).create();
      (review.userIdx = user.userIdx),
        (review.postIdx = createReviewDto.postIdx),
        (review.restaurantIdx = createReviewDto.restaurantIdx),
        (review.content = createReviewDto.content),
        (review.score = createReviewDto.score);
      await queryRunner.manager.getRepository(Review).save(review);

      await queryRunner.commitTransaction();
      return review;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    reviewIdx: number,
    updateReviewDto: UpdateReviewDto
  ): Promise<Review> {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const review = await queryRunner.manager
        .getRepository(Review)
        .findOne({ where: { reviewIdx } });

      if (!review) {
        throw new BadRequestException({
          statusCode: 2100,
          message: "존재하지 않는 리뷰 입니다.",
        });
      }

      const { content, score } = updateReviewDto;

      review.content = content;
      review.score = score;

      await queryRunner.manager.getRepository(Review).save(review);
      await queryRunner.commitTransaction();

      return review;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(reviewIdx: number): Promise<Review> {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const review = await queryRunner.manager
        .getRepository(Review)
        .findOne({ where: { reviewIdx } });

      if (!review) {
        throw new NotFoundException(`Review with ID ${reviewIdx} not found`);
      }
      await queryRunner.manager.getRepository(Review).delete(reviewIdx);
      return review;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
