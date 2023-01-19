import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserEntity} from '../user/user.entity';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import {UserRepository} from '../user/user.repository';
import {JwtService} from '@nestjs/jwt';
import {CommandEvent} from '@readme/shared-types';
import {RABBITMQ_SERVICE} from './auth.constant';
import {ClientProxy} from '@nestjs/microservices';
import {ChangePasswordDto} from './dto/change-password.dto';

interface TransformedUser { // TODO: в shared types
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  async register(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new Error('User with the email already exists!');
    }

    const userEntity = await new UserEntity({
      ...dto,
      passwordHash: '',
      postsCount: 0,
      subscribersCount: 0,
      subscribersEmails: []
    }).setPassword(dto.password);

    const createdUser = await this.userRepository.create(userEntity);

    this.rabbitClient.emit(
      {cmd: CommandEvent.RegisterNewBlogUser},
      {
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        userId: createdUser._id.toString(),
        subscribersIds: []
      }
    );

    return createdUser;
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('No users with such email found!');
    }

    const userEntity = new UserEntity(user);
    const checkUserResult = await userEntity.comparePassword(password);

    if (!checkUserResult) {
      throw new UnauthorizedException('The provided password is incorrect!');
    }

    return {...userEntity.toObject()};
  }

  async loginUser(user: TransformedUser) {
    const payload = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }

  async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  async changePassword({password, newPassword}: ChangePasswordDto, userId: string) {
    const user = await this.userRepository.findById(userId);

    const userEntity = new UserEntity(user);
    const checkUserResult = await userEntity.comparePassword(password);

    if (!checkUserResult) {
      throw new UnauthorizedException('The provided password is incorrect!');
    }

    const updatedUserEntity = await userEntity.setPassword(newPassword);
    const updatedUser = await this.userRepository.update(userId, updatedUserEntity);
    return updatedUser;
  }

  async toggleSubscriberStatus(id: string, email: string) {
    const user = await this.getUser(id);
    const subscribersEmails = [...user.subscribersEmails];
    const existsSubscriber = subscribersEmails.some((subscriberEmail) => subscriberEmail === email);

    if (existsSubscriber) {
      const updatedSubscribersEmails = subscribersEmails.filter((subscriberEmail) => subscriberEmail !== email);
      const updatedUser = {...user, subscribersEmails: updatedSubscribersEmails, subscribersCount: user.subscribersCount - 1};
      const updatedUserEntity = new UserEntity(updatedUser);
      const updatedUserEntry = await this.userRepository.update(id, updatedUserEntity);

      this.rabbitClient.emit(
        {cmd: CommandEvent.RemoveSubscriber},
        {
          authorEmail: updatedUserEntry.email,
          subscriberEmail: email
        }
      );
      
      return updatedUserEntry;
    }

    subscribersEmails.push(email);
    const updatedUser = {...user, subscribersEmails, subscribersCount: user.subscribersCount + 1};
    const updatedUserEntity = new UserEntity(updatedUser);
    const updatedUserEntry = await this.userRepository.update(id, updatedUserEntity);

    this.rabbitClient.emit(
      {cmd: CommandEvent.AddSubscriber},
      {
        authorEmail: updatedUserEntry.email,
        subscriberEmail: email
      }
    );

    return updatedUserEntry;
  }

  async setAvatarPath(userId: string, avatarPath: string) {
    const user = await this.userRepository.findById(userId);

    const userEntity = new UserEntity({...user, avatarPath});

    return this.userRepository.update(userId, userEntity);
  }
}
