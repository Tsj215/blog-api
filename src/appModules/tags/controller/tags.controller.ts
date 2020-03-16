import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";

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

  @Post()
  async newTag(@Body("tagName") tagName: string) {
    return this.tagService.addTag(tagName);
  }

  @Patch("/:tagName/:_tagName")
  async updateTag(
    @Param("tagName") tagName: string,
    @Param("_tagName") _tagName: string
  ) {
    return this.tagService.updateTag(tagName, _tagName);
  }

  @Delete("/:tagName")
  async deleteTag(@Param() param) {
    return this.tagService.deleteTag(param.tagName);
  }
}
