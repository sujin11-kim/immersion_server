//read    find, find 관련
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "resource/db/entities/Review";
import { Post } from "resource/db/entities/Post";

@Injectable()
export class CustomReviewQueryRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  async reviewfind() {
    return await this.reviewRepository.find();
  }

  async reviewonefind(reviewIdx: number) {
    const review = await this.reviewRepository.findOneBy({ reviewIdx });
    return review;
  }


  async postonefind(postIdx: number) {
    const review = await this.postRepository.findOneBy({ postIdx });
    return review;
  }




}
