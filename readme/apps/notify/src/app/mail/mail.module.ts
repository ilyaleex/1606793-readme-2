import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [MailController],
  exports: [],
})
export class MailModule {}
