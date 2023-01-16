import { PickType } from "@nestjs/swagger";
import { PostQuery } from "./post.query";

export class PostTypeQuery extends PickType(
  PostQuery, ['type'] as const
) {}
