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
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { SuccessInterceptor } from "src/common/interceptors/success.interceptor";
import { HttpExceptionFilter } from "src/common/exception/http-exception.filter";
import { CurrentUser } from "src/common/decorators/user.decorator";
import { UserLoginDto } from "src/users/dto/user-login.dto";

@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags("COMMENT")
@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(":postIdx")
  findAllComment(@Param("postIdx") postIdx: number) {
    console.log(postIdx);
    return this.commentService.findAllComment(postIdx);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: UserLoginDto
  ) {
    const { postIdx, parentCommentIdx, depth, commentContent } =
      createCommentDto;
    return this.commentService.createComment(
      postIdx,
      user.userIdx,
      parentCommentIdx,
      depth,
      commentContent
    );
  }

  @Post()
  modifyComment(@Body() createCommentDto: CreateCommentDto) {
    const { postIdx, commentContent } = createCommentDto;
    return this.commentService.modifyComment(postIdx, commentContent);
  }

  @Post()
  removeComment(@Body() commentIdx: string) {
    return this.commentService.removeComment(commentIdx);
  }
}
