import {Injectable} from '@nestjs/common';
import {UserRepository} from './user.repository';
import {UserEntity} from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async incrementPostsCount(authorId: string) {
    const user = await this.userRepository.findById(authorId);
    const postsCount = user.postsCount + 1;
    const userEntity = new UserEntity({ ...user, postsCount });

    return await this.userRepository.update(authorId, userEntity);
  }

  async decrementPostsCount(authorId: string) {
    const user = await this.userRepository.findById(authorId);
    const postsCount = user.postsCount - 1;
    const userEntity = new UserEntity({ ...user, postsCount });

    return await this.userRepository.update(authorId, userEntity);
  }
}
