import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import dayjs = require("dayjs");
import * as _ from "lodash";
import { Between, Like, Raw, Repository } from "typeorm";

import { Article, Image } from "../dto";
import { ArticleEntity } from "../entity/article.entity";
import { ImageEntity } from "../entity/imagelist.entity";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleResponsitory: Repository<ArticleEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageResponsitory: Repository<ImageEntity>
  ) {}

  async newArticle(article: Article, imageList?: Image[]) {
    const _imgList = imageList.map(i => {
      const imageDto = new ImageEntity();
      imageDto.name = i.name;
      imageDto.url = i.url;

      return imageDto;
    });

    await this.imageResponsitory.save(_imgList);

    const articleDto = new ArticleEntity();
    articleDto.title = article.title;
    articleDto.content = article.content;
    articleDto.tags = _.toString(article.tags);
    articleDto.createAt = dayjs().format("YYYY-MM-DD HH:mm");
    articleDto.images = _imgList;

    const resp = await this.articleResponsitory.save(articleDto);

    return resp;
  }

  // 获取文章列表
  async getArticleList(skip: number, take: number, article?: Article) {
    let filterParam: any = {
      title: _.get(article, "title"),
      tags: Like(`%${_.get(article, "tags")}%`),
      createAt: Between(_.get(article, "from"), _.get(article, "to"))
    };

    !_.get(article, "title") && (filterParam = _.omit(filterParam, "title"));
    !_.get(article, "from") && (filterParam = _.omit(filterParam, "createAt"));
    _.isEmpty(_.get(article, "tags")) &&
      (filterParam = _.omit(filterParam, "tags"));

    const resp = await this.articleResponsitory.findAndCount({
      take,
      skip: skip * take,
      where: filterParam,
      order: { createAt: "DESC" }
    });

    return {
      total: resp[1],
      list: (resp[0] || []).map(r => ({ ...r, tags: _.split(r.tags, ",") }))
    };
  }

  async getArticleByTags(skip: number, take: number, tags: string[]) {
    let resp;

    if (_.isEmpty(tags)) {
      resp = await this.articleResponsitory.findAndCount({
        take,
        skip: take * skip,
        relations: ["images"],
        order: { createAt: "DESC" }
      });
    } else {
      resp = await this.articleResponsitory.findAndCount({
        take,
        skip: skip * take,
        relations: ["images"],
        where: tags.map(t => ({ tags: Like(`%${t}%`) }))
      });
    }

    return {
      total: resp[1],
      list: resp[0].map(r => ({ ...r, tags: _.split(r.tags, ",") }))
    };
  }

  async getArticleById(id: number) {
    const resp = await this.articleResponsitory.findOne({
      where: { id },
      relations: ["images"]
    });

    return { ...resp, tags: _.split(resp.tags, ",") };
  }

  async updateArticleById(
    id: number,
    _article: Article,
    images?: ImageEntity[]
  ) {
    if (!_.isEmpty(images)) {
      const imageList = images.map(i => {
        const imageDto = new ImageEntity();
        imageDto.name = i.name;
        imageDto.url = i.url;

        return imageDto;
      });
      await this.imageResponsitory.save(imageList);
    }

    const article = new ArticleEntity();
    article.title = _article.title;
    article.content = _article.content;
    article.tags = _.toString(_article.tags);
    article.createAt = dayjs().format("YYYY-MM-DD HH:mm");
    !_.isEmpty(images) && (article.images = images);
    this.articleResponsitory.update({ id }, article);
  }

  async deleteArticle(id: number) {
    const resp = await this.articleResponsitory.findOne(id);
    resp && this.articleResponsitory.remove(resp);
  }
}
