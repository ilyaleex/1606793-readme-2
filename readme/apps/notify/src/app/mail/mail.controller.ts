import { MailerService } from "@nestjs-modules/mailer";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MailConfig, Prefix } from "@readme/core";
import { MailCreateDTO } from "./dto/mail-create.dto";

@ApiTags(Prefix.Mail)
@Controller(Prefix.Mail)
export class MailController {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  @Post()
  async sendEmail(
    @Body() {email, name, postIDs}: MailCreateDTO
  ) {
    return await this.mailerService.sendMail({
      to: email,
      subject: MailConfig.Subject,
      template: MailConfig.Template,
      context: { name, postIDs }
    })
  }
}
