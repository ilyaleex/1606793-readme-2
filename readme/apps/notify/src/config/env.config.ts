import { registerAs } from "@nestjs/config";
import { EnvRegisterAs } from "@readme/core";

export default registerAs(EnvRegisterAs.Notify, () => ({
  APIPort: process.env.API_PORT,
  port: process.env.MAILER_PORT,
  host: process.env.MAILER_HOST,
  user: process.env.MAILER_USER,
  pass: process.env.MAILER_PASS,
  from: process.env.MAILER_FROM,
}));
