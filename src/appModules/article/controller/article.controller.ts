import { Body, Controller, Get, Post } from "@nestjs/common";

import { Article } from "../dto";
import { ArticleService } from "../service/article.service";

@Controller("article")
export class ControllerController {
  constructor(private readonly articleService: ArticleService) {}

  @Post("new")
  async newArticle(@Body() article: Article) {
    return this.articleService.newArticle(article);
  }
}
