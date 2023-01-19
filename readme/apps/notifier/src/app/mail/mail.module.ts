import {Module} from '@nestjs/common';
import {MailService} from './mail.service';
import {MailerModule} from '@nestjs-modules/mailer';
import {getMailConfig} from '../config/mail.config';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailConfig())
  ],
  providers: [
    MailService
  ],
  exports: [
    MailService
  ]
})
export class MailModule {}
