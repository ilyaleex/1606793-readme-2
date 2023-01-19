import {ApiProperty} from '@nestjs/swagger';
import {IsString, MaxLength, MinLength} from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Password',
    example: '123456'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public password: string;

  @ApiProperty({
    description: 'Password',
    example: '123456'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public newPassword: string;
}
