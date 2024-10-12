import { Module } from "@nestjs/common";
import { ConfigurationModule } from "./configuration/configuration.module";
import { BlogsModule } from "./blogs/blogs.module";

@Module({
  imports: [ConfigurationModule, BlogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
