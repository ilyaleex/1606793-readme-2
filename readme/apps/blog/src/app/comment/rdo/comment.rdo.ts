import { Expose } from "class-transformer";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";

import { CommentCreateDTO } from "../dto/comment-create.dto";
import { IsInt, ValidateNested } from "class-validator";
import { PostRDO } from "../../posts/rdo/post.rdo";
import { CommentAPIProp } from "@readme/core";

class CommentRDOBase {
  @Expose()
  @IsInt()
  @ApiProperty(CommentAPIProp.CommentID)
  public id: string;

  @Expose()
  @ValidateNested()
  @ApiProperty(CommentAPIProp.Post)
  public post: PostRDO;
}

export class CommentRDO extends IntersectionType (
  CommentRDOBase,
  CommentCreateDTO
  ) {}
