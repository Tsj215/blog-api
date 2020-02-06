import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { MoCloudMsgEntity } from "../entity/message.entity";

@Injectable()
export class MocloudService {
  constructor(
    @InjectRepository(MoCloudMsgEntity)
    private readonly moCloudMsgRepository: Repository<MoCloudMsgEntity>
  ) {}

  async getMessage() {
    return this.moCloudMsgRepository.find();
  }
}
