import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CoreError } from '../enum/core-error.enum';

export class PrivateRouteMiddleware implements NestMiddleware {
  public async use(req: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!req.body.user) {
      throw new HttpException(
        CoreError.Unauthorized,
        HttpStatus.UNAUTHORIZED
      );
    }

    return next();
  }
}
