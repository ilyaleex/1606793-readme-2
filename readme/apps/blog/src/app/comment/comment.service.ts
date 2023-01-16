import { Injectable } from "@nestjs/common";
import { CommentError, PostError } from "@readme/core";

import { CommentEntity } from "./comment.entity";
import { PostRepository } from "../posts/post.repository";
import { CommentRepository } from "./comment.repository";
import { CommentCreateDTO } from "./dto/comment-create.dto";
import { CommentQuery } from "./query/comment.query";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository
      ) {}

  async getCommentsForPost(query: CommentQuery) {
    return await this.commentRepository.findAllByPostID(query)
  }

  async createComment(postID: number, dto: CommentCreateDTO) {
    const post = await this.postRepository.findOne(postID)

    if (!post) {
      throw new Error(PostError.NotFound)
    }

    const newComment = new CommentEntity(postID, dto)

    return await this.commentRepository.create(newComment);
  }

  async deleteComment(commentID: number) {
    const comment = await this.commentRepository.findOne(commentID);

    if (!comment) {
      throw new Error(CommentError.NotFound)
    }
    
    await this.commentRepository.destroy(commentID)
  }
}
