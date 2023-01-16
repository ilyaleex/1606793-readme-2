import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamName, fillObject, Prefix, PostInfo } from '@readme/core';

import { PostCreateDTO } from './dto/post-create.dto';
import { PostUpdateDTO } from './dto/post-update.dto';

import { PostService } from './post.service';
import { PostTypeQuery } from './query/post-type.query';
import { PostQuery } from './query/post.query';
import { PostRDO } from './rdo/post.rdo';

@ApiTags(Prefix.Posts)
@Controller(Prefix.Posts)
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get(`:${ParamName.PostID}`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Found
  })
  async show(
    @Param(ParamName.PostID) postID: number
  ) {
    const post = await this.postService.getPost(postID);

    return fillObject(PostRDO, post);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async index(
    @Query() query: PostQuery
  ) {
    return this.postService.getPosts(query)
  }

  @Post()
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.CREATED,
    description: PostInfo.Created
  })
  async create(
    @Query() {type}: PostTypeQuery,
    @Body() dto: PostCreateDTO
  ) {
    const post = await this.postService.createPost(dto, type);

    return fillObject(PostRDO, post);
  }

  @Patch(`:${ParamName.PostID}`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Updated
  })
  async update(
    @Param(ParamName.PostID) postID: number,
    @Body() dto: PostUpdateDTO
  ) {
    const post = await this.postService.updatePost(postID, dto);

    return fillObject(PostRDO, post);
  }

  @Delete(`:${ParamName.PostID}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Deleted
  })
  async destroy(
    @Param(ParamName.PostID
      ) postID: number) {
    await this.postService.deletePost(postID)
    }

  @Post(`:${ParamName.PostID}/repost`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async repost(@Param(ParamName.PostID) postID: number) {
    const post = await this.postService.repost(postID);

    return fillObject(PostRDO, post);
  }

  @Post(`:${ParamName.PostID}/like`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async like(
    @Param(ParamName.PostID) postID: number,
    @Body() {userID}: PostUpdateDTO
  ) {
    const post = await this.postService.likePost(postID, userID);

    return fillObject(PostRDO, post);
  }
}
