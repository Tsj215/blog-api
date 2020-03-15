import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";

import { Article } from "../dto";
import { ArticleService } from "../service/article.service";

@Controller("article")
export class ControllerController {
  constructor(private readonly articleService: ArticleService) {}

  @Post("new")
  async newArticle(@Body() article: Article) {
    return this.articleService.newArticle(article);
  }

  @Get(":id")
  async loadArticleById(@Param() param) {
    return this.articleService.getArticleById(param.id);
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
  async updateArticle(@Param() param, @Body() article) {
    return this.articleService.updateArticleById(param.id, article);
  }
}
