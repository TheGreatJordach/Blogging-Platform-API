import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ValidatedEnv } from "./env/validate.environement";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validate: ValidatedEnv,
    }),
  ],
})
export class ConfigurationModule {}
