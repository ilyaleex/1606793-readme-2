import { registerAs } from "@nestjs/config";
import { EnvRegisterAs } from "@readme/core";

export default registerAs(EnvRegisterAs.Blog, () => ({
  APIPort: process.env.API_PORT,
  DBUrl: process.env.DATABASE_URL,
  UploadDir: process.env.API_PORT,
}));
