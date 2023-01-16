import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { ContentAPIProp } from "../api-props/post/content.api-prop";
import { MinMax } from "../enum/utils.enum";

export class TagDTO {
  @Expose()
  @IsString()
  @Length(MinMax.TagMin, MinMax.TagMax)
  @ApiProperty(ContentAPIProp.Tag)
  public title: string;
}
