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
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { CurrentUser } from "src/common/decorators/user.decorator";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { HttpExceptionFilter } from "src/common/exception/http-exception.filter";
import { SuccessInterceptor } from "src/common/interceptors/success.interceptor";
import { ApiOperation } from "@nestjs/swagger";

@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("review")
export class ReviewController {
  constructor(private reveiwservice: ReviewService) {}

  @ApiOperation({ summary: "모든 리뷰 조회" })
  @Get()
  getAllReview() {
    return this.reveiwservice.getAllReview();
  }

  @ApiOperation({ summary: "특정 리뷰 조회" })
  @Get(":id")
  getoneReview(@Param("id") reviewIdx: number) {
    return this.reveiwservice.getoneReview(reviewIdx);
  }

  @ApiOperation({ summary: "리뷰 작성" })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() user: UserLoginDto
  ) {
    return this.reveiwservice.create(user, createReviewDto);
  }

  @ApiOperation({ summary: "특정리뷰 수정" })
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") reviewIdx: number,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    return this.reveiwservice.update(reviewIdx, updateReviewDto);
  }

  @ApiOperation({ summary: "특정리뷰 삭제" })
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  delete(@Param("id") reviewIdx: number) {
    return this.reveiwservice.delete(reviewIdx);
  }
}
