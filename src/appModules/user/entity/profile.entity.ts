import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { PhotoGalleryEntity } from "../entity/photoGallery.entity";

@Entity("profile_entity")
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

  @OneToMany(
    (type) => PhotoGalleryEntity,
    (photos) => photos.profile
  )
  photos: PhotoGalleryEntity[];
}
