import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from '@readme/shared-types';

const USERS_COLLECTION_NAME = 'users';

@Schema({
  collection: USERS_COLLECTION_NAME,
  timestamps: true
})
export class UserModel extends Document implements User {
  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    required: true
  })
  public firstName: string;

  @Prop({
    required: true
  })
  public lastName: string;

  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop()
  public avatarPath: string;

  @Prop({
    required: true
  })
  public postsCount: number;

  @Prop({
    required: true
  })
  public subscribersCount: number;

  @Prop()
  public subscribersEmails: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
