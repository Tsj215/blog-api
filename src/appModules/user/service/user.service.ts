import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ProfileEntity } from "../entity/profile.entity";
import { UserEntity } from "../entity/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getProfileById(id: number) {
    return this.profileRepository.findOne({ where: { id } });
  }

  async createUser() {
    const profile = await this.profileRepository.findOne(1);
    const user = new UserEntity();
    (user.name = "tsj"), (user.age = 23);
    user.profile = profile;
    return this.userRepository.save(user);
  }

  async updateProfile(profile: Partial<ProfileEntity>) {
    const resp = await this.profileRepository.update({ id: 1 }, profile);
    console.log(resp);
    return resp;
  }

  async getUser(id: number) {
    // const user = await this.userRepository
    //   .createQueryBuilder("user")
    //   .where("user.id = :id", { id: 3 })
    //   .getOne();
    return this.userRepository.findOne({ id });
  }
}
