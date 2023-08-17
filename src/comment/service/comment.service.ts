import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, QueryRunner } from "typeorm";
import { Comment } from "../../../resource/db/entities/Comment";
import { User } from "../../../resource/db/entities/User";
import { LikeComment } from "../../../resource/db/entities/LikeComment";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { CommentImpl } from "../interface/comment.implement";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private dataSource: DataSource,
    private commentImpl: CommentImpl
  ) {}

  // 3-1 댓글 생성
  async createComment(
    userIdx: number,
    createCommentDto: CreateCommentDto
  ): Promise<readonlyCommentDto> {
    return await this.commentImpl.createComment(userIdx, createCommentDto);
  }

  // 3-2 게시물 id로 댓글 조회
  async findAllComment(postIdx: number): Promise<readonlyCommentDto[]> {
    return await this.commentImpl.findAllComment(postIdx);
  }


//3-3 게시물 좋아요
  async commentLike(userIdx: number, postIdx: number, commentIdx: number) {




    return await this.commentImpl.commentLike(userIdx,postIdx,commentIdx);











  }
//3-4 댓글 좋아요 취소
  async commentLikeCancel(userIdx: number, postIdx: number, commentIdx: number) {




    return await this.commentImpl.commentLikeCancel(userIdx,postIdx,commentIdx);



   
  }
}
