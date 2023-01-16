import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommentModule } from './comment/comment.module';
import { PostModule } from './posts/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { blogConfigModuleConfig } from '../config/config.module.config';

@Module({
  imports: [
    ConfigModule.forRoot(blogConfigModuleConfig),
    PrismaModule,
    PostModule,
    CommentModule
  ],
  controllers: [],
  providers: [PostModule, CommentModule],
})
export class AppModule {}
