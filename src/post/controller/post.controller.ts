import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UseFilters,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { PostService } from "../service/post.service";
import { CreatePostDto } from "../dto/create-post.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/jwt/jwt.guard";
import { CurrentUser } from "../../../src/aop/decorators/user.decorator";
import { UserLoginDto } from "../../users/dto/user-login.dto";
import { SuccessInterceptor } from "../../../src/aop/interceptors/success.interceptor";
import { HttpExceptionFilter } from "../../../src/aop/exception/http-exception.filter";
import { PositiveIntPipe } from "src/aop/pipes/positiveInt.pipe";

@ApiTags("POST")
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  // 2-1
  @ApiOperation({ summary: "로그인한 user로 게시물 작성" })
  @UseGuards(JwtAuthGuard)
  @Post("/create")
  create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: UserLoginDto
  ) {
    return this.postService.createPost(user, createPostDto);
  }

  // 2-2
  @ApiOperation({ summary: "로그인한 user의 게시물 조회" })
  @UseGuards(JwtAuthGuard)
  @Get("/get/userIdx")
  findIdPost(@CurrentUser() user: UserLoginDto) {
    return this.postService.findIdPost(user.userIdx);
  }

  // 2-3
  @ApiOperation({ summary: "카테고리로 게시물 조회" })
  @Get("/get/category")
  findCategoryPost(@Query("category") category: string) {
    console.log(category);
    return this.postService.findCategoryPost(category);
  }

  // 2-4
  @ApiOperation({ summary: "게시물 전체 조회" })
  @Get("/get/all")
  findAll(
    @Query("page", ParseIntPipe, PositiveIntPipe) page: number,
    @Query("pageSize", ParseIntPipe, PositiveIntPipe) pageSize: number
  ) {
    return this.postService.findAll(page, pageSize);
  }

  // 2-5
  @ApiOperation({ summary: "게시물 좋아요" })
  @UseGuards(JwtAuthGuard)
  @Post("/like")
  postLike(
    @Body("postIdx") postIdx: number,
    @CurrentUser() user: UserLoginDto
  ) {
    return this.postService.postLike(user, postIdx);
  }

  //2-6
  @ApiOperation({ summary: "게시물 좋아요 취소" })
  @UseGuards(JwtAuthGuard)
  @Post("/like/cancel")
  postLikeCancel(
    @Body("postIdx") postIdx: number,
    @CurrentUser() user: UserLoginDto
  ) {
    return this.postService.postLikeCancel(user, postIdx);
  }
}
