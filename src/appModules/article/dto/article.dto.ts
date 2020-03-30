import { IsNotEmpty } from "class-validator";

import { TagEntity } from "../../tags/entity/tag.entity";
import { ImageEntity } from "../entity/imagelist.entity";

export class Article {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly tags: TagEntity[];

  readonly imageList: ImageEntity[];

  readonly from: string;

  readonly orderBy: "visiTime" | "createAt";
}
