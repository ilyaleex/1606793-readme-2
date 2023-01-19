import {Types} from 'mongoose';
import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';

const BAD_MONGOID_ERROR = 'MongoIdValidationPipe: Bad entity ID';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  transform(value: string, {type}: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe must be used only with params!')
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    return value;
  }
}
