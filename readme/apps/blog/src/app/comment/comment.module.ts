import { forwardRef, Module } from '@nestjs/common';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { PostModule } from '../posts/post.module';

@Module({
  imports: [forwardRef(() => PostModule)],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentRepository]
})
export class CommentModule {}
