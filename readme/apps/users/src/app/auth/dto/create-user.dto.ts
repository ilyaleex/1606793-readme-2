import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength, MinLength} from 'class-validator';
import {AUTH_USER_EMAIL_NOT_VALID} from '../auth.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'The unique user email address',
    example: 'John@Doe.com'
  })
  @IsEmail(
    {},
    {message: AUTH_USER_EMAIL_NOT_VALID},
  )
  public email: string;

  @ApiProperty({
    description: 'First name',
    example: 'John'
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe'
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public lastName: string;

  @ApiProperty({
    description: 'Password',
    example: '123456'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public password: string;

  @ApiProperty({
    description: 'User\'s avatar path',
    example: 'avatar.png'
  })
  //@IsString()
  //Ограничения: не больше 500 килобайт, формат jpeg или png.
  public avatarPath?: string;
}
