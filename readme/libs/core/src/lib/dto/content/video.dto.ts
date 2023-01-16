import { Expose } from "class-transformer";
import { IsString, IsUrl, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";

import { ContentDTOBase } from "./content.dto";
import { MinMax } from "../../enum/utils.enum";
import { ContentAPIProp } from "../../api-props/post/content.api-prop";

export class VideoDTO extends ContentDTOBase {
  @Expose()
  @IsString()
  @Length(MinMax.TitleMin, MinMax.TitleMax)
  @ApiProperty(ContentAPIProp.VideoTitle)
  title?: string;

  @Expose()
  @IsUrl()
  @ApiProperty(ContentAPIProp.VideoUrl)
  videoUrl?: string;

  constructor() {
    super()
    this.type = ContentType.VIDEO
  }
}

