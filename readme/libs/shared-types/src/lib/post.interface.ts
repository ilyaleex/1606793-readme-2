import { ContentType } from "@prisma/client";
import { ContentDTO, LinkDTO, PhotoDTO, QuoteDTO, TagDTO, TextDTO, VideoDTO } from "@readme/core";
import { IComment } from "./comment.interface";

export interface IPostBase {
  id?: number;
  type?: ContentType;
  content?: ContentDTO;
  tags?: TagDTO[];
  likes?: string[];
  comments?: IComment[];
  isRepost?: boolean;
  isDraft?: boolean;
  userID?: string;
  origin?: IPost;
  originID?: number;
  authorID?: string;
  publishAt?: Date;
  createdAt?: Date;
}

export interface IPost extends IPostBase {
  link?: LinkDTO
  photo?: PhotoDTO
  quote?: QuoteDTO
  text?: TextDTO
  video?: VideoDTO
}
