import {ApiProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'User ID',
    example: '3afa868f-e0d7-450d-bef5-101667e6b888'
  })
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'The unique user email address',
    example: 'John@Doe.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'First name',
    example: 'John'
  })
  @Expose()
  public firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe'
  })
  @Expose()
  public lastName: string;

  @ApiProperty({
    description: 'User\'s avatar path',
    example: 'avatar.png'
  })
  @Expose()
  public avatarPath: string;

  @ApiProperty({
    description: 'The number of posts the user has created',
    example: '10'
  })
  @Expose()
  public postsCount: number;

  @ApiProperty({
    description: 'The number of the user subscribers',
    example: '100'
  })
  @Expose()
  public subscribersCount: number;

  @ApiProperty({
    description: 'The list of subscribers\' emails',
    example: '100'
  })
  @Expose()
  public subscribersEmails: string[];

  @ApiProperty({
    description: 'The date a user was created at',
    example: '100'
  })
  @Expose()
  public createdAt: string[];
}
