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

  async addMessage(message: Partial<MoCloudMsgEntity>) {
    const moCloudMsg = new MoCloudMsgEntity();
    moCloudMsg.message = message.message;
    moCloudMsg.createAt = message.createAt;
    this.moCloudMsgRepository.save(moCloudMsg);
  }

  async deleteMessage(id: string) {
    const resp = await this.moCloudMsgRepository.findOne(id);
    resp && this.moCloudMsgRepository.remove(resp);
  }
}
