import {Injectable} from '@nestjs/common';
import {Comment} from '@readme/shared-types';
import {CRUDRepository} from '@readme/core';
import {PrismaService} from '../prisma/prisma.service';
import {CommentEntity} from './comment.entity';

@Injectable()
export class CommentRepository implements CRUDRepository<CommentEntity, number, Comment> {
  constructor(
    private readonly prisma: PrismaService
    ) {}

  public async create(item: CommentEntity): Promise<Comment> {
    const entityData = item.toObject();
    const comment = await this.prisma.comment.create({
      data: {
        ...entityData
      }
    });
    return comment;
  }

  public async find(postId: number, page?: number, commentsCount?: number): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId
      },
      take: commentsCount,
      skip: (page - 1) * commentsCount,
      orderBy: {
        createdAt: 'desc'
      }
    });
    return comments;
  }

  public async findById(id: number): Promise<Comment | null> {
    return await this.prisma.comment.findUnique({
      where: {
        id
      }
    });
  }

  public async update(id: number, item: CommentEntity): Promise<Comment> {
    throw new Error(`Method is not implemented ${id} ${item}`);
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id
      }
    });
  }
}
