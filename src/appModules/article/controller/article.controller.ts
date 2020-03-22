import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";

import { Article, Image } from "../dto";
import { ArticleService } from "../service/article.service";

@Controller("article")
export class ControllerController {
  constructor(private readonly articleService: ArticleService) {}

  @Post("new")
  async newArticle(
    @Body("article") article: Article,
    @Body("imageList") imageList: Image[]
  ) {
    return this.articleService.newArticle(article, imageList);
  }

  @Get(":id")
  async loadArticleById(@Param() param) {
    return this.articleService.getArticleById(param.id);
  }

  @Post("list/tags")
  async loadArticleByTags(@Body() { pageNum, pageSize, tags }) {
    return this.articleService.getArticleByTags(pageNum, pageSize, tags);
  }

  @Post("list")
  async loadArticleList(@Body() { pageNum, pageSize, article }) {
    return this.articleService.getArticleList(pageNum, pageSize, article);
  }

  @Delete("delete/:id")
  async deleteArticleByid(@Param() id: number) {
    return this.articleService.deleteArticle(id);
  }

  @Patch("update/:id")
  async updateArticle(@Param("id") id, @Body() article) {
    return this.articleService.updateArticleById(id, article);
  }

  @Post("imageList/:articleId")
  async updateArticleImageList(
    @Param("articleId") articleId,
    @Body("imageList") imageList
  ) {
    this.articleService.addImageForArticle(articleId, imageList);
  }
}
