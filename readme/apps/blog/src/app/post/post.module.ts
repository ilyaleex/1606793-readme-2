import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import {ClientsModule} from '@nestjs/microservices';
import {JwtModule} from '@nestjs/jwt';
import {getJwtConfig, JwtStrategy} from '@readme/core';
import {PostService} from './post.service';
import {PostController} from './post.controller';
import {CommentModule} from '../comment/comment.module';
import {PostRepository} from './post.repository';
import {PrismaModule} from '../prisma/prisma.module';
import {NOTIFIER_RABBITMQ_SERVICE, USERS_RABBITMQ_SERVICE} from './post.constant';
import {getNotifierRabbitMqConfig, getUsersRabbitMqConfig} from '../config/rabbitmq.config';

@Module({
  imports: [
    CommentModule,
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    ClientsModule.registerAsync([
      {
        name: NOTIFIER_RABBITMQ_SERVICE,
        useFactory: getNotifierRabbitMqConfig,
        inject: [ConfigService]
      },
      {
        name: USERS_RABBITMQ_SERVICE,
        useFactory: getUsersRabbitMqConfig,
        inject: [ConfigService]
      }
    ])
  ],
  providers: [PostService, PostRepository, JwtStrategy],
  controllers: [PostController]
})
export class PostModule {}
