import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  UseInterceptors,
  UseFilters,
} from "@nestjs/common";
import { CommentService } from "../service/comment.service";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/utils/jwt/jwt.guard";
import { SuccessInterceptor } from "../../../src/aop/interceptors/success.interceptor";
import { HttpExceptionFilter } from "../../../src/aop/exception/http-exception.filter";
import { CurrentUser } from "../../../src/aop/decorators/user.decorator";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { LikeCommentDto } from "../dto/like-comment.dto";

@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags("COMMENT")
@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 3-1 댓글 생성
  @UseGuards(JwtAuthGuard)
  @Post("/create")
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: UserLoginDto
  ) {
    return this.commentService.createComment(user.userIdx, createCommentDto);
  }

  // 3-2 게시물 id로 댓글 조회
  @Get("/get/:postIdx")
  findAllComment(@Param("postIdx") postIdx: number) {
    return this.commentService.findAllComment(postIdx);
  }

  @ApiOperation({ summary: "게시물 좋아요" })
  //@UseGuards(JwtAuthGuard)
  @Post("/likeComment")
  commentLike(@Body() Idx: LikeCommentDto) {
    const { userIdx, postIdx, commentIdx } = Idx;
    return this.commentService.commentLike(userIdx, postIdx, commentIdx);
  }

  @ApiOperation({ summary: "게시물 좋아요 취소" })
  //@UseGuards(JwtAuthGuard)
  @Post("/likeCancelComment")
  commentLikeCancel(@Body() Idx: LikeCommentDto) {
    const { userIdx, postIdx, commentIdx } = Idx;
    return this.commentService.commentLikeCancel(userIdx, postIdx, commentIdx);
  }
}
