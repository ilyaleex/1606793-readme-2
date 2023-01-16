import { Expose } from "class-transformer";
import { ArrayMaxSize, IsArray, IsMongoId, IsOptional, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { ContentDTO, MinMax, PostAPIProp, TagDTO } from "@readme/core";

export class PostCreateDTO {
  @Expose()
  @ValidateNested()
  @ApiProperty(PostAPIProp.Content)
  public content: ContentDTO;

  @Expose()
  @IsArray()
  @IsOptional()
  @ValidateNested()
  @ArrayMaxSize(MinMax.TagsLimit)
  @ApiProperty(PostAPIProp.Tags)
  public tags?: TagDTO[];

  @Expose()
  @IsMongoId()
  @ApiProperty(PostAPIProp.UserID)
  public userID: string;
}
