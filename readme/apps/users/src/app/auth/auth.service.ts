import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from '@readme/shared-types';
import { AuthError } from '@readme/core';

import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserCreateDTO } from '../user/dto/user-create.dto';
import { UserLoginDTO } from '../user/dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: UserCreateDTO) {
    const {email, name, password} = dto;
    const user = {
      email,
      name,
      avatarUrl: '',
      subscriptions: [],
      passwordHash: '',
      accessToken: ''
    };

    const existUser = await this.userRepository
      .findByEmail(email);

    if (existUser) {
      throw new Error(AuthError.Email);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password)

    return this.userRepository
      .create(userEntity);
  }

  async verifyUser(dto: UserLoginDTO) {
    const {email, password} = dto;

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException(AuthError.Login);
    }

    const userEntity = new UserEntity(user);

    if (! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthError.Login);
    }

    return userEntity.toObject();
  }

  async loginUser(user: IUser) {
    const payload = {
      sub: user._id,
      email: user.email,
    };

    return await this.jwtService.signAsync(payload)
  }
}
