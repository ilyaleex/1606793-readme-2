import {
  Request,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  RawBodyRequest,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder
} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {editFileName, fillObject} from '@readme/core';
import {MongoIdValidationPipe} from '../pipes/mongoid-validation.pipe';
import {AuthService} from './auth.service';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {UserRdo} from './rdo/user.rdo';
import {JwtAuthGuard} from './guards/jwt-auth.guard';
import {TransformedUserRdo} from './rdo/transformed-user.rdo';
import {ChangePasswordDto} from './dto/change-password.dto';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {Express} from 'express';

interface LoggedUser { // TODO: в shared types
  user: {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
  }
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @ApiResponse({
    type: UserRdo
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    type: LoggedUserRdo
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);
    const transformedUser = fillObject(TransformedUserRdo, user);
    const accessToken = await this.authService.loginUser(transformedUser);
    return fillObject(LoggedUserRdo, {...user, ...accessToken});
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo
  })
  @Post(':authorId/subscription')
  @HttpCode(HttpStatus.OK)
  async subscribe(
    @Param('authorId') authorId: string,
    @Request() req: RawBodyRequest<LoggedUser>
  ) {
    const subscription = await this.authService.toggleSubscriberStatus(authorId, req.user.email);
    return fillObject(UserRdo, subscription);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo
  })
  @Post('passchange')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @Request() req: RawBodyRequest<LoggedUser>
  ) {
    const user = await this.authService.changePassword(dto, req.user._id);
    return fillObject(UserRdo, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName
      })
    })
  )
  async uploadedFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/i,
        })
        .addMaxSizeValidator({
          maxSize: 500000
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    ) file: Express.Multer.File,
    @Request() req: RawBodyRequest<LoggedUser>
  ) {
    return this.authService.setAvatarPath(req.user._id, file.filename);
  }
}
