import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post
} from "@nestjs/common";

import { HttpExceptionFilter } from "../../../shared/filters/http-exception.filter";
import { LoginUserDto } from "../dto";
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
  async loadProfile(@Param() param): Promise<ProfileEntity> {
    return this.userService.getProfileById(param.id);
  }

  @Post("login")
  async loginByUsername(@Body() loginUserDto: LoginUserDto) {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = "User not found";

    if (!_user) throw new HttpException({ errors }, 401);

    const token = await this.userService.generateJWT(_user);
    const { username, password } = _user;
    const user = { username, password };

    return { user, token };
  }
}
