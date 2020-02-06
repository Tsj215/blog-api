import { Controller, Get } from "@nestjs/common";

import { MoCloudMsgEntity } from "../entity/message.entity";
import { MocloudService } from "../service/mocloud.service";

@Controller("mocloud")
export class MocloudController {
  constructor(private readonly moCloudService: MocloudService) {}

  @Get("message")
  async loadProfile() {
    return this.moCloudService.getMessage();
  }
}
