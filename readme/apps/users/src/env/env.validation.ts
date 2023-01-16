import { IsNumber, IsString, Max, Min } from 'class-validator';
import { ENVError, EnvValidationConfig, Port, validateEnv } from '@readme/core';

class UsersEnvValidationConfig extends EnvValidationConfig {
  @IsString({
    message: ENVError.DBName
  })
  public MONGO_DB: string;

  @IsString({
    message: ENVError.DBHost
  })
  public MONGO_HOST: string;

  @IsNumber({}, {
    message: ENVError.DBPort
  })
  @Min(Port.Min)
  @Max(Port.Max)
  public MONGO_PORT: number;

  @IsString({
    message: ENVError.DBUser
  })
  public MONGO_USER: string;

  @IsString({
    message: ENVError.DBPass
  })
  public MONGO_PASS: string;

  @IsString({
    message: ENVError.DBAuthBase
  })
  public MONGO_AUTH_BASE: string;

  @IsString({
    message: ENVError.AvatarDir
  })
  public AVATAR_DIR: string;
}

export default validateEnv(UsersEnvValidationConfig)
