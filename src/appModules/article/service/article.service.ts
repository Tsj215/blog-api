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
    articleDto.tags = _.toString(article.tags);
    articleDto.createAt = dayjs().format("YYYY-MM-DD HH:mm");

    const resp = this.articleResponsitory.save(articleDto);

    return resp;
  }

  async getArticleList(skip: number, take: number, article?: Article) {
    if (!article) {
      const resp = await this.articleResponsitory.find({ skip, take });
      return (resp || []).map(r => ({ ...r, tags: _.words(r.tags) }));
    } else {
      const { title, tags, createAt } = article;
      let filterParam: any = {
        title,
        tags,
        createAt: Between(
          createAt,
          dayjs(createAt)
            .add(1, "day")
            .format("YYYY-MM-DD")
        )
      };

      !title && (filterParam = _.omit(filterParam, "title"));
      !tags && (filterParam = _.omit(filterParam, "tags"));
      !createAt && (filterParam = _.omit(filterParam, "createAt"));
      const resp = await this.articleResponsitory.find({
        where: filterParam,
        skip,
        take
      });

      return (resp || []).map(r => ({ ...r, tags: _.words(r.tags) }));
    }
  }
}
