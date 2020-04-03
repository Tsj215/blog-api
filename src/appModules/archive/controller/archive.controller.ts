import { Controller, Get } from "@nestjs/common";

import { ArchiveService } from "../service/archive.service";

@Controller("archive")
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @Get("/tags")
  async loadArticleCountByTag() {
    return this.archiveService.getArticleCountWithTag();
  }

  @Get("/createAt")
  async loadCountOfArticleByCreateAt() {
    return this.archiveService.getCountOfArticleByCreateAt();
  }
}
