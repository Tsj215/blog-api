import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import dayjs = require("dayjs");
import * as _ from "lodash";
import { Between, Like, Repository, getRepository } from "typeorm";

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

  /** 新建文章 */
  async newArticle(article: Article, imageList?: Image[]) {
    const articleDto = new ArticleEntity();
    articleDto.tags = article.tags;
    articleDto.title = article.title;
    articleDto.content = article.content;
    articleDto.createAt = dayjs().format("YYYY-MM-DD HH:mm");

    const resp = await this.articleResponsitory.save(articleDto);

    if (!_.isEmpty(imageList)) {
      const _imgList = imageList.map(i => {
        const imageDto = new ImageEntity();
        imageDto.name = i.name;
        imageDto.url = i.url;
        imageDto.article = articleDto;
        return imageDto;
      });

      await this.imageResponsitory.save(_imgList);
    }

    return resp;
  }

  /** 文章图片操作 */
  async addImageForArticle(articleId: number, imageList?: Image[]) {
    const article = await this.articleResponsitory.findOne({
      where: { id: articleId },
      relations: ["images", "tags"]
    });

    // 文章 images 不为空， 删除全部

    if (!_.isEmpty(imageList)) {
      await this.imageResponsitory.delete(article.images.map(i => i.id));

      const _imagList = (imageList || []).map(r => {
        const imageDto = new ImageEntity();
        imageDto.name = r.name;
        imageDto.url = r.url;
        imageDto.article = article;

        return imageDto;
      });

      this.imageResponsitory.save(_imagList);
    } else if (_.isEmpty(imageList)) {
      await this.imageResponsitory.delete(article.images.map(i => i.id));
    }
  }

  /** 获取文章列表 */
  async getArticleList(skip: number, take: number, article?: Article) {
    let filterParam: any = {
      title: _.get(article, "title"),
      createAt: Between(_.get(article, "from"), _.get(article, "to"))
    };

    !_.get(article, "title") && (filterParam = _.omit(filterParam, "title"));
    !_.get(article, "from") && (filterParam = _.omit(filterParam, "createAt"));

    const resp = await this.articleResponsitory.find({
      take,
      skip: skip * take,
      where: filterParam,
      relations: ["images", "tags"],
      order:
        article.orderBy === "createAt"
          ? { createAt: "DESC" }
          : { visitTimes: "DESC" }
    });

    // 对 tag 进行筛选
    if (!_.isUndefined(article) && !_.isEmpty(article.tags)) {
      const ids = article.tags.map(t => t.id);

      const finalResp = resp.filter(a => {
        const _ids = a.tags.map(t => t.id);
        return !_.isEmpty(_.intersection(ids, _ids));
      });

      return { list: finalResp, total: finalResp.length };
    }

    return {
      list: resp,
      total: resp.length
    };
  }

  /** 根据标签获取文章 */
  async getArticleByTags(skip: number, take: number, tags: string[]) {
    let resp;

    if (_.isEmpty(tags)) {
      resp = await this.articleResponsitory.findAndCount({
        take,
        skip: take * skip,
        relations: ["images", "tags"],
        order: { createAt: "DESC" }
      });
    } else {
      resp = await this.articleResponsitory.findAndCount({
        take,
        skip: skip * take,
        relations: ["images", "tags"],
        where: tags.map(t => ({ tags: Like(`%${t}%`) }))
      });
    }

    return {
      total: resp[1],
      list: resp[0].map(r => ({ ...r, tags: _.split(r.tags, ",") }))
    };
  }

  /** 根据 id 获取文章 */
  async getArticleById(id: number) {
    const resp = await this.articleResponsitory.findOne({
      where: { id },
      relations: ["images", "tags"]
    });

    // 更新点击量
    const article = new ArticleEntity();
    article.visitTimes = resp.visitTimes + 1;

    await this.articleResponsitory.update(id, article);

    return resp;
  }

  /** 添加图片 */
  async saveImage(articleId: number, image: Image) {
    const article = await this.articleResponsitory.findOne(articleId);

    const imageDto = new ImageEntity();
    imageDto.name = image.name;
    imageDto.url = image.url;
    imageDto.article = article;

    return await this.imageResponsitory.save(imageDto);
  }

  /** 删除图片 */
  async deleteImage(imageId: number) {
    const resp = await this.imageResponsitory.findOne(imageId);

    return await this.imageResponsitory.delete(resp);
  }

  /** 更新文章 */
  async updateArticleById(id: number, article: Article) {
    const _article = await this.articleResponsitory.findOne(id, {
      relations: ["images", "tags"]
    });

    _article.title = article.title;
    _article.content = article.content;
    _article.tags = article.tags;
    _article.images = article.imageList;
    _article.updateAt = dayjs().format("YYYY-MM-DD HH:mm");

    await this.articleResponsitory.save(_article);
  }

  /** 删除文章 */
  async deleteArticle(id: number) {
    const resp = await this.articleResponsitory.findOne(id);
    resp && this.articleResponsitory.remove(resp);
  }
}
