import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";

import { ContentDTOBase } from "./content.dto";
import { MinMax } from "../../enum/utils.enum";
import { ContentAPIProp } from "../../api-props/post/content.api-prop";

export class QuoteDTO extends ContentDTOBase {
  @Expose()
  @IsString()
  @Length(MinMax.QuoteMin, MinMax.QuoteMax)
  @ApiProperty(ContentAPIProp.Quote)
  text?: string;

  @Expose()
  @IsString()
  @Length(MinMax.AuthorMin, MinMax.AuthorMax)
  @ApiProperty(ContentAPIProp.Author)
  author?: string;

  constructor() {
    super()
    this.type = ContentType.QUOTE
  }
}
