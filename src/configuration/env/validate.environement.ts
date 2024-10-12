import { plainToInstance } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  validateSync,
} from "class-validator";
import { InternalServerErrorException, Logger } from "@nestjs/common";

export class ValidateEnvironment {
  @IsNotEmpty()
  @IsString()
  DATASOURCE_USERNAME: string;
  @IsNotEmpty()
  @IsString()
  DATASOURCE_PASSWORD: string;
  @IsNotEmpty()
  @IsString()
  DATASOURCE_DATABASE: string;
  @IsNotEmpty()
  @IsString()
  DATASOURCE_HOST: string;
  @IsPositive()
  @IsInt()
  DATASOURCE_PORT: number;
  @IsPositive()
  @IsInt()
  APP_PORT: number;
  @IsNotEmpty()
  @IsString()
  SWAGGER_PATH: string;
}
export function ValidatedEnv(options: Record<string, unknown>) {
  const logger = new Logger("ValidatedEnv");
  const validated = plainToInstance(ValidateEnvironment, options, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validated, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    logger.log(`${errors.length} Env Failed the validation.`);
    logger.log(errors.join("\n"));
    throw new InternalServerErrorException();
  }
  logger.log("All Env have been validated successfully.");
  return validated;
}
