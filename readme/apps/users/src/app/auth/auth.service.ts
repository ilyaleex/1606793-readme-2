import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UserInterface} from '@readme/shared-types';
import {BlogUserEntity} from '../blog-user/blog-user.entity';
import {AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG} from './auth.const';
import {LoginUserDto} from './dto/login-user.dto';
import {BlogUserRepository} from '../blog-user/blog-user.repository';

@Injectable()
export class AuthService {

  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  async register(dto: CreateUserDto) {
    const {email, firstname, lastname, password} = dto;

    const blogUser: UserInterface = {
      _id: '', email, firstname, lastname,
      passwordHash: '', avatar: ''
    }

    const existUser = await this.blogUserRepository.findByEmail(email)

    if (existUser) {
      throw new Error(AUTH_USER_EXISTS)
    }

    const userEntity = new BlogUserEntity(blogUser)
      .setPassword(password);

    return this.blogUserRepository.create(await userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new Error(AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)) {
      throw new Error(AUTH_USER_PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();
  }

  async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }
}
