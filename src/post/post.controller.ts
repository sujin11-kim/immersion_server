import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  UseFilters,
  Query,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { CurrentUser } from "src/common/decorators/user.decorator";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { SuccessInterceptor } from "src/common/interceptors/success.interceptor";
import { HttpExceptionFilter } from "src/common/exception/http-exception.filter";

@ApiTags("POST")
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: "모든 게시물 조회" })
  @Get()
  findAll(@Query("page") page: number, @Query("pageSize") pageSize: number) {
    return this.postService.findAll(page, pageSize);
  }

  @ApiOperation({ summary: "현재 user의 게시물 조회" })
  @UseGuards(JwtAuthGuard)
  @Get("/userIdx")
  findIdPost(@CurrentUser() user: UserLoginDto) {
    return this.postService.findIdPost(user.userIdx);
  }

  @ApiOperation({ summary: "카테고리 게시물 조회" })
  @Get("/category")
  findCategoryPost(@Query("category") category: string) {
    console.log(category);
    return this.postService.findCategoryPost(category);
  }

  @ApiOperation({ summary: "게시물 생성" })
  @UseInterceptors(FilesInterceptor("image", 10))
  @UseGuards(JwtAuthGuard)
  @Post("/create")
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() user: UserLoginDto
  ) {
    const { category, title, content } = createPostDto;
    console.log("파일 이름");
    console.log(files);
    //return this.awsService.uploadFileToS3("cats", files[0]);
    return this.postService.createPost(user, category, title, content, files);
  }

  @ApiOperation({ summary: "게시물 좋아요" })
  @UseGuards(JwtAuthGuard)
  @Post("/likePost")
  postLike(
    @Body("postIdx") postIdx: number,
    @CurrentUser() user: UserLoginDto
  ) {
    return this.postService.postLike(user, postIdx);
  }

  @ApiOperation({ summary: "게시물 좋아요 취소" })
  @UseGuards(JwtAuthGuard)
  @Post("/likeCancelPost")
  postLikeCancel(
    @Body("postIdx") postIdx: number,
    @CurrentUser() user: UserLoginDto
  ) {
    return this.postService.postLikeCancel(user, postIdx);
  }
}
