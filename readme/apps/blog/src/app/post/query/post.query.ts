import {Transform} from 'class-transformer';
import {IsNumber, IsOptional, IsString} from 'class-validator';
import {DEFAULT_PAGE, MAX_POSTS_COUNT, SortType} from '../post.constant';

export class PostQuery {
  @Transform(({value}) => +value || DEFAULT_PAGE)
  @IsOptional()
  @IsNumber()
  public page = DEFAULT_PAGE;

  @Transform(({value}) => +value || MAX_POSTS_COUNT)
  @IsOptional()
  @IsNumber()
  public postsCount = MAX_POSTS_COUNT;

  @IsOptional()
  @IsString()
  public sortType = SortType.Default;

  @IsOptional()
  @IsString()
  public authorId: string;

  @IsOptional()
  @IsString()
  public tag: string;

  @IsOptional()
  @IsString()
  public type: string;
}
