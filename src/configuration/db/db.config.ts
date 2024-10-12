import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BlogPost } from "../../blogs/entity/entity.post";

export const getDbConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: "postgres",
  host: configService.get<string>("DATASOURCE_HOST"),
  port: configService.get<number>("DATASOURCE_PORT"),
  username: configService.get<string>("DATASOURCE_USERNAME"),
  password: configService.get<string>("DATASOURCE_PASSWORD"),
  database: configService.get<string>("DATASOURCE_DATABASE"),
  entities: [BlogPost],
  synchronize: true,
});
