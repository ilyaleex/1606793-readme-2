import { Expose } from "class-transformer";
import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";

import { ContentDTOBase } from "./content.dto";
import { MinMax } from "../../enum/utils.enum";
import { ContentAPIProp } from "../../api-props/post/content.api-prop";

export class TextDTO extends ContentDTOBase {
  @Expose()
  @IsString()
  @Length(MinMax.TitleMin, MinMax.TitleMax)
  @ApiProperty(ContentAPIProp.Title)
  public title?: string;

  @Expose()
  @IsString()
  @Length(MinMax.AnnMin, MinMax.AnnMax)
  @ApiProperty(ContentAPIProp.Ann)
  public ann?: string;

  @Expose()
  @IsString()
  @Length(MinMax.TextMin, MinMax.TextMax)
  @ApiProperty(ContentAPIProp.Text)
  public text?: string;


  constructor() {
    super()
    this.type = ContentType.TEXT
  }
}
