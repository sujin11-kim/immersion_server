import { Repository } from "typeorm";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { Review } from "resource/db/entities/Review";
import { Restaurant } from "resource/db/entities/Restaurant";
import { ReviewComment } from "resource/db/entities/ReviewComment";
export declare class CustomReviewCommentQueryRepository {
    private readonly reviewRepository;
    private readonly restaurantRepository;
    private readonly reviewCommentRepository;
    private errorResponse;
    constructor(reviewRepository: Repository<Review>, restaurantRepository: Repository<Restaurant>, reviewCommentRepository: Repository<ReviewComment>, errorResponse: ErrorResponse);
    isReviewExist(reviewIdx: number): Promise<Review>;
    isCommentExist(reviewIdx: number): Promise<ReviewComment>;
}
