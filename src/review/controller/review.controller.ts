import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ReviewService } from "../service/review.service";
import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";
import { JwtAuthGuard } from "src/auth/utils/jwt/jwt.guard";
import { CurrentUser } from "../../aop/decorators/user.decorator";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { HttpExceptionFilter } from "../../aop/exception/http-exception.filter";
import { SuccessInterceptor } from "../../aop/interceptors/success.interceptor";
import { ApiOperation } from "@nestjs/swagger";

@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("review")
export class ReviewController {
  constructor(private reveiwservice: ReviewService) {}

  @ApiOperation({ summary: "모든 리뷰 조회" })
  @Get("AllReview")
  getAllReview() {
    return this.reveiwservice.getAllReview();
  }

  @ApiOperation({ summary: "특정 리뷰 조회" })
  @Get("Onereview/:id")
  getoneReview(@Param("id") reviewIdx: number) {
    return this.reveiwservice.getoneReview(reviewIdx);
  }

  @ApiOperation({ summary: "리뷰 작성" })
  @UseGuards(JwtAuthGuard)
  @Post("Newreview")
  createReview(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() user: UserLoginDto
  ) {
    return this.reveiwservice.createReview(user, createReviewDto);
  }

  @ApiOperation({ summary: "특정리뷰 수정" })
  @UseGuards(JwtAuthGuard)
  @Patch("Onereviewupdate/:id")
  updateReview(
    @Param("id") reviewIdx: number,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    return this.reveiwservice.updateReview(reviewIdx, updateReviewDto);
  }

  @ApiOperation({ summary: "특정리뷰 삭제" })
  @UseGuards(JwtAuthGuard)
  @Delete("delete/:id")
  deleteReview(@Param("id") reviewIdx: number) {
    return this.reveiwservice.deleteReview(reviewIdx);
  }
}
