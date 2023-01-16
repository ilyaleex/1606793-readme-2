import { IsArray, IsJWT, IsMongoId } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { KeyName, UserAPIDesc, UserAPIExample } from '@readme/core';
import { UserCreateDTO } from '../dto/user-create.dto';
import { IUser } from '@readme/shared-types';
import { Types } from 'mongoose';

class UserRDOBase {
  @Expose({ name: KeyName.ObjectID})
  @IsMongoId()
  @Transform(({ obj }) => obj._id)
  @ApiProperty({
    description: UserAPIDesc.ID,
    example: UserAPIExample.ID
  })
  public id: Types.ObjectId

  @Expose()
  @IsMongoId()
  @IsArray({each: true})
  @ApiProperty({
    description: UserAPIDesc.Subs,
    example: UserAPIExample.Subs,
    default: []
  })
  public subscriptions: IUser[];

  @Expose()
  @IsJWT()
  @ApiProperty({
    description: UserAPIDesc.Token,
    example: UserAPIExample.Token
  })
  public token: string;
}

export class UserRDO extends IntersectionType(
  UserRDOBase,
  OmitType(
    UserCreateDTO,
    ['password'] as const
  )
) {}

