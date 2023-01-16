import { ApiProperty } from '@nestjs/swagger';
import { UserAPIDesc, UserAPIExample } from '@readme/core';
import { IsMongoId } from 'class-validator';

export class SubQuery {
  @IsMongoId()
  @ApiProperty({
    description: UserAPIDesc.SubTo,
    example: UserAPIExample.ID
  })
  public to?: string;
}
