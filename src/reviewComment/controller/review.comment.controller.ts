import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  UseInterceptors,
  UseFilters,
  Patch,
  Delete,
} from "@nestjs/common";
import { ReviewCommentService } from "../service/review.comment.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/utils/jwt/jwt.guard";
import { SuccessInterceptor } from "../../../src/aop/interceptors/success.interceptor";
import { HttpExceptionFilter } from "../../../src/aop/exception/http-exception.filter";
import { CurrentUser } from "../../../src/aop/decorators/user.decorator";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreateReviewCommentDto } from "../dto/create-review-comment.dto";

@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags("REVEIW_COMMENT")
@Controller("review/comment")
export class ReviewCommentController {
  constructor(private readonly reviewCommentService: ReviewCommentService) {}

  // 리뷰에 사장님이 댓글 생성
  @ApiOperation({ summary: "리뷰 댓글 생성" })
  @UseGuards(JwtAuthGuard)
  @Post("/create")
  createReviewComment(
    @Body() createReviewCommentDto: CreateReviewCommentDto,
    @CurrentUser() user: UserLoginDto
  ) {
    return this.reviewCommentService.createReviewComment(
      user.userIdx,
      createReviewCommentDto
    );
  }

  // 리뷰에 댓글 단 사장님이 댓글 수정
  @ApiOperation({ summary: "리뷰 댓글 수정" })
  @UseGuards(JwtAuthGuard)
  @Patch("/modify")
  modifyReviewComment(
    @Body() createReviewCommentDto: CreateReviewCommentDto,
    @CurrentUser() user: UserLoginDto
  ) {
    return this.reviewCommentService.modifyReviewComment(
      user.userIdx,
      createReviewCommentDto
    );
  }

  @ApiOperation({ summary: "리뷰 댓글 삭제" })
  @UseGuards(JwtAuthGuard)
  @Delete("/delete/:reviewIdx")
  deleteReviewComment(
    @Param("reviewIdx") reviewIdx: number,
    @CurrentUser() user: UserLoginDto
  ) {
    return this.reviewCommentService.deleteReviewComment(
      user.userIdx,
      reviewIdx
    );
  }
}
