import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class BasePostDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  readonly content: string;
  @IsNotEmpty()
  @IsString()
  readonly category: string;
  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];
}
