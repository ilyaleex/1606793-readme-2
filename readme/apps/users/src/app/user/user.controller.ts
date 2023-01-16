import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { avatarExtRegExp, fillObject, getAvatarFileName, getAvatarUploadDest, MinMax, ParamName, Prefix, UploadFileDTO, UserAPIDesc, UserInfo } from '@readme/core';

import { Express } from 'express';
import { diskStorage } from 'multer';

import { UserService } from './user.service';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';
import { UserRDO } from './rdo/user.rdo';
import { UserUpdateDTO } from './dto/user-update.dto';
import { SubQuery } from './query/sub.query';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags(Prefix.User)
@Controller(Prefix.User)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Found
  })
  async index() {
    const users = await this.userService.getUsers()

    return users.map((user) => fillObject(UserRDO, user));
  }

  @UseGuards(JwtAuthGuard)
  @Get(`:${ParamName.UserID}`)
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Found
  })
  async show(@Param(ParamName.UserID, MongoIdValidationPipe) userID: string) {
    const user = await this.userService.getUser(userID);

    return fillObject(UserRDO, user);
  }

  @Patch(`:${ParamName.UserID}`)
  @ApiBody({
    type: UserUpdateDTO
  })
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Updated
  })
  async update(
    @Param(ParamName.UserID, MongoIdValidationPipe) userID: string,
    @Body() dto: UserUpdateDTO
  ) {
    const update = await this.userService.update(userID, dto);

    return fillObject(UserRDO, update);
  }

  @Patch(`:${ParamName.UserID}/avatar`)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: getAvatarUploadDest,
      filename: getAvatarFileName,
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: UserAPIDesc.Avatar,
    type: UploadFileDTO
  })
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Avatar
  })
  async uploadAvatar(
    @Param(ParamName.UserID, MongoIdValidationPipe) userID: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: avatarExtRegExp,
        })
        .addMaxSizeValidator({
          maxSize: MinMax.AvatarMaxBytes
        })
        .build(),
    )
    file: Express.Multer.File
  ) {
    const update = await this.userService.update(userID, {avatarUrl: file.path});

    return fillObject(UserRDO, update);
  }

  @Patch(`:${ParamName.UserID}/subscribe`)
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Updated
  })
  async subscribe(
    @Param(ParamName.UserID, MongoIdValidationPipe) userID: string,
    @Query() {to}: SubQuery
  ) {
    const update = await this.userService.subscribe(userID, to);

    return fillObject(UserRDO, update);
  }
}
