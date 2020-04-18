import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ProfileEntity } from "../entity/profile.entity";

@Entity("photo_gallery")
export class PhotoGalleryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @ManyToOne(
    (type) => ProfileEntity,
    (profile) => profile.photos
  )
  profile: ProfileEntity;
}
