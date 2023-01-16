import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UploadFileDTO {
  @IsString()
  @ApiProperty({
    type: String,
    format: 'binary',
  })
  public file: string;
}
