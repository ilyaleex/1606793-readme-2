import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamName, fillObject, Prefix, CommentInfo } from '@readme/core';

import { CommentService } from './comment.service';
import { CommentCreateDTO } from './dto/comment-create.dto';
import { CommentQuery } from './query/comment.query';
import { CommentRDO } from './rdo/comment.rdo';

@ApiTags(Prefix.Comments)
@Controller(Prefix.Comments)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentInfo.Loaded
  })
  async getComments(
    @Query() query: CommentQuery
    ) {
    return this.commentService.getCommentsForPost(query)
  }

  @Post()
  @ApiResponse({
    type: [CommentRDO],
    status: HttpStatus.CREATED,
    description: CommentInfo.Created
  })
  async create(
    @Query() {postID}: CommentQuery,
    @Body() dto: CommentCreateDTO
    ) {
    const comment = await this.commentService.createComment(postID, dto);

    return fillObject(CommentRDO, comment);
  }

  @Delete(`:${ParamName.CommentID}`)
  @ApiResponse({
   status: HttpStatus.OK,
   description: CommentInfo.Deleted
  })
  async delete(@Param(ParamName.CommentID) commentID: number) {
    return this.commentService.deleteComment(commentID);
  }
}
