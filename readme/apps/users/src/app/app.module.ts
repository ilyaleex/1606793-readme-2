import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import databaseConfig from '../config/database.config';
import {getMongoDbConfig} from '../config/mongodb.config';
import {ENV_FILE_PATH} from './app.constant';
import {AuthModule} from './auth/auth.module';
import envSchema from './env.schema';
import {UserModule} from './user/user.module';
import {jwtOptions} from '../config/jwt.config';
import {rabbitMqOptions} from '../config/rabbitmq.config';
import {MulterModule} from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST')
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtOptions, rabbitMqOptions],
      validationSchema: envSchema
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
