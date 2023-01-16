import { IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, Length, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ContentType } from '@prisma/client';
import { MinMax, PostAPIProp, Sort, SortByType, SortType } from '@readme/core';
import { ApiProperty } from '@nestjs/swagger';

export class PostQuery {
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  public users?: string[];

  @IsInt()
  @IsOptional()
  @Max(MinMax.PostsLimit)
  @Transform(({ value } ) => +value || MinMax.PostsLimit)
  @ApiProperty(PostAPIProp.Limit)
  public limit? = MinMax.PostsLimit;

  @IsOptional()
  @IsEnum(ContentType)
  @ApiProperty(PostAPIProp.Type)
  public type?: ContentType;

  @IsOptional()
  @IsEnum(SortByType)
  public sortBy?: SortByType.Date | SortByType.Likes | SortByType.Comm = Sort.PotSortBy

  @IsOptional()
  @IsEnum(SortType)
  public sort?: SortType.Desc | SortType.Asc = Sort.PostSort;

  @IsString()
  @IsOptional()
  @Length(MinMax.TagMin, MinMax.TagMax)
  @ApiProperty(PostAPIProp.Tag)
  public tag?: string;

  @IsBoolean()
  @IsOptional()
  public draft?: false;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  public page?: number;
}
