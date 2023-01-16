import { Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import { AuthError, fillObject, Path, Prefix, UserInfo } from '@readme/core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserLoggedRDO } from '../user/rdo/user-logged.rdo';
import { UserCreateDTO } from '../user/dto/user-create.dto';
import { UserRDO } from '../user/rdo/user.rdo';
import { UserLoginDTO } from '../user/dto/user-login.dto';
import { AuthService } from './auth.service';

@ApiTags(Prefix.Auth)
@Controller(Prefix.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post(Path.Register)
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: UserInfo.Register
  })
  async register(
    @Body() dto: UserCreateDTO
  ) {
    const user = await this.authService.register(dto);

    return fillObject(UserRDO, user);
  }

  @Post(Path.Login)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UserLoggedRDO,
    status: HttpStatus.OK,
    description: UserInfo.Login
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.Login,
  })
  async login(
    @Body() dto: UserLoginDTO
  ) {
    const user = await this.authService.verifyUser(dto)

    const token = await this.authService.loginUser(user)

    return fillObject(UserRDO, {...user, token})
  }
}
