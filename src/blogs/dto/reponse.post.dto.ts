import { Expose } from "class-transformer";

export class ReponsePostDto {
  @Expose()
  id: number;
  @Expose()
  readonly title: string;
  @Expose()
  readonly content: string;
  @Expose()
  readonly category: string;
  @Expose()
  readonly tags: string[];
  @Expose()
  createAt: Date;
  @Expose()
  updateAt: Date;
}
