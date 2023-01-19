import {Document} from 'mongoose';
import {Subscriber} from '@readme/shared-types';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop()
  public email: string;

  @Prop()
  public firstName: string;

  @Prop()
  public lastName: string;

  @Prop()
  public userId: string;

  @Prop()
  public subscribersEmails: string[];
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
