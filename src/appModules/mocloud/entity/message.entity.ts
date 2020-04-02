import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("mo_cloud_msg_entity")
export class MoCloudMsgEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column("datetime")
  createAt: string;
}
