import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
import { Post } from "resource/db/entities/Post";
import { Review } from "resource/db/entities/Review";
export declare class CustomReviewQueryRepository {
    private readonly userRepository;
    private readonly postRepository;
    private readonly reviewRepository;
    constructor(userRepository: Repository<User>, postRepository: Repository<Post>, reviewRepository: Repository<Review>);
    reviewfind(): Promise<Review[]>;
    reviewonefind(reviewIdx: number): Promise<Review>;
}
