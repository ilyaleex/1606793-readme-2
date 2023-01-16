import { ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

import { EnvRegisterAs, getMongoConnectionString } from "@readme/core";

export const getMongoDbConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (configService: ConfigService) => ({
      uri: getMongoConnectionString({
        user: configService.get<string>(`${EnvRegisterAs.Users}.user`),
        pass: configService.get<string>(`${EnvRegisterAs.Users}.pass`),
        host: configService.get<string>(`${EnvRegisterAs.Users}.host`),
        port: configService.get<number>(`${EnvRegisterAs.Users}.port`),
        authBase: configService.get<string>(`${EnvRegisterAs.Users}.authBase`),
        database: configService.get<string>(`${EnvRegisterAs.Users}.database`),
      })
    }),
    inject: [ConfigService]
  }
}
