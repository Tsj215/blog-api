import { Controller, Get, Param } from "@nestjs/common";

import { ProfileEntity } from "../entity/profile.entity";
import { UserService } from "../service/user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("id")
  test() {
    return "test";
  }

  @Get("profile/:id")
  async loadProfile(@Param() param): Promise<ProfileEntity> {
    return this.userService.getProfileById(param.id);
  }
}
