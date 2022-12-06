import {CRUDInterface} from '@readme/core';
import {UserInterface} from '@readme/shared-types';
import {BlogUserEntity} from './blog-user.entity';
import {BlogUserModel} from './blog-user.model';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class BlogUserRepository implements CRUDInterface<BlogUserEntity, string, UserInterface> {
  constructor(
    @InjectModel(BlogUserModel.name) private readonly blogUserModel: Model<BlogUserModel>) {
  }

  public async create(item: BlogUserEntity): Promise<UserInterface> {
    const newBlogUser = new this.blogUserModel(item);
    return newBlogUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.blogUserModel.deleteOne({id});
  }

  public async findById(id: string): Promise<UserInterface | null> {
    return this.blogUserModel
      .findOne({id})
      .exec();
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    return this.blogUserModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: BlogUserEntity): Promise<UserInterface> {
    return this.blogUserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
