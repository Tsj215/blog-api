import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleModule } from "../appModules/article/article.module";
import { TagsModule } from "../appModules/tags/tags.module";
import { UserModule } from "../appModules/user/user.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, ArticleModule, TagsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
