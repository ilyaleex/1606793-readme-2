import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {BlogUserModule} from '../blog-user/blog-user.module';

@Module({
  imports: [BlogUserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
