//read    find, find 관련
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
import { Post } from "resource/db/entities/Post";
import { Review } from "resource/db/entities/Review";

@Injectable()
export class CustomReviewQueryRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>
  ) {}

  async reviewfind() {
    return await this.reviewRepository.find();
  }

  async reviewonefind(reviewIdx: number) {
    const review = await this.reviewRepository.findOneBy({ reviewIdx });
    if (!review) {
      throw new NotFoundException(`Review with ID ${reviewIdx} not found`);
    }

    return review;
  }
}
