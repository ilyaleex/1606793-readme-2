import {ApiProperty} from '@nestjs/swagger';
import {ContentType} from '@readme/shared-types';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Must be one of the following types: video, text, quote, photo, link',
    example: 'video'
  })
  type?: string;

  @ApiProperty({
    description: 'The status, indicating whether the post was published',
    example: 'true'
  })
  isPublished?: boolean;

  @ApiProperty({
    description: 'The unique set of properies according to the "type"',
    example: 'Look the "ContentType"'
  })
  content?: ContentType;

  @ApiProperty({
    description: 'An array of tags',
    example: '["link", "beautifulphoto", "postaboutmyjourney"]'
  })
  tags?: string[];
}
