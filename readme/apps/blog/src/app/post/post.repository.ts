import {Injectable} from '@nestjs/common';
import {CRUDRepository} from '@readme/core';
import {Post} from '@readme/shared-types';
import {PrismaService} from '../prisma/prisma.service';
import {PostEntity} from './post.entity';
import {Post as prisma_post} from '@prisma/client';
import {SortTypeMap} from './post.constant';
import {PostQuery} from './query/post.query';
import {DraftPostQuery} from './query/draft-post.query';

@Injectable()
export class PostRepository implements CRUDRepository<PostEntity, number, Post> {
  constructor(
    private readonly prisma: PrismaService
    ) {}

  public async find({page, postsCount, sortType, authorId, tag, type}: PostQuery): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: (authorId || tag || type) ? {
        isPublished: {
          equals: true
        },
        OR: [
          {
            authorId
          },
          {
            tags: {
              has: tag ?? null
            }
          },
          {
            type
          }
        ]
      } : {
        isPublished: {
          equals: true
        }
      },
      include: {
        comments: true
      },
      take: postsCount,
      skip: (page - 1) * postsCount,
      orderBy: SortTypeMap[sortType]
    });
    return posts;
  }

  public async findDrafts({page, postsCount, sortType, tag, type}: DraftPostQuery, id: string): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: (tag || type) ? {
        authorId: {
          equals: id
        },
        isPublished: {
          equals: false
        },
        OR: [
          {
            tags: {
              has: tag ?? null
            }
          },
          {
            type
          }
        ]
      } : {
        isPublished: {
          equals: false
        },
        authorId: {
          equals: id
        }
      },
      include: {
        comments: true
      },
      take: postsCount,
      skip: (page - 1) * postsCount,
      orderBy: SortTypeMap[sortType]
    });
    return posts;
  }

  public async findById(id: number): Promise<Post | null> {
    return await this.prisma.post.findUnique({
      where: {
        id
      }
    });
  }

  public async create(item: PostEntity): Promise<Post> {
    const entityData = item.toObject();
    const post = await this.prisma.post.create({
      data: {
        ...entityData as prisma_post
      }
    });
    return post;
  }

  public async update(id: number, item: PostEntity): Promise<Post> {
    const entityData = item.toObject();
    return await this.prisma.post.update({
      where: {
        id
      },
      data: {
        ...entityData as prisma_post
      }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.deleteMany({
      where: {
        postId: id
      }
    });
    await this.prisma.post.delete({
      where: {
        id
      }
    });
  }
}
