import { Injectable } from '@nestjs/common';
import { connectOrCreateTags, PostInclude, SortByType } from '@readme/core';
import { ICRUDRepo, IPostBase } from '@readme/shared-types';

import { PrismaService } from '../prisma/prisma.service';
import { PostEntity } from './post.entity';
import { PostQuery } from './query/post.query';

@Injectable()
export class PostRepository implements ICRUDRepo<PostEntity, number, IPostBase> {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async create(item: PostEntity): Promise<IPostBase> {
    const entityData = item.toObject();

    const { tags, originID, content: contentData, ...data } = entityData
    const { type, postID, ...content } = contentData

    const contentType = type ? type.toLowerCase() : entityData.type.toLowerCase()

    const origin = postID ? { connect: { id: originID }} : undefined

    const created = await this.prisma.post.create({
      data: {
        ...data,
        authorID: data.authorID ?? data.userID,
        type: entityData.type,
        tags: {
          connectOrCreate: connectOrCreateTags(tags)
        },
        origin,
        [contentType]: { create: {...content} }
        },
      include: PostInclude
    })

    return created
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: { id }
    });
  }

  public async findOne(id: number): Promise<IPostBase | null> {
    const exists = await this.prisma.post.findUnique({ where: { id }, include: PostInclude})

    return exists
  }

  public async find({users, limit, type, sortBy, tag, sort, draft, page}: PostQuery) {
    const posts = await this.prisma.post.findMany({
      where: {
        userID: {
          in: users,
        },
        type: {
          equals: type
        },
        tags: {
          some: tag ? { title: tag } : {}
        },
        isDraft: draft
      },
      take: limit,
      include: {
        ...PostInclude,
        _count:{ select: { comments: true }}
      },
      orderBy: [
        sortBy === SortByType.Comm
          ? { [sortBy]: {_count: sort}}
          : {[sortBy]: sort}
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });

    return posts
  }

  public async update(id: number, item: PostEntity) {
    const entityData = item.toObject();

    const type = entityData.type

    const {originID, content, ...updateData} = entityData

    const originType = (await this.prisma.post.findUnique({ where: { id }})).type

    const handleContentTypeChange = () => {
      if (originType !== type) {
        return ({
          [originType.toLowerCase()]: {delete: { where: { postID: id }}},
          [type.toLowerCase()]: {create: content}
        })
      }

      return ({
        [type.toLowerCase()]: { connect: { postID: id }}
      })
    }

    const update = await this.prisma.post.update({
      where: { id },
      data: {
        ...updateData,
        ...handleContentTypeChange(),
        type,
        tags: { connectOrCreate: connectOrCreateTags(entityData.tags) },
        origin: originID ? { connect: { id: originID }} : undefined
      },
      include: PostInclude
    })


    return update
  }
}
