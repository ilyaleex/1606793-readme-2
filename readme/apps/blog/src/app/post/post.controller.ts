import {Request, RawBodyRequest, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject, JwtAuthGuard} from '@readme/core';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {MAX_POSTS_COUNT} from './post.constant';
import {PostService} from './post.service';
import {DraftPostQuery} from './query/draft-post.query';
import {PostQuery} from './query/post.query';
import {PostRdo} from './rdo/post.rdo';

interface LoggedUser { // TODO: в shared types
  user: {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
  }
}

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'A new post has been successfully created'
  })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreatePostDto,
    @Request() req: RawBodyRequest<LoggedUser>
  ) {
    const post = await this.postService.createPost(dto, req.user._id);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: `${MAX_POSTS_COUNT} or less posts were received`
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getPosts(@Query() query: PostQuery) {
    const posts = await this.postService.getPosts(query);
    return fillObject(PostRdo, posts);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: `${MAX_POSTS_COUNT} or less posts were received`
  })
  @Get('drafts')
  @HttpCode(HttpStatus.OK)
  async getDrafts(
    @Query() query: DraftPostQuery,
    @Request() req: RawBodyRequest<LoggedUser>
  ) {
    const posts = await this.postService.getDrafts(query, req.user._id);
    return fillObject(PostRdo, posts);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'The post was updated'
  })
  @Patch(':postId')
  @HttpCode(HttpStatus.OK)
  async updatePost(
    @Body() dto: UpdatePostDto,
    @Param('postId') postId: number,
    @Request() req: RawBodyRequest<LoggedUser>
  ) {
    const post = await this.postService.updatePost(dto, postId, req.user._id);
    return fillObject(PostRdo, post);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'The like was set (or unset)'
  })
  @Patch(':postId/like')
  @HttpCode(HttpStatus.OK)
  async smashLike(
    @Param('postId') postId: number,
    @Request() req: RawBodyRequest<LoggedUser>
  ) {
    const post = await this.postService.changeLikesCount(postId, req.user._id);
    return fillObject(PostRdo, post);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The post was deleted'
  })
  @Delete(':postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(
    @Param('postId') postId: number,
    @Request() req: RawBodyRequest<LoggedUser>
  ) {
    return await this.postService.deletePost(postId, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'The post was reposted'
  })
  @Post('repost/:postId')
  @HttpCode(HttpStatus.OK)
  async repost(
    @Param('postId') postId: number,
    @Request() req: RawBodyRequest<LoggedUser>
  ) {
    const post = await this.postService.repost(postId, req.user._id);
    return fillObject(PostRdo, post);
  }
}
