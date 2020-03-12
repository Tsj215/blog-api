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
    const { title, tags, from, to } = article;
    let resp = [];
    !title &&
      from &&
      to &&
      !_.isEmpty(tags) &&
      (resp = await this.articleResponsitory
        .createQueryBuilder("article")
        .where("find_in_set(:arr, tags)", { arr: tags })
        .where("article.createAt  between :from and :to", { from, to })
        .orderBy("article.createAt", "DESC")
        .skip(skip * take)
        .take(take)
        .getManyAndCount());

    _.isEmpty(tags) &&
      title &&
      from &&
      to &&
      (resp = await this.articleResponsitory
        .createQueryBuilder("article")
        .where({ title })
        .where("article.createAt  between :from and :to", { from, to })
        .orderBy("article.createAt", "DESC")
        .skip(skip * take)
        .take(take)
        .getManyAndCount());

    !(from && to) &&
      title &&
      !_.isEmpty(tags) &&
      (resp = await this.articleResponsitory
        .createQueryBuilder("article")
        .where({ title })
        .where("find_in_set(:arr, tags)", { arr: tags })
        .orderBy("article.createAt", "DESC")
        .skip(skip * take)
        .take(take)
        .getManyAndCount());

    _.isEmpty(tags) &&
      !title &&
      from &&
      to &&
      (resp = await this.articleResponsitory
        .createQueryBuilder("article")
        .where("article.createAt  between :from and :to", { from, to })
        .orderBy("article.createAt", "DESC")
        .skip(skip * take)
        .take(take)
        .getManyAndCount());

    !(title && from && to) &&
      !_.isEmpty(tags) &&
      (resp = await this.articleResponsitory
        .createQueryBuilder("article")
        .where("find_in_set(:arr, tags)", { arr: tags })
        .orderBy("article.createAt", "DESC")
        .skip(skip * take)
        .take(take)
        .getManyAndCount());

    !from &&
      !to &&
      _.isEmpty(tags) &&
      title &&
      (resp = await this.articleResponsitory
        .createQueryBuilder("article")
        .where({ title })
        .orderBy("article.createAt", "DESC")
        .skip(skip * take)
        .take(take)
        .getManyAndCount());

    !title &&
      !from &&
      !to &&
      _.isEmpty(tags) &&
      (resp = await this.articleResponsitory
        .createQueryBuilder("article")
        .orderBy("article.createAt", "DESC")
        .skip(skip * take)
        .take(take)
        .getManyAndCount());

    title &&
      from &&
      to &&
      _.isEmpty(tags) &&
      (resp = await this.articleResponsitory
        .createQueryBuilder("article")
        .where({ title })
        .where("find_in_set(:arr, tags)", { arr: tags })
        .where("article.createAt  between :from and :to", { from, to })
        .orderBy("article.createAt", "DESC")
        .skip(skip * take)
        .take(take)
        .getManyAndCount());

    return {
      list: (resp[0] || []).map(r => ({ ...r, tags: _.words(r.tags) })),
      total: resp[1]
    };
  }

  async deleteArticle(id: number) {
    const resp = await this.articleResponsitory.findOne(id);
    resp && this.articleResponsitory.remove(resp);
  }
}
