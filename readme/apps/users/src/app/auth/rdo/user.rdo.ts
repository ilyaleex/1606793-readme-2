import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'Unique user id',
    example: '3'
  })
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User firstname',
    example: 'Peter'
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User lastname',
    example: 'Adams'
  })
  @Expose()
  public lastname: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  public avatar: string;
}
