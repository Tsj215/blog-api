import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TagEntity } from "../entity/tag.entity";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>
  ) {}

  async getTagList() {
    return this.tagRepository.find();
  }

  async addTag(tagName: string) {
    const tag = new TagEntity();
    tag.content = tagName;
    this.tagRepository.save(tag);
  }
}
