import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  UseFilters,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { ApiCookieAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { multerOptions } from "src/common/utils/multer.options";
import { FilesInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { CurrentUser } from "src/common/decorators/user.decorator";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { SuccessInterceptor } from "src/common/intercepors/suucess.interceptor";
import { HttpExceptionFilter } from "src/common/exception/http-exception.filter";
import * as AWS from "aws-sdk";
import * as multerS3 from "multer-s3";
import { AwsService } from "src/aws.service";

@ApiTags("POST")
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("posts")
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly awsService: AwsService
  ) {}

  @ApiOperation({ summary: "모든 게시물 조회" })
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @ApiOperation({ summary: "현재 user의 게시물 조회" })
  @UseGuards(JwtAuthGuard)
  @Get("/userIdx")
  findIdPost(@CurrentUser() user: UserLoginDto) {
    return this.postService.findIdPost(user.id);
  }

  @ApiOperation({ summary: "현재 user의 게시물 조회" })
  @Post("/category")
  findCategoryPost(@Body("category") category: string) {
    console.log(category);
    return this.postService.findCategoryPost(category);
  }

  @ApiOperation({ summary: "게시물 생성" })
  @UseInterceptors(FilesInterceptor("image", 10))
  @UseGuards(JwtAuthGuard)
  @Post()
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

  @Post("image")
  getImage(@Body("key") key: string) {
    return this.awsService.deleteS3Object(key);
  }
}
