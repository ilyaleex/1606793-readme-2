import { IsInt } from "class-validator";
import { ENVError } from "../enum/env.enum";

export class EnvValidationConfig {
  @IsInt({
    message: ENVError.APIPort
  })
  public API_PORT: number;
}
