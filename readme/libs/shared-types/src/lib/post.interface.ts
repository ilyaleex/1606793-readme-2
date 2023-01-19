import {Comment} from './comment.interface';
import {Prisma} from '@prisma/client';

interface Video {
  videoTitle: string;
  videoUrl: string;
}

interface Text {
  textTitle: string;
  textAnnouncement: string;
  text: string;
}

interface Quote {
  quoteText: string;
  quoteAuthor: string;
}

interface Photo {
  image: string;
}

interface Link {
  linkUrl: string;
  linkDescription?: string;
}

export type ContentType = Video | Text | Quote | Photo | Link | Prisma.JsonValue;

export interface Post {
  id?: number;
  type: string;
  createdAt?: Date;
  date?: Date;
  isPublished?: boolean;
  likes?: string[];
  likesCount: number;
  comments?: Comment[];
  tags?: string[];
  isRepost?: boolean;
  authorId: string;
  originalAuthorId?: string;
  originalId?: number;
  content: ContentType;
}
