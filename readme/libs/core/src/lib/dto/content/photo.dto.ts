import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { ContentType } from "@prisma/client";

import { ContentDTOBase } from "./content.dto";
import { ApiProperty } from "@nestjs/swagger";
import { ContentAPIProp } from "../../api-props/post/content.api-prop";

export class PhotoDTO extends ContentDTOBase {
  @Expose()
  @IsString()
  @ApiProperty(ContentAPIProp.Photo)
  public photo?: string;

  constructor() {
    super()
    this.type = ContentType.PHOTO
  }
}
