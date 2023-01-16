import { APIDesc, APIExample } from "../../enum/comment.enum";
import { MinMax } from "../../enum/utils.enum";
import { TAPIProp } from "../api-prop";

export const CommentAPIProp: TAPIProp = {
  Text: {
    required: true,
    description: APIDesc.Text,
    example: APIExample.Text,
    minLength: MinMax.CommentMin,
    maxLength: MinMax.CommentMax
  },
  UserID: {
    required: true,
    description: APIDesc.UserID,
    example: APIExample.ID,
  },
  CommentID: {
      description: APIDesc.CommentID,
      example: APIExample.ID,
      required: true
    },
  Post: {
    description: APIDesc.Post,
    required: true,
    type: 'Post'
  },
  PostID: {
    required: true,
    description: APIDesc.PostID,
    example: APIExample.ID
  },
  Limit: {
    default: MinMax.CommentsLimit,
    maximum: MinMax.CommentsLimit,
    description: APIDesc.Limit,
    example: APIExample.ID
  }
}
