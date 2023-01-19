import {Entity} from '@readme/core';
import {Subscriber} from '@readme/shared-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public _id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public userId: string;
  public subscribersEmails: string[];

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(subscriber: Subscriber) {
    this._id = subscriber._id;
    this.email = subscriber.email;
    this.userId = subscriber.userId;
    this.firstName = subscriber.firstName;
    this.lastName = subscriber.lastName;
    this.subscribersEmails = subscriber.subscribersEmails;
  }

  public toObject(): EmailSubscriberEntity {
    return {...this};
  }
}
