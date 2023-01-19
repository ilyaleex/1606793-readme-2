import {Controller} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from '@readme/shared-types';
import {IncrementPostsCountDto} from './dto/increment-posts-count.dto';
import {UserService} from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @EventPattern({cmd: CommandEvent.IncrementPostsCount})
  async incrementPostsCount({authorId}: IncrementPostsCountDto) {
    return await this.userService.incrementPostsCount(authorId);
  }

  @EventPattern({cmd: CommandEvent.DecrementPostsCount})
  async decrementPostsCount({authorId}: IncrementPostsCountDto) {
    return await this.userService.decrementPostsCount(authorId);
  }
}
