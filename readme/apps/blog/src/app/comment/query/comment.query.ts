import { Transform } from 'class-transformer';
import { CommentAPIProp, MinMax} from '@readme/core';
import { IsNumber, IsOptional, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentQuery {
  @Transform(({ value } ) => +value || MinMax.CommentsLimit)
  @IsNumber()
  @ApiProperty(CommentAPIProp.PostID)
  public postID: number;

  @IsOptional()
  @IsNumber()
  @Max(MinMax.CommentsLimit)
  @Transform(({ value } ) => +value || MinMax.CommentsLimit)
  @ApiProperty(CommentAPIProp.Limit)
  public limit? = MinMax.CommentsLimit;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  public page?: number;
}
