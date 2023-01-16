import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { ContentType, Post } from '@prisma/client';

import { PostCreateDTO } from '../dto/post-create.dto';
import { IsArray, IsBoolean, IsEnum, IsMongoId, IsString, ValidateNested } from 'class-validator';
import { PostAPIProp } from '@readme/core';

class PostRDOBase {
  @Expose()
  @IsString()
  @ApiProperty(PostAPIProp.PostID)
  public id: string;

  @Exclude()
  @IsEnum(ContentType)
  @ApiProperty(PostAPIProp.Type)
  public type: ContentType;

  @Expose()
  @IsArray()
  @ApiProperty()
  public comments: Comment[];

  @Expose()
  @IsMongoId()
  @IsArray({each: true})
  @ApiProperty()
  public likes: string[];

  @Expose()
  @IsBoolean()
  @ApiProperty(PostAPIProp.IsRepost)
  public isRepost: boolean;

  @Expose()
  @IsBoolean()
  @ApiProperty(PostAPIProp.IsDraft)
  public isDraft: boolean;

  @Expose()
  @IsMongoId()
  @ApiProperty(PostAPIProp.AuthorID)
  public authorID: string;

  @Expose()
  @ValidateNested()
  @ApiProperty(PostAPIProp.Origin)
  public origin: Post;
}

export class PostRDO extends IntersectionType(
  PostCreateDTO,
  PostRDOBase,
) {}
