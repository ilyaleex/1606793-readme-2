import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { PostVideoModule } from './post-video/post-video.module';
import { PostTextModule } from './post-text/post-text.module';
import { PostQuoteModule } from './post-quote/post-quote.module';
import { PostImageModule } from './post-image/post-image.module';
import { PostLinkModule } from './post-link/post-link.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    CommentModule,
    PostVideoModule,
    PostTextModule,
    PostQuoteModule,
    PostImageModule,
    PostLinkModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
