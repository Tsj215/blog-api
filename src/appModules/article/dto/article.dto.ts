import { IsNotEmpty } from "class-validator";

import { TagEntity } from "../../tags/entity/tag.entity";

export class Article {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly tags: TagEntity[];

  readonly imageList: string;

  readonly from: string;
}
