import * as Joi from 'joi';

const DEFAULT_HOST = 'localhost';
const DEFAULT_MONGO_DB_PORT = 27017;

export default Joi.object({
  MONGO_DB: Joi
    .string()
    .required(),
  MONGO_HOST: Joi
    .string()
    .hostname()
    .default(DEFAULT_HOST)
    .required(),
  MONGO_PORT: Joi
    .number()
    .port()
    .default(DEFAULT_MONGO_DB_PORT)
    .required(),
  MONGO_USER: Joi
    .string()
    .required(),
  MONGO_PASSWORD: Joi
    .string()
    .required(),
  MONGO_AUTH_BASE: Joi
    .string()
    .required(),
  JWT_SECRET: Joi
    .string()
    .required(),
  RABBIT_HOST: Joi
    .string()
    // .hostname()
    .default(DEFAULT_HOST)
    .required(),
  RABBIT_USER: Joi
    .string()
    .required(),
  RABBIT_PASSWORD: Joi
    .string()
    .required(),
  RABBIT_USERS_SERVICE_QUEUE: Joi
    .string()
    .required()
});
