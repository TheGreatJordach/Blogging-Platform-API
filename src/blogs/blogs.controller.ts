import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { CreatePostDto } from "./dto/create.post.dto";
import { BlogsService } from "./blogs.service";
import { Serializer } from "./interceptor/custom.interceptor";

import { ReponsePostDto } from "./dto/reponse.post.dto";
import { IdDto } from "./dto/id.dto";
import { UpdatePostDto } from "./dto/update.post.dto";

@Serializer(ReponsePostDto)
@Controller("posts")
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ description: "Create a new Post", type: CreatePostDto })
  @ApiResponse({ status: 201, description: "Successfully created post" })
  @Post("")
  newPost(@Body() createPostDto: CreatePostDto) {
    return this.blogsService.create(createPostDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: "Successfully updated post" })
  @ApiBody({ description: "Update an existing Post", type: UpdatePostDto })
  @Put(":id")
  async update(@Param() { id }: IdDto, @Body() updatePostDto: UpdatePostDto) {
    return await this.blogsService.update(id, updatePostDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: "No Comment " })
  @Delete(":id")
  async delete(@Param() { id }: IdDto) {
    return await this.blogsService.remove(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: "Retrieve all  " })
  @Get()
  async getAll() {
    return await this.blogsService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: "Retrieve one  " })
  @Get(":id")
  async gerOne(@Param() { id }: IdDto) {
    return await this.blogsService.getOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: "Retrieve one  " })
  @Get(":id")
  async gerAllPost(@Query("term") term: string) {
    return await this.blogsService.findAll(term);
  }
}
