import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { ContentType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

import { ContentDTOBase } from "./content.dto";
import { MinMax } from "../../enum/utils.enum";
import { ContentAPIProp } from "../../api-props/post/content.api-prop";

export class LinkDTO extends ContentDTOBase {
  @Expose()
  @IsUrl()
  @ApiProperty(ContentAPIProp.Link)
  public url: string;

  @Expose()
  @IsString()
  @IsOptional()
  @MaxLength(MinMax.DescMax)
  @ApiProperty(ContentAPIProp.Desc)
  public desc?: string;

  constructor() {
    super()
    this.type = ContentType.LINK
  }
}
