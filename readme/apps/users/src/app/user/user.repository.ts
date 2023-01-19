import {Injectable} from '@nestjs/common';
import {CRUDRepository} from '@readme/core';
import {User} from '@readme/shared-types';
import {UserEntity} from './user.entity';
import {InjectModel} from '@nestjs/mongoose';
import {UserModel} from './user.model';
import {Model} from 'mongoose';

@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
    ) {}

  public async create(item: UserEntity): Promise<User> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({email});
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    return this.userModel.findByIdAndDelete(id);
  }
}
