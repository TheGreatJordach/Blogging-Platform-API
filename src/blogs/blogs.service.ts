import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Query,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create.post.dto";
import { BlogPost } from "./entity/entity.post";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { UpdatePostDto } from "./dto/update.post.dto";

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>
  ) {}
  private readonly logger = new Logger("BlogsService");
  async create(createPostDto: CreatePostDto) {
    try {
      const newPost: BlogPost = this.blogPostRepository.create(createPostDto);
      return await this.blogPostRepository.save(newPost);
    } catch (error) {
      this.logger.log(`Failed to create post", ${createPostDto.title}`);
      this.logger.log(`Cause of failure : ${error.message}`);
    }
    return "this service create new post";
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const updatedPost: BlogPost = await this.blogPostRepository.preload({
        id,
        ...updatePostDto,
      });
      if (!updatedPost) throw new NotFoundException("Post not found");
      return await this.blogPostRepository.save(updatedPost);
    } catch (error) {
      this.logger.log(`Failed to update post", `);
      this.logger.log(`Cause of failure : ${error.message}`);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number): Promise<void> {
    const find = await this.blogPostRepository.findOne({ where: { id } });
    if (!find) throw new NotFoundException("Post not found");
    try {
      await this.blogPostRepository.delete(id);
    } catch (error) {
      this.logger.log(`Failed to delete post", `);
      this.logger.log(`Cause of failure : ${error.message}`);
      throw new InternalServerErrorException();
    }
  }

  async getAll() {
    try {
      return await this.blogPostRepository.find();
    } catch (error) {
      this.logger.log(`Failed to update post", `);
      this.logger.log(`Cause of failure : ${error.message}`);
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: number) {
    try {
      return await this.blogPostRepository.findOne({ where: { id } });
    } catch (error) {
      this.logger.log(`Failed to update post", `);
      this.logger.log(`Cause of failure : ${error.message}`);
      throw new InternalServerErrorException();
    }
  }

  async findAll(term: string): Promise<BlogPost[]> {
    if (term) {
      return await this.blogPostRepository.find({
        where: [{ title: ILike(`%${term}%`) }, { content: ILike(`%${term}%`) }],
      });
    }
    // If no search term is provided, return all posts
    return this.blogPostRepository.find();
  }
}
