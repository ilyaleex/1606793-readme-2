import {ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'The unique user email',
    example: 'keks@htmlacademy.ru',
    required: true
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '12345',
    required: true
  })
  public password: string;
}
