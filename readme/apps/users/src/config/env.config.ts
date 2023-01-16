import { registerAs } from "@nestjs/config";
import { EnvRegisterAs } from "@readme/core";

export default registerAs(EnvRegisterAs.Users, () => ({
  apiPort: parseInt(process.env.API_PORT, 10),
  database: process.env.MONGO_DB,
  host: process.env.MONGO_HOST,
  port: parseInt(process.env.MONGO_PORT, 10),
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  authBase: process.env.MONGO_AUTH_BASE,
  avatarDir: process.env.AVATAR_DIR,
  jwtSecret: process.env.JWT_SECRET
}));
