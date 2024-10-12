import { Module } from "@nestjs/common";
import { BlogsService } from "./blogs.service";
import { BlogsController } from "./blogs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogPost } from "./entity/entity.post";

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  providers: [BlogsService],
  controllers: [BlogsController],
})
export class BlogsModule {}
