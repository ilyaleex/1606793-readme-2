import {EmailSubscriberService} from './email-subscriber.service';
import {CreateSubscriberDto} from './dto/create-subscriber.dto';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from '@readme/shared-types';
import {Controller} from '@nestjs/common';
import {ToggleSuscriberStatusDto} from './dto/toggle-suscriber-status.dto';
//import {IncrementPostsCountDto} from './dto/create-post.dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
  ) {}

  @EventPattern({cmd: CommandEvent.RegisterNewBlogUser})
  public async registerNewBlogUser(subscriber: CreateSubscriberDto) {
    return this.subscriberService.registerNewBlogUser(subscriber);
  }

  @EventPattern({cmd: CommandEvent.AddPost})
  public async addPost(/* {id}: IncrementPostsCountDto */) { // имплементировать отправку писем только подписчикам автора поста
    return this.subscriberService.addPost(/* id */);
  }

  @EventPattern({cmd: CommandEvent.AddSubscriber})
  public async addSubscriber(subscriberData: ToggleSuscriberStatusDto) {
    return this.subscriberService.toggleSubscriberStatus(subscriberData);
  }

  @EventPattern({cmd: CommandEvent.RemoveSubscriber})
  public async removeSubscriber(subscriberData: ToggleSuscriberStatusDto) {
    return this.subscriberService.toggleSubscriberStatus(subscriberData);
  }
}
