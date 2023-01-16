import { getAppEnvSchema, Port } from '@readme/core';
import * as Joi from 'joi';

const envSchema = {
  MONGO_DB: Joi
    .string()
    .required(),
  MONGO_HOST: Joi
    .string()
    .hostname()
    .required(),
  MONGO_PORT: Joi
    .number()
    .port()
    .default(Port.DBDefault)
    .required(),
  MONGO_USER: Joi
    .string()
    .required(),
  MONGO_PASS: Joi
    .string(),
  MONGO_AUTH_BASE: Joi
    .string()
    .required(),
  AVATAR_DIR: Joi
    .string()
    .required(),
  JWT_SECRET: Joi
    .string()
    .required()
}

export default getAppEnvSchema(Port.UsersAPIDefault, envSchema)
