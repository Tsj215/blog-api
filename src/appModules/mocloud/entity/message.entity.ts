import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MoCloudMsgEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column("datetime")
  createAt: string;
}
