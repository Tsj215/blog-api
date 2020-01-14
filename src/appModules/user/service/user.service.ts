import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ProfileEntity } from "../entity/profile.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>
  ) {}

  async getProfileById(id: number): Promise<ProfileEntity> {
    return this.profileRepository.findOne(id);
  }
}
