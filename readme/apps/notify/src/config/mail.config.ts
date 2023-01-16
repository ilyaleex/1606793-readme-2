import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { ConfigService } from "@nestjs/config";

import { EnvRegisterAs, getMailTransportString } from "@readme/core";
import { join } from "path";

export const getMailerConfig = (): MailerAsyncOptions => {
  return {
    useFactory: async (configService: ConfigService) => ({
      transport: getMailTransportString({
        user: configService.get<string>(`${EnvRegisterAs.Notify}.user`),
        port: configService.get<number>(`${EnvRegisterAs.Notify}.port`),
        pass: configService.get<string>(`${EnvRegisterAs.Notify}.pass`),
        host: configService.get<string>(`${EnvRegisterAs.Notify}.host`),
      }),
      defaults: {
        from: `"No Reply" <${configService.get<number>(`${EnvRegisterAs.Notify}.from`)}>`,
      },
      template: {
        dir: join(__dirname, './assets/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    inject: [ConfigService]
  }
}
