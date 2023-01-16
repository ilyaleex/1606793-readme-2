import { getSchemaPath } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { LinkDTO } from "../../dto/content/link.dto";
import { PhotoDTO } from "../../dto/content/photo.dto";
import { QuoteDTO } from "../../dto/content/quote.dto";
import { TextDTO } from "../../dto/content/text.dto";
import { VideoDTO } from "../../dto/content/video.dto";
import { TagDTO } from "../../dto/tag.dto";
import { APIDesc, APIExample } from "../../enum/comment.enum";
import { PostAPIDesc, PostAPIExample } from "../../enum/post.enum";
import { MinMax } from "../../enum/utils.enum";
import { TAPIProp } from "../api-prop";

export const PostAPIProp: TAPIProp = {
  Content: {
    description: PostAPIDesc.Content,
    oneOf: [
      {$ref: getSchemaPath(LinkDTO)},
      {$ref: getSchemaPath(PhotoDTO)},
      {$ref: getSchemaPath(QuoteDTO)},
      {$ref: getSchemaPath(TextDTO)},
      {$ref: getSchemaPath(VideoDTO)},
    ],
    discriminator: { propertyName: 'type' }
  },
  Tags: {
    description: PostAPIDesc.Tags,
    example: PostAPIExample.Tags,
    default: [],
    maxItems: MinMax.TagsLimit,
    type: [TagDTO]
  },
  UserID: {
    required: true,
    description: PostAPIDesc.UserID,
    example: PostAPIExample.ID,
  },
  PostID: {
    required: true,
    description: PostAPIDesc.ID,
    example: PostAPIExample.ID,
  },
  Type: {
    description: PostAPIDesc.Type,
    example: PostAPIExample.Type,
    enum: ContentType,
    required: true
  },
  IsRepost: {
    description: PostAPIDesc.Repost,
    example: PostAPIExample.Bool
  },
  IsDraft: {
    description: PostAPIDesc.Draft,
    example: PostAPIExample.Bool
  },
  AuthorID: {
    description: PostAPIDesc.AuthorID,
    example: PostAPIExample.ID
  },
  Origin: {
    description: PostAPIDesc.Origin,
  },
  Tag: {
    description: PostAPIDesc.Tag,
    example: PostAPIExample.Tag,
    minLength: MinMax.TagMin,
    maxLength: MinMax.TagMax,
  },
  Limit: {
    default: MinMax.PostsLimit,
    maximum: MinMax.PostsLimit,
    description: APIDesc.Limit,
    example: APIExample.ID
  }
}
