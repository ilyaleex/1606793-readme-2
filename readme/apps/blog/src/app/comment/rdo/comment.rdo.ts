import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Comment ID',
    example: '1669401083934'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'The date the comment was created',
    example: '2022-11-25T17:45:32.754Z'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Text of the comment an authorized user can leave under the post',
    example: 'Great footage! Keep up the good work!'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'The id of the post the comment was left under',
    example: '1669292869059'
  })
  @Expose()
  public postId: number;

  @ApiProperty({
    description: 'The unique id of the user, who commeneted the post',
    example: '3afa868f-e0d7-450d-bef5-101667e6b888'
  })
  @Expose()
  public userId: string;
}
