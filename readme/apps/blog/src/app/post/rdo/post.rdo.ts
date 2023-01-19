import {ApiProperty} from '@nestjs/swagger';
import {Comment, ContentType} from '@readme/shared-types';
import {Expose} from 'class-transformer';

export class PostRdo {
  @ApiProperty({
    description: 'Post ID',
    example: '1669401083934'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'The date the post was created initially',
    example: '2022-11-25T17:45:32.754Z'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'The date the post was updated or reposted the last time',
    example: '2022-11-25T17:45:32.754Z'
  })
  @Expose()
  public date: string;

  @ApiProperty({
    description: 'The status indicating whether the post was published',
    example: 'true'
  })
  @Expose()
  public isPublished: boolean;

  @ApiProperty({
    description: 'The array of users ids who set the like',
    example: '["3afa868f-e0d7-450d-bef5-101667e6b888", "3afa868f-e0d7-450d-bef5-101667e6b889"]'
  })
  @Expose()
  public likes: string[];

  @ApiProperty({
    description: 'The number of users who set the like',
    example: '100'
  })
  @Expose()
  public likesCount: number;

  @ApiProperty({
    description: 'Must be one of the following types: video, text, quote, photo, link',
    example: 'video'
  })
  @Expose()
  public type: string;

  @ApiProperty({
    description: 'An array of tags',
    example: '["link", "beautifulphoto", "postaboutmyjourney"]'
  })
  @Expose()
  public tags?: string[];

  @ApiProperty({
    description: 'The status indicating whether the post was reposted',
    example: 'true'
  })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
    description: 'The unique id of the user, who is the current owner of the post',
    example: '3afa868f-e0d7-450d-bef5-101667e6b888'
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'The unique id of the user, who created the post first',
    example: '3afa868f-e0d7-450d-bef5-101667e6b888'
  })
  @Expose()
  public originalAuthorId: string;

  @ApiProperty({
    description: 'The ID the post received initially',
    example: '1669401083934'
  })
  @Expose()
  public originalId: number;

  @ApiProperty({
    description: 'The unique set of properies according to the "type"',
    example: 'Look the "ContentType"'
  })
  @Expose()
  public content: ContentType;

  @ApiProperty({
    description: 'The array of comments',
    example: 'Look the Comment interface'
  })
  @Expose()
  public comments: Comment[];
}
