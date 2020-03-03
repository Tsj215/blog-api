import { Injectable } from "@nestjs/common";
import * as qiniu from "qiniu";

@Injectable()
export class QiniuService {
  constructor() {}

  // 获取上传 token
  async uploadToQiniu() {
    // 定义鉴权对象 mac
    const accessKey = "hl5yE-ZO45RrsXBdlAUjVbbug3GdrBP1XPPv35bW";
    const secretKey = "UlDLHMCfG4CR1l5MYddxt2VqbIcC6OGmgoH7LNJu";
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    // 上传凭证 uploadToken
    const options = {
      scope: "nli-blog"
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);

    return uploadToken;
  }

  // 获取私有文件链接
  async getDownloadUrl(key: string) {
    const accessKey = "hl5yE-ZO45RrsXBdlAUjVbbug3GdrBP1XPPv35bW";
    const secretKey = "UlDLHMCfG4CR1l5MYddxt2VqbIcC6OGmgoH7LNJu";
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();

    const bucketManager = new qiniu.rs.BucketManager(mac, config);
    const privateBucketDomain = "http://q659hkkiu.bkt.clouddn.com";

    // const deadline = parseInt((Date.now() / 1000) as any) + 3600 * 12; // 12小时过期

    const privateDownloadUrl = bucketManager.publicDownloadUrl(
      privateBucketDomain,
      key
    );

    return privateDownloadUrl;
  }
}
