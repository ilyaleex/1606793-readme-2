import { ApiProperty } from "@nestjs/swagger";
import { MinMax, UserAPIDesc, UserAPIExample, UserError, ValidationErrorMessage } from "@readme/core";
import { Expose } from "class-transformer";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class UserCreateDTO {
  @Expose()
  @IsEmail({},{message: UserError.Email})
  @ApiProperty({
    description: UserAPIDesc.Email,
    example: UserAPIExample.Email
  })
  public email: string;

  @Expose()
  @IsString()
  @Length(MinMax.UserNameMin, MinMax.UserNameMax, { message: ValidationErrorMessage.Length })
  @ApiProperty({
    description: UserAPIDesc.Name,
    example: UserAPIExample.Name,
    maxLength: MinMax.UserNameMax,
    minLength: MinMax.UserNameMin
  })
  public name: string;

  @IsString()
  @Length(MinMax.UserPassMin, MinMax.UserPassMax,{ message: ValidationErrorMessage.Length })
  @ApiProperty({
    description: UserAPIDesc.Pass,
    example: UserAPIExample.Pass,
    maxLength: MinMax.UserPassMax,
    minLength: MinMax.UserPassMin
  })
  public password: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: UserAPIDesc.AvatarUrl,
    example: UserAPIExample.FilePath
  })
  public avatarUrl: string;
}
