import { configModuleConfig, EnvFilePath, jwtOptions } from "@readme/core";
import envSchema from "../env/env.schema";
import envValidation from "../env/env.validation";
import envConfig from "./env.config";

export const usersConfigModuleConfig = {
  ...configModuleConfig,
  envFilePath: EnvFilePath.Users,
  load: [envConfig, jwtOptions],
  validate: envValidation,
  validationSchema: envSchema
}
