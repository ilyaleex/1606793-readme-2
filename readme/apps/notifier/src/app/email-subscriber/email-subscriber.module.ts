import {Module} from '@nestjs/common';
import {EmailSubscriberController} from './email-subscriber.controller';
import {EmailSubscriberService} from './email-subscriber.service';
import {EmailSubscriberRepository} from './email-subscriber.repository';
import {MongooseModule} from '@nestjs/mongoose';
import {EmailSubscriberModel, EmailSubscriberSchema} from './email-subscriber.model';
import {MailModule} from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: EmailSubscriberModel.name, schema: EmailSubscriberSchema}
    ]),
    MailModule
  ],
  controllers: [
    EmailSubscriberController
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository
  ]
})
export class EmailSubscriberModule {}
