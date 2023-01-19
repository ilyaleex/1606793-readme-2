import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {NOTIFIER_SERVICE_ENV_PATH} from './app.constant';
import {mailOptions} from './config/mail.config';
import {getMongoDbConfig, mongoDbOptions} from './config/mongodb.config';
import {rabbitMqOptions} from './config/rabbitmq.config';
import {EmailSubscriberModule} from './email-subscriber/email-subscriber.module';
import {validateEnvironments} from './env.validation';
import {MailModule} from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFIER_SERVICE_ENV_PATH,
      load: [mongoDbOptions, rabbitMqOptions, mailOptions],
      validate: validateEnvironments
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule,
    MailModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
