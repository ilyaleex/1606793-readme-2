import {CommentInterface} from './comment.interface';

export interface PostInterface {
  _id?: string;
  name: string;
  link: string;
  image: string;
  text: string;
  author: string;
  announcement: string;
  videoLink: string;
  tags: string[];
  comment: CommentInterface[];
}
