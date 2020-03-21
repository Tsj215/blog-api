import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ArticleEntity } from "../entity/article.entity";

@Entity("article_image")
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(
    type => ArticleEntity,
    article => article.images,
    { onDelete: "CASCADE" }
  )
  article: ArticleEntity;
}
