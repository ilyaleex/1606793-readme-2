import {Request, RawBodyRequest, Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject, JwtAuthGuard} from '@readme/core';
import {MAX_COMMENTS_COUNT, DEFAULT_PAGE} from './comment.constant';
import {CommentService} from './comment.service';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRdo} from './rdo/comment.rdo';

interface LoggedUser { // TODO: в shared types
  user: {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
  }
}

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'The comment was created'
  })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateCommentDto,
    @Request() req: RawBodyRequest<LoggedUser>
  ) {
    const comment = await this.commentService.createComment(dto, req.user._id);
    return fillObject(CommentRdo, comment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: `${MAX_COMMENTS_COUNT} or less comments were received`
  })
  @Get(':postId')
  @HttpCode(HttpStatus.OK)
  async getComments(
    @Query('page', new DefaultValuePipe(DEFAULT_PAGE)) page: number,
    @Query('commentsCount', new DefaultValuePipe(MAX_COMMENTS_COUNT)) commentsCount: number,
    @Param('postId') postId: number
  ) {
    const comments = await this.commentService.getComments(postId, page, commentsCount);
    return fillObject(CommentRdo, comments);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The comment was deleted'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':commentId')
  async deleteComment(
    @Param('commentId') commentId: number,
    @Request() req: RawBodyRequest<LoggedUser>
  ) {
    this.commentService.deleteComment(commentId, req.user._id);
  }
}
