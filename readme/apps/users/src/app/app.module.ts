import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import {ENV_FILE_PATH} from './app.const';
import databaseConfig from '../config/database.config';
import {getMongoDbConfig} from '../config/mongodb.config';
import {MongooseModule} from '@nestjs/mongoose';
import {validateEnvironments} from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig],
      validationSchema: validateEnvironments
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    BlogUserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
