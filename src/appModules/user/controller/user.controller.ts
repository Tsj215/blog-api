import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseFilters
} from "@nestjs/common";

// import { BaseControlll } from "../../../shared/base.controller";
import { HttpExceptionFilter } from "../../../shared/filters/http-exception.filter";
import { ProfileEntity } from "../entity/profile.entity";
import { UserService } from "../service/user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch("update")
  update(@Body() profile: Partial<ProfileEntity>) {
    return this.userService.updateProfile(profile);
  }

  @Get("profile/:id")
  async loadProfile(@Param() param): Promise<{ data: ProfileEntity }> {
    const resp = await this.userService.getProfileById(param.id);
    return { data: resp };
  }

  @Get(":id")
  @UseFilters(HttpExceptionFilter)
  async getAll(@Param("id") id) {
    return this.userService.getUser(id);
  }
}
