import { ApiProperty } from '@nestjs/swagger';
import { MailAPIProp } from '@readme/core';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class MailCreateDTO {
  @IsEmail()
  @ApiProperty(MailAPIProp.Email)
  public email?: string;

  @IsString()
  @ApiProperty(MailAPIProp.Name)
  public name?: string;

  @IsArray()
  @ApiProperty(MailAPIProp.Posts)
  public postIDs?: string[];
}
