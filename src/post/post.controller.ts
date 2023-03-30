import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') writeIdx: number) {
    return this.postService.findOne(writeIdx);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    const {  title, content } = createPostDto;
    return this.postService.createPost(title, content);
  }
}
