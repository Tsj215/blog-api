import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { TagEntity } from "../../tags/entity/tag.entity";
import { ImageEntity } from "../entity/imagelist.entity";

@Entity("article")
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  content: string;

  @ManyToMany(
    type => TagEntity,
    tag => tag.articles
  )
  @JoinTable()
  tags: TagEntity[];

  @Column({ type: "datetime" })
  createAt: string;

  @Column({ type: "datetime", default: null })
  updateAt: string;

  @Column({ name: "visit_times", default: 0 })
  visitTimes: number;

  @OneToMany(
    type => ImageEntity,
    image => image.article
  )
  images: ImageEntity[];
}
