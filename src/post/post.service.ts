import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { Post } from '../../mymodel/entities/Post';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private dataSource: DataSource
  ) {}

  async createPost(
    title: string, 
    content: string
    ): Promise<Post> { // 객체 타입 선언 : Promise 
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const post = new Post();
      post.title = title;
      post.content = content;
      const savedPost = await queryRunner.manager.save(post); // insert 문과 대응.

      await queryRunner.commitTransaction();
      return savedPost;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Post[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      return await queryRunner.manager.find(Post);
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(writeIdx: number): Promise<Post> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      return await queryRunner.manager.findOne(Post, { relations: ["writeIdx"] });
    } finally {
      await queryRunner.release();
    }
  }
}

