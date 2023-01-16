import { ENVError, EnvValidationConfig, validateEnv } from '@readme/core';
import { IsString } from 'class-validator';

class BlogEnvValidation extends EnvValidationConfig {
  @IsString({
    message: ENVError.DBUrl
  })
  public DATABASE_URL: string;

  @IsString({
    message: ENVError.UploadDir
  })
  public UPLOAD_DIR: string;
}

export default validateEnv(BlogEnvValidation)
