import { ContentType } from "@prisma/client";
import { PostAPIDesc, PostAPIExample } from "../../enum/post.enum";
import { MinMax } from "../../enum/utils.enum";
import { TAPIProp } from "../api-prop";

export const ContentAPIProp: TAPIProp = {
  Base: {
    required: true,
    enum: ContentType,
    description: PostAPIDesc.Type,
    example: PostAPIExample.Type
},
  Link: {
    required: true,
    description: PostAPIDesc.Link,
    example: PostAPIExample.Link
  },
  Desc: {
    description: PostAPIDesc.Desc,
    example: PostAPIExample.Desc
  },
  Photo: {
    required: true,
    description: PostAPIDesc.Photo,
    example: PostAPIExample.Photo
  },
  Quote: {
    required: true,
    minLength: MinMax.QuoteMin,
    maxLength: MinMax.QuoteMax,
    description: PostAPIDesc.Quote,
    example: PostAPIExample.Quote
  },
  Author: {
    required: true,
    minLength: MinMax.AuthorMin,
    maxLength: MinMax.AuthorMax,
    description: PostAPIDesc.Author,
    example: PostAPIExample.Author
  },
  Title: {
    required: true,
    minLength: MinMax.TitleMin,
    maxLength: MinMax.TitleMax,
    description: PostAPIDesc.Title,
    example: PostAPIExample.Title
  },
  Ann: {
    required: true,
    minLength: MinMax.AnnMin,
    maxLength: MinMax.AnnMax,
    description: PostAPIDesc.Ann,
    example: PostAPIExample.Ann
  },
  Text: {
    required: true,
    minLength: MinMax.TextMin,
    maxLength: MinMax.TextMax,
    description: PostAPIDesc.Text,
    example: PostAPIExample.Text
  },
  VideoTitle: {
    required: true,
    minLength: MinMax.TitleMin,
    maxLength: MinMax.TitleMax,
    description: PostAPIDesc.Title,
    example: PostAPIExample.Title
  },
  VideoUrl: {
    required: true,
    description: PostAPIDesc.Video,
    example: PostAPIExample.Video
  }
}

