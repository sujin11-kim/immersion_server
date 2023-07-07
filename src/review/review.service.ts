import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Review } from "mymodel/entities/Review";
import { DataSource, Repository } from "typeorm";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { number } from "joi";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { Post } from "mymodel/entities/Post";
import { User } from "mymodel/entities/User";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepostitory: Repository<Review>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  async create(user: UserLoginDto, createReviewDto: CreateReviewDto) {
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

  async getAllReview() {
    return await this.reviewRepostitory.find();
  }

  async getoneReview(reviewIdx: number) {
    const review = await this.reviewRepostitory.findOneBy({ reviewIdx });
    if (!review) {
      throw new NotFoundException(`Review with ID ${reviewIdx} not found`);
    }

    return review;
  }

  async update(reviewIdx: number, updateReviewDto: UpdateReviewDto) {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const review = await queryRunner.manager
        .getRepository(Review)
        .findOne({ where: { reviewIdx } });

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

  async delete(reviewIdx: number) {
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
      console.log("11111111111111111111111");
      await queryRunner.manager.getRepository(Review).delete(reviewIdx);
      console.log("212222222222222222");
      // await this.reviewRepostitory.delete(reviewIdx);
      // console.log("33333333333");
      return review;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
