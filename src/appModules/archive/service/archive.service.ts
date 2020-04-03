import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getRepository } from "typeorm";

import { ArticleEntity } from "../../article/entity/article.entity";
import { TagEntity } from "../../tags/entity/tag.entity";

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}

  // 获取每个标签对应文章 id
  async getArticleCountWithTag() {
    return await this.tagRepository.find({ relations: ["articles"] });
  }

  /** 文章归档 */
  async getCountOfArticleByCreateAt() {
    const resp = await getRepository(ArticleEntity)
      .createQueryBuilder("article")
      .select([
        `DATE_FORMAT(article.createAt,'%Y-%m') as 'date'`,
        `count(1) as 'count'`
      ])
      .orderBy("date", "ASC")
      .groupBy("date")
      .getRawMany();

    return resp;
  }
}
