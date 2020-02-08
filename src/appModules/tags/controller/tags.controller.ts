import { Controller, Get } from "@nestjs/common";

import { TagEntity } from "../entity/tag.entity";
import { TagsService } from "../service/tags.service";

@Controller("tags")
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get()
  async laodTagList() {
    const resp = await this.tagService.getTagList();
    return resp.map(t => t.content);
  }
}
