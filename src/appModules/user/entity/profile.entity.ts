import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  university: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  github: string;

  @Column()
  signature: string;

  @Column()
  avatarUrl: string;
}
