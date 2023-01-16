import { Expose } from "class-transformer";
import { IsMongoId, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CommentAPIProp, MinMax } from "@readme/core";

export class CommentCreateDTO {
  @Expose()
  @IsString()
  @MaxLength(MinMax.CommentMax)
  @MinLength(MinMax.CommentMin)
  @ApiProperty(CommentAPIProp.Text)
  public text: string;

  @Expose()
  @IsMongoId()
  @ApiProperty(CommentAPIProp.UserID)
  public userID: string;
}
