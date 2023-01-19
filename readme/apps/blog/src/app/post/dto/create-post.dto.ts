import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsOptional, IsUrl, Matches, MaxLength, MinLength, ValidateNested} from 'class-validator';

const videoUrlRegExp = /.+(?:www.youtube.com).+/i;

class Video {
  @MinLength(20)
  @MaxLength(50)
  public videoTitle: string;

  @Matches(videoUrlRegExp)
  @IsUrl()
  public videoUrl: string;
}

class Text {
  @MinLength(20)
  @MaxLength(50)
  public textTitle: string;

  @MinLength(50)
  @MaxLength(255)
  public textAnnouncement: string;

  @MinLength(100)
  @MaxLength(1024)
  public text: string;
}

class Quote {
  @MinLength(20)
  @MaxLength(300)
  public quoteText: string;

  @MinLength(3)
  @MaxLength(50)
  public quoteAuthor: string;
}

class Photo {
  // Обязательно
  image: string; // Максимальный размер фотографии: 1 мегабайт. Допускаются форматы: jpg, png.
}

class Link {
  @IsUrl()
  public linkUrl: string;

  @MaxLength(300)
  @IsOptional()
  public linkDescription: string;
}

export class CreatePostDto {
  @ApiProperty({
    description: 'Must be one of the following types: video, text, quote, photo, link',
    example: 'video'
  })
  public type: 'video' | 'text' | 'quote' | 'photo' | 'link';

  @ApiProperty({
    description: 'The unique set of properies according to the "type"',
    example: 'Look the "ContentType"'
  })
  @ValidateNested({each: true})
  @Type(({ object }) => {
    switch(object.type){
      case 'video':
        return Video;
      case 'text':
        return Text;
      case 'quote':
        return Quote;
      case 'photo':
        return Photo;
      case 'link':
        return Link;
    }
  })
  public content: Video | Text | Quote | Photo | Link;

  @ApiProperty({
    description: 'An array of tags',
    example: '["link", "beautifulphoto", "postaboutmyjourney"]'
  })
  public tags?: string[];

  @ApiProperty({
    description: 'The field indicating whether the post was published or not',
    example: 'true'
  })
  public isPublished?: boolean;
}
