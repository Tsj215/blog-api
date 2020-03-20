import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ImageEntity } from "../entity/imagelist.entity";

@Entity("article")
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column()
  tags: string;

  @Column({ type: "datetime" })
  createAt: string;

  @OneToMany(
    type => ImageEntity,
    image => image.article
  )
  images: ImageEntity[];
}
