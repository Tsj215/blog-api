import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;
}
