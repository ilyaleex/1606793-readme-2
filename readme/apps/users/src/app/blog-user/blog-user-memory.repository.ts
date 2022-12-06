import {CRUDInterface} from '@readme/core';
import {BlogUserEntity} from './blog-user.entity';
import {UserInterface} from '@readme/shared-types';
import {Injectable} from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class BlogUserMemoryRepository implements CRUDInterface<BlogUserEntity, string, UserInterface> {
  private repository: {[key: string]: UserInterface} = {};

  public async findByEmail(email: string): Promise<UserInterface> {
    const existUser = Object.values(this.repository)
      .find((userItem) => userItem.email === email);

    if (!existUser) {
      return null;
    }

    return {...existUser}
  }

  public async create(item: BlogUserEntity): Promise<UserInterface> {
    const entry = {...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;
    return {...entry};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async findById(id: string): Promise<UserInterface | null> {
    if (this.repository[id]) {
      return {...this.repository[id]}
    }
    return null;
  }

  public async update(id: string, item: BlogUserEntity): Promise<UserInterface> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
