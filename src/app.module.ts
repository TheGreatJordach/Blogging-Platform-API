import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigurationModule } from "./configuration/configuration.module";
import { BlogsModule } from "./blogs/blogs.module";

@Module({
  imports: [ConfigurationModule, BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
