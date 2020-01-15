import { Controller, Get, Param } from "@nestjs/common";

import { ProfileEntity } from "../entity/profile.entity";
import { UserService } from "../service/user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("tsj")
  test() {
    return this.userService.createUser();
  }

  @Get("get3")
  get3() {
    return this.userService.getUser();
  }

  @Get("profile/:id")
  async loadProfile(@Param() param): Promise<{ data: ProfileEntity }> {
    const resp = await this.userService.getProfileById(param.id);
    return { data: resp };
  }
}
