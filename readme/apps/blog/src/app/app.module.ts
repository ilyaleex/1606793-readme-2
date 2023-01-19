import {Module} from '@nestjs/common';
import {PostModule} from './post/post.module';
import {CommentModule} from './comment/comment.module';
import {ConfigModule} from '@nestjs/config';
import {ENV_FILE_PATH} from './app.constant';
import {rabbitMqOptions} from './config/rabbitmq.config';
import envSchema from './env.schema';
import {jwtOptions} from '@readme/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqOptions, jwtOptions],
      validationSchema: envSchema
    }),
    PostModule,
    CommentModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
