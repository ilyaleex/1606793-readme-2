import { Injectable } from '@nestjs/common';
import { ContentType, Post } from '@prisma/client';
import { PostError, toggleArrElement } from '@readme/core';
import { IPostBase } from '@readme/shared-types';

import { PostCreateDTO } from './dto/post-create.dto';
import { PostUpdateDTO } from './dto/post-update.dto';

import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { PostQuery } from './query/post.query';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
      ) {}


  async getPosts(query: PostQuery) {
    const posts = await this.postRepository.find(query)

    return posts
  }

  async getPost(postID: number): Promise<IPostBase> {
    const post = await this.postRepository.findOne(postID);

    if (!post) {
      throw new Error(PostError.NotFound);
    }

    return post
  }

  async createPost(dto: PostCreateDTO, contentType: ContentType) {
    if (dto.content.type !== contentType) {
      throw new Error(PostError.QueryType)
    }

    const postEntity = new PostEntity({...dto, type: contentType, comments: [], likes: []})

    const newPost = await this.postRepository.create(postEntity);

    return newPost
  }

  async repost(postID: number): Promise<IPostBase> {
    const origin = await this.postRepository.findOne(postID);

    if (!origin) {
      throw new Error(PostError.NotFound)
    }

    const {authorID, ...postBase} = origin

    const repostEntity = new PostEntity({...postBase, isRepost: true, authorID: authorID ?? origin.userID })

    const repost = await this.postRepository.create(repostEntity);

    return {
      ...repost,
      content: repost[repost.type.toLowerCase()]
    };
  }

  async likePost(postID: number, userID: string): Promise<Post> {
    const post = await this.postRepository.findOne(postID);

    if (!post) {
      throw new Error(PostError.NotFound);
    }

    const likes = toggleArrElement(post.likes, userID);

    const updatedEntity = new PostEntity({...post, likes})

    const updatedPost = await this.postRepository.update(postID, updatedEntity)

    return updatedPost
  }

  async updatePost(postID: number, dto: PostUpdateDTO) {
    const post = await this.postRepository.findOne(postID);
    const {userID, tags, content} = dto

    if (!post) {
      throw new Error(PostError.NotFound);
    }

    if (post.userID !== userID) {
      throw new Error(PostError.Auth)
    }

    const updatedEntity = new PostEntity({...post, tags, content})

    const updatedPost = await this.postRepository.update(postID, updatedEntity)

    return updatedPost
  }

  async deletePost(postID: number) {
    const post = await this.postRepository.findOne(postID);

    if (!post) {
      throw new Error(PostError.NotFound)
    }

    await this.postRepository.destroy(postID)
  }
}
