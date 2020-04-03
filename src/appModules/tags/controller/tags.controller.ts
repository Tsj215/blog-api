import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";

import { TagsService } from "../service/tags.service";

@Controller("tags")
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get()
  async laodTagList() {
    const resp = await this.tagService.getTagList();
    return resp;
  }

  @Post()
  async newTag(@Body("tagName") tagName: string) {
    return this.tagService.addTag(tagName);
  }

  @Patch("/:tagId/:tagName")
  async updateTag(
    @Param("tagId") tagId: number,
    @Param("tagName") tagName: string
  ) {
    return this.tagService.updateTag(tagId, tagName);
  }

  @Delete("/:tagId")
  async deleteTag(@Param("tagId") tagId: number) {
    return this.tagService.deleteTag(tagId);
  }
}
