import { forwardRef, Module } from '@nestjs/common';

import { CommentModule } from '../comment/comment.module';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [forwardRef(() => CommentModule)],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostRepository]
})
export class PostModule {}
