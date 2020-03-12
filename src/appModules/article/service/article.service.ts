import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import dayjs = require("dayjs");
import * as _ from "lodash";
import { Between, Repository } from "typeorm";

import { Article } from "../dto";
import { ArticleEntity } from "../entity/article.entity";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleResponsitory: Repository<ArticleEntity>
  ) {}

  async newArticle(article: Article) {
    const articleDto = new ArticleEntity();
    articleDto.title = article.title;
    articleDto.content = article.content;
    articleDto.tags = JSON.stringify(article.tags);
    articleDto.createAt = dayjs().format("YYYY-MM-DD HH:mm");

    const resp = this.articleResponsitory.save(articleDto);

    return resp;
  }

  // 获取文章列表
  async getArticleList(skip: number, take: number, article?: Article) {
    if (!article) {
      const resp = await this.articleResponsitory.findAndCount({
        take,
        skip: skip * take,
        order: { createAt: "DESC" }
      });

      return {
        list: (resp[0] || []).map(r => ({ ...r, tags: _.words(r.tags) })),
        total: resp[1]
      };
    } else {
      const { title, tags, createAt } = article;
      let filterParam: any = {
        title,
        tags,
        order: { createAt: "DESC" },
        createAt: Between(
          createAt,
          dayjs(createAt)
            .add(1, "day")
            .format("YYYY-MM-DD")
        )
      };

      !title && (filterParam = _.omit(filterParam, "title"));
      !createAt && (filterParam = _.omit(filterParam, "createAt"));
      _.isEmpty(tags) && (filterParam = _.omit(filterParam, "tags"));
      const resp = await this.articleResponsitory.findAndCount({
        take,
        skip: skip * take,
        where: filterParam
      });

      return {
        list: (resp[0] || []).map(r => ({ ...r, tags: _.words(r.tags) })),
        total: resp[1]
      };
    }
  }

  async deleteArticle(id: number) {
    const resp = await this.articleResponsitory.findOne(id);
    resp && this.articleResponsitory.remove(resp);
  }
}
