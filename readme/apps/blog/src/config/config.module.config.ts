import { configModuleConfig } from "@readme/core";
import { EnvFilePath } from "../../../../libs/core/src";
import envSchema from "../env/env.schema";
import envValidation from "../env/env.validation";
import envConfig from "./env.config";

export const blogConfigModuleConfig = {
  ...configModuleConfig,
  envFilePath: EnvFilePath.Blog,
  load: [envConfig],
  validate: envValidation,
  validationSchema: envSchema
}
