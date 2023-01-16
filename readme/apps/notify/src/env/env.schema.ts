import { getAppEnvSchema, Port } from "@readme/core";
import * as Joi from 'joi';

const envSchema = {
  MAILER_PORT: Joi
    .number()
    .port()
    .default(Port.MailDefault)
    .required(),
  MAILER_HOST: Joi
    .string()
    .hostname()
    .required(),
  MAILER_USER: Joi
    .string()
    .required(),
  MAILER_PASS: Joi
    .string()
    .required(),
  MAILER_FROM: Joi
    .string()
    .required()
}

export default getAppEnvSchema(Port.NotifyAPIDefault, envSchema)
