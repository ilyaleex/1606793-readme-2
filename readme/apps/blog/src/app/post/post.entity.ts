import {Entity} from '@readme/core';
import {Comment, ContentType, Post} from '@readme/shared-types';

export class PostEntity implements Entity<PostEntity>, Post {
  public id: number;
  public type: string;
  public createdAt: Date;
  public date: Date;
  public isPublished: boolean;
  public likes: string[];
  public likesCount: number;
  public comments: Comment[];
  public tags?: string[];
  public isRepost: boolean;
  public authorId: string;
  public originalAuthorId: string;
  public originalId: number;
  public content: ContentType;

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(post: Post) {
    this.type = post.type;
    this.date = post.date;
    this.isPublished = post.isPublished ?? false;
    this.likes = post.likes;
    this.likesCount = post.likesCount;
    this.tags = post.tags;
    this.isRepost = post.isRepost ?? false;
    this.authorId = post.authorId;
    this.originalAuthorId = post.originalAuthorId;
    this.originalId = post.originalId;
    this.content = post.content;
  }
}
