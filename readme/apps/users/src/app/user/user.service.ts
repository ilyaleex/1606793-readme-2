import { Injectable } from '@nestjs/common';
import { AuthError } from '@readme/core';

import { UserUpdateDTO } from './dto/user-update.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getUsers() {
    return await this.userRepository.find()
  }

  async getUser(userID: string) {
    const user = await this.userRepository.findOne(userID);

    if (!user) {
      throw new Error(AuthError.NotFound);
    }

    return user;
  }

  async update(userID: string, { avatarUrl, password }: UserUpdateDTO) {
    const user = await this.userRepository.findOne(userID)

    if (!user) {
      throw new Error(AuthError.NotFound);
    }

    const update = {
      ...user,
      avatarUrl: avatarUrl ?? user.avatarUrl,
    }

    const userEntity = password
      ? new UserEntity(update)
      : await new UserEntity(update).setPassword(password)

    return await this.userRepository.update(userID, userEntity)
  }

  async subscribe(userID: string, subToID: string) {
    const user = await this.userRepository.findOne(userID)

    if (!user) {
      throw new Error(AuthError.NotFound);
    }

    const subTo = await this.userRepository.findOne(subToID)

    if (!subTo) {
      throw new Error(AuthError.Sub);
    }

    return await this.userRepository.subscribe(user, subTo)
  }
}
