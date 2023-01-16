import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IComment, ICRUDRepo } from '@readme/shared-types';

import { CommentEntity } from './comment.entity';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class CommentRepository implements ICRUDRepo<CommentEntity, number, IComment> {
  constructor(
    private readonly prisma: PrismaService
    ) {}

  async findAllByPostID({postID, limit}: CommentQuery): Promise<IComment[]> {
    const comments = this.prisma.comment.findMany({
      where: {
        postID
      },
      select: {
        id: true,
        text: true,
        post: {
          select: {id: true}
        },
        userID: true,
        createdAt: true
      },
      take: limit
    })

    return comments
  }

  public async create(item: CommentEntity): Promise<IComment> {
    const entityData = item.toObject();
    const {postID, userID, text} = entityData;

    return this.prisma.comment.create(
      {
        data: {
          text,
          userID,
          post: {
            connect: {
              id: postID
            }
          }
        },
        include: {
          post: {
            select: {
              id: true,
            }
          },
        }
      }
    );
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {id}
    });
  }

  public async findOne(id: number): Promise<IComment | null> {
    return await this.prisma.comment.findFirst({
      where: {id},
      include: {
        post: {
          select: {
            id: true
          }
        }
      }
    });
  }
}
