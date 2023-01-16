import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";

import { IsEnum, IsUppercase } from "class-validator";
import { VideoDTO } from "./video.dto";
import { LinkDTO } from "./link.dto";
import { PhotoDTO } from "./photo.dto";
import { QuoteDTO } from "./quote.dto";
import { TextDTO } from "./text.dto";
import { ContentAPIProp } from "../../api-props/post/content.api-prop";


export class ContentDTOBase {
  @Expose()
  @IsEnum(ContentType)
  @IsUppercase()
  @ApiProperty(ContentAPIProp.Base)
  public type: ContentType;

  public postID?: number;
}

export type ContentDTO = VideoDTO | LinkDTO | PhotoDTO | QuoteDTO | TextDTO
