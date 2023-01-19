import {CRUDRepository} from '@readme/core';
import {EmailSubscriberEntity} from './email-subscriber.entity';
import {Subscriber} from '@readme/shared-types';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {EmailSubscriberModel} from './email-subscriber.model';

@Injectable()
export class EmailSubscriberRepository implements CRUDRepository<EmailSubscriberEntity, string, Subscriber> {
  constructor(
    @InjectModel(EmailSubscriberModel.name) private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) {}

  public async create(item: EmailSubscriberEntity): Promise<Subscriber> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return newEmailSubscriber.save();
  }

  // реализовать выборку по подпискам
  public async find(): Promise<Subscriber[]> {
    return this.emailSubscriberModel.find({ /* subscriptions: id */ }).exec(); // выборка всех записей из БД
  }

  public async findById(id: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel.findById(id);
  }

  public async findByEmail(email: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel.findOne({email});
  }
  
  public async update(id: string, item: EmailSubscriberEntity): Promise<Subscriber> {
    return this.emailSubscriberModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    this.emailSubscriberModel.findByIdAndDelete(id);
  }
}