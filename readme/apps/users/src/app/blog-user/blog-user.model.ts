import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {UserInterface} from '@readme/shared-types';


@Schema({
  collection: 'users',
})

export class BlogUserModel extends Document implements UserInterface {
  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true
  })
  public firstname: string;

  @Prop({
    required: true
  })
  public lastname: string;

  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop()
  public avatar: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);

