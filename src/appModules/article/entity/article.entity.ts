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

  @Column({ name: "visit_times", default: 0 })
  visitTimes: number;

  @OneToMany(
    type => ImageEntity,
    image => image.article
  )
  images: ImageEntity[];
}
