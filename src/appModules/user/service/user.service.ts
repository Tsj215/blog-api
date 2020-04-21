import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as jwt from "jsonwebtoken";
import * as _ from "lodash";
import { Repository } from "typeorm";

import { LoginUserDto, ProfileDto } from "../dto";
import { PhotoGalleryEntity } from "../entity/photoGallery.entity";
import { ProfileEntity } from "../entity/profile.entity";
import { UserEntity } from "../entity/user.entity";

import { QiniuService } from "./qiniu.service";

@Injectable()
export class UserService {
  constructor(
    protected readonly qiniuService: QiniuService,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PhotoGalleryEntity)
    private readonly photoResponsitory: Repository<PhotoGalleryEntity>
  ) {}

  async getProfileById(id: number) {
    const resp = await this.profileRepository.findOne({
      where: { id },
      relations: ["photos"],
    });

    return { ...resp, photos: _.reverse(resp.photos) };
  }

  async updateProfile(profile: Partial<ProfileDto>) {
    const resp = await this.profileRepository.update({ id: 1 }, profile);
    return resp;
  }

  async findOne(loginUserDto: LoginUserDto) {
    const resp = await this.userRepository.findOne(loginUserDto);

    return resp;
  }

  async addPhoto(name: string, url: string, width: number, heigth: number) {
    const profile = await this.profileRepository.findOne({ id: 1 });

    const photoDto = new PhotoGalleryEntity();
    photoDto.url = url;
    photoDto.name = name;
    photoDto.width = width;
    photoDto.height = heigth;
    photoDto.profile = profile;

    this.photoResponsitory.save(photoDto);
  }

  async deletePhoto(ids: number[]) {
    return await this.photoResponsitory.delete(ids);
  }

  public generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);

    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        password: user.password,
        exp: exp.getTime() / 1000,
      },
      "SECRET"
    );
  }
}
