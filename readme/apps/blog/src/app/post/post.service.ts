import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {PostRepository} from './post.repository';
import {PostEntity} from './post.entity';
import {PostQuery} from './query/post.query';
import {CommandEvent} from '@readme/shared-types';
import {NOTIFIER_RABBITMQ_SERVICE, USERS_RABBITMQ_SERVICE} from './post.constant';
import {ClientProxy} from '@nestjs/microservices';
import {DraftPostQuery} from './query/draft-post.query';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(NOTIFIER_RABBITMQ_SERVICE) private readonly notifierRabbitClient: ClientProxy,
    @Inject(USERS_RABBITMQ_SERVICE) private readonly usersRabbitClient: ClientProxy
  ) {}

  async createPost(dto: CreatePostDto, authorId: string) {
    const postEntity = new PostEntity({
      ...dto,
      date: new Date,
      likes: [],
      likesCount: 0,
      authorId,
      originalAuthorId: authorId,
      originalId: 0
    });

    this.notifierRabbitClient.emit(
      {cmd: CommandEvent.AddPost},
      {authorId}
    );

    this.usersRabbitClient.emit(
      {cmd: CommandEvent.IncrementPostsCount},
      {authorId}
    );

    return await this.postRepository.create(postEntity);
  }

  async repost(postId: number, authorId: string) {
    const post = await this.postRepository.findById(postId);
    const originalAuthorId = post.authorId;
    const originalId = post.id;
    const postEntity = new PostEntity({
      ...post,
      authorId,
      date: new Date,
      isPublished: true,
      isRepost: true,
      likes: [],
      originalAuthorId,
      originalId
    });

    this.usersRabbitClient.emit(
      {cmd: CommandEvent.IncrementPostsCount},
      {authorId}
    );

    return await this.postRepository.create(postEntity);
  }

  async getPosts(query: PostQuery) {
    return this.postRepository.find(query);
  }

  async getDrafts(query: DraftPostQuery, id: string) {
    return this.postRepository.findDrafts(query, id);
  }

  async updatePost(dto: UpdatePostDto, postId: number, authorId: string) {
    const post = await this.postRepository.findById(postId);

    if (authorId !== post.authorId) {
      throw new UnauthorizedException('You do not have sufficient privileges to update this post!');
    }

    const postEntity = new PostEntity({
      ...post,
      ...dto,
      date: new Date
    });
    return await this.postRepository.update(postId, postEntity);
  }

  async changeLikesCount(postId: number, authorId: string) {
    const post = await this.postRepository.findById(postId);
    const postLikes = [...post.likes];
    const existsLike = postLikes.some((id) => id === authorId);

    if (existsLike) {
      const updatedLikes = postLikes.filter((id) => id !== authorId);
      const updatedPost = {...post, likes: updatedLikes, likesCount: post.likesCount - 1};
      const updatedPostEntity = new PostEntity(updatedPost);

      return await this.postRepository.update(postId, updatedPostEntity);
    }

    postLikes.push(authorId);
    const updatedPost = {...post, likes: postLikes, likesCount: post.likesCount + 1};
    const updatedPostEntity = new PostEntity(updatedPost);

    return await this.postRepository.update(postId, updatedPostEntity);
  }

  async deletePost(postId: number, authorId: string) {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new Error('No posts found');
    }
    
    if (authorId !== post.authorId) {
      throw new UnauthorizedException('You do not have sufficient privileges to delete this post!');
    }

    this.usersRabbitClient.emit(
      {cmd: CommandEvent.DecrementPostsCount},
      {authorId}
    );

    return await this.postRepository.destroy(postId);
  }
}
