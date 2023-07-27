import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
import { Post } from "resource/db/entities/Post";
import { Review } from "resource/db/entities/Review";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";
export declare class CustomReviewCommandRepository {
    private readonly userRepository;
    private readonly postRepository;
    private readonly reviewRepository;
    constructor(userRepository: Repository<User>, postRepository: Repository<Post>, reviewRepository: Repository<Review>);
    create(user: UserLoginDto, createReviewDto: CreateReviewDto): Promise<Review>;
    update(reviewIdx: number, updateReviewDto: UpdateReviewDto): Promise<Review>;
    delete(reviewIdx: number): Promise<Review>;
}
