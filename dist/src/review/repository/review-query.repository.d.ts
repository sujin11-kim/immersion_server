import { Repository } from "typeorm";
import { Review } from "resource/db/entities/Review";
import { Post } from "resource/db/entities/Post";
export declare class CustomReviewQueryRepository {
    private readonly reviewRepository;
    private readonly postRepository;
    constructor(reviewRepository: Repository<Review>, postRepository: Repository<Post>);
    reviewfind(): Promise<Review[]>;
    reviewonefind(reviewIdx: number): Promise<Review>;
    postonefind(postIdx: number): Promise<Post>;
}
