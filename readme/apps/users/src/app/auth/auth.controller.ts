import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {AuthService} from './auth.service';
import {ApiProperty, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UserRdo} from './rdo/user.rdo';
import {fillObject} from '@readme/core';
import {LoginUserDto} from './dto/login-user.dto';
import {LoggedUserRdo} from './rdo/logged-user.rdo';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new user has been successfully created.'
  })
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or login is wrong.',
  })
  async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillObject(LoggedUserRdo, verifiedUser);
  }

  @Get(':id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }
}
