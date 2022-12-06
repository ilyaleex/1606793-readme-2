import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The unique user email',
    example: 'keks@htmlacademy.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User firstname',
    example: 'Peter',
  })
  public firstname: string;

  @ApiProperty({
    description: 'User lastname',
    example: 'Adams',
  })
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '12345',
  })
  public password: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
    required: false
  })
  public avatar: string;
}
