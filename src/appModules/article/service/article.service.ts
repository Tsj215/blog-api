import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import dayjs from "dayjs";
import * as _ from "lodash";
import { Repository } from "typeorm";

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
}
