import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArchiveModule } from "../appModules/archive/archive.module";
import { ArticleModule } from "../appModules/article/article.module";
import { MocloudModule } from "../appModules/mocloud/mocloud.module";
import { TagsModule } from "../appModules/tags/tags.module";
import { UserModule } from "../appModules/user/user.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    TagsModule,
    MocloudModule,
    ArticleModule,
    ArchiveModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
