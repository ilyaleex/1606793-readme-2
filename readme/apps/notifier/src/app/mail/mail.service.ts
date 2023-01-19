import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {Subscriber} from '@readme/shared-types';
import {EMAIL_ADD_POST_SUBJECT, EMAIL_ADD_NEW_USER_SUBJECT, EMAIL_REMOVE_SUBSCRIBER_SUBJECT, EMAIL_ADD_SUBSCRIBER_SUBJECT} from './mail.constant';
import {ToggleSuscriberStatusDto} from '../email-subscriber/dto/toggle-suscriber-status.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  public async sendNewUserRegisteredNotification(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_NEW_USER_SUBJECT,
      template: './add-new-user',
      context: {
        user: `${subscriber.firstName} ${subscriber.lastName}`,
        email: `${subscriber.email}`
      }
    })
  }

  public async sendNewPostNotification(emails: string[]) {
    await this.mailerService.sendMail({
      to: emails,
      subject: EMAIL_ADD_POST_SUBJECT,
      template: './add-post',
      context: {
      }
    })
  }

  public async sendAddSubscriberNotification({authorEmail, subscriberEmail}: ToggleSuscriberStatusDto) {
    await this.mailerService.sendMail({
      to: subscriberEmail,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        authorEmail
      }
    })
  }

  public async sendRemoveSubscriberNotification({authorEmail, subscriberEmail}: ToggleSuscriberStatusDto) {
    await this.mailerService.sendMail({
      to: subscriberEmail,
      subject: EMAIL_REMOVE_SUBSCRIBER_SUBJECT,
      template: './remove-subscriber',
      context: {
        authorEmail
      }
    })
  }
}
