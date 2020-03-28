import { HttpException, Injectable } from "@nestjs/common";
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
    const resp = await this.tagRepository.find({ where: { content: tagName } });
    if (resp.length > 0) {
      const errors = "标签已存在";
      throw new HttpException({ errors }, 400);
    } else {
      const tag = new TagEntity();
      tag.content = tagName;
      this.tagRepository.save(tag);
    }
  }

  async deleteTag(tagId: number) {
    const resp = await this.tagRepository.findOne(tagId);
    this.tagRepository.remove(resp);
  }

  async updateTag(tagId: number, tagName: string) {
    return this.tagRepository.update({ id: tagId }, { content: tagName });
  }
}
