import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsMongoId} from 'class-validator';

export class IncrementPostsCountDto {
  @ApiProperty({
    description: 'The unique user ID',
    example: '6398ab2b5a6c4e3fefe83771'
  })
  @IsString()
  @IsMongoId()
  public id: string;
}
