import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { notifyConfigModuleConfig } from '../config/config.module.config';
import { getMailerConfig } from '../config/mail.config';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(notifyConfigModuleConfig),
    MailerModule.forRootAsync(getMailerConfig()),
    MailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
