import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ type: "text" })
  imageList: string;

  @Column({ type: "datetime" })
  createAt: string;
}
