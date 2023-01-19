import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CommentEntity} from './comment.entity';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRepository} from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  async createComment(dto: CreateCommentDto, userId: string) {
    const commentEntity = new CommentEntity({
      ...dto,
      userId
    });

    return await this.commentRepository.create(commentEntity);
  }

  async getComments(postId: number, page?: number, commentsCount?: number) {
    return await this.commentRepository.find(postId, page, commentsCount);
  }

  async deleteComment(commentId: number, userId: string) {
    const comment = await this.commentRepository.findById(commentId);
    
    if (userId !== comment.userId) {
      throw new UnauthorizedException('You do not have sufficient privileges to delete this comment!');
    }
    await this.commentRepository.destroy(commentId);
  }
}
