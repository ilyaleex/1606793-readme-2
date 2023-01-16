import { ContentType } from "@prisma/client";
import { ContentDTO, TagDTO } from "@readme/core";
import { IEntity, IPost, IPostBase } from "@readme/shared-types";

export class PostEntity implements IEntity<PostEntity>, IPostBase {
  public isDraft: boolean;
  public isRepost: boolean;
  public tags: TagDTO[]
  public commentIDs: number[]
  public likes: string[]
  public userID: string;
  public createdAt?: Date;
  public publishAt?: Date;
  public type?: ContentType;
  public content: ContentDTO;
  public authorID?: string;
  public originID?: number;
  public origin?: IPost;

  constructor(post: IPost) {
    this.fillEntity(post);
  }

  public toObject() {
    return {...this};
  }

  public toUpdate(): IPostBase {
    return {...this}
  }

  public toCreate() {
    return {
      ...this,
      [this.content.type.toLowerCase()]: this.content
    }
  }

  public fillEntity(entity: IPost) {
    this.isRepost = entity.isRepost;
    this.publishAt = new Date();

    this.type = entity.type;
    this.content = {...entity.content}

    this.isDraft = entity.isDraft;
    this.userID = entity.userID;
    this.tags = entity.tags ?? []
    this.likes = entity.likes ?? []

    this.authorID = entity.userID
    this.originID = entity.id
  }
}
