import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule } from "@nestjs/swagger";
import { config } from "./configuration/swagger/swagger.doc";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.setGlobalPrefix("api");
  const configService = app.get(ConfigService);
  const port = configService.get<number>("APP_PORT");
  const swagger = configService.get("SWAGGER_PATH");
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swagger, app, document);

  await app.listen(port);
}
bootstrap();
