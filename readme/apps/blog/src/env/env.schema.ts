import { getAppEnvSchema, Port } from '@readme/core';
import * as Joi from 'joi';

const envSchema = {
  DATABASE_URL: Joi
    .string()
    .required(),
  UPLOAD_DIR: Joi
    .string()
    .required(),
}

export default getAppEnvSchema(Port.BlogAPIDefault, envSchema)
