import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'A unique user id',
    example: '3'
  })
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'fw43r'
  })
  @Expose()
  public accessToken: string;
}
