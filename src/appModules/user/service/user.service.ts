import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";

import { LoginUserDto } from "../dto";
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

  async updateProfile(profile: Partial<ProfileEntity>) {
    const resp = await this.profileRepository.update({ id: 1 }, profile);
    return resp;
  }

  async findOne(loginUserDto: LoginUserDto) {
    const resp = await this.userRepository.findOne(loginUserDto);

    return resp;
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
        exp: exp.getTime() / 1000
      },
      "SECRET"
    );
  }
}
