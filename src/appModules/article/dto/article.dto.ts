import { IsNotEmpty } from "class-validator";

export class Article {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly tags: string[];

  readonly imageList: string[];

  readonly createAt: string;
}
