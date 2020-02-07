import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { MoCloudMsgEntity } from "../entity/message.entity";
import { MocloudService } from "../service/mocloud.service";

@Controller("mocloud")
export class MocloudController {
  constructor(private readonly moCloudService: MocloudService) {}

  @Get("message")
  async loadProfile() {
    return this.moCloudService.getMessage();
  }

  @Post("newMsg")
  async newMessage(@Body() message: Partial<MoCloudMsgEntity>) {
    return this.moCloudService.addMessage(message);
  }

  @Delete("delete/:id")
  async deleteMessage(@Param() id: string) {
    return this.moCloudService.deleteMessage(id);
  }
}
