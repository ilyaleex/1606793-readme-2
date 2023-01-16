import { ENVError, EnvValidationConfig, validateEnv } from "@readme/core";
import { IsInt, IsString } from 'class-validator';

class NotifyEnvValidation extends EnvValidationConfig {
  @IsInt({
    message: ENVError.SMTPPort
  })
  public MAILER_PORT: number;

  @IsString({
    message: ENVError.SMTPHost
  })
  public MAILER_HOST: string;

  @IsString({
    message: ENVError.SMTPUser
  })
  public MAILER_USER: string;

  @IsString({
    message: ENVError.SMTPPass
  })
  public MAILER_PASS: string;

  @IsString({
    message: ENVError.MailFrom
  })
  public MAILER_FROM: string;
}

export default validateEnv(NotifyEnvValidation)


