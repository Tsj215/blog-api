import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post
} from "@nestjs/common";

import { LoginUserDto } from "../dto";
import { ProfileEntity } from "../entity/profile.entity";
import { QiniuService } from "../service/qiniu.service";
import { UserService } from "../service/user.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly qiniuService: QiniuService
  ) {}

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

    if (!_user) throw new HttpException({ errors }, 500);

    const token = await this.userService.generateJWT(_user);
    const { username, password } = _user;
    const user = { username, password };

    return { user, token };
  }

  @Get("upload")
  async getQiniuToken() {
    return this.qiniuService.uploadToQiniu();
  }

  @Get("download/:key")
  async download(@Param() param) {
    return this.qiniuService.getDownloadUrl(param.key);
  }
}
