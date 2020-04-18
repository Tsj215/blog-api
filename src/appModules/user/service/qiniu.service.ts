import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import * as qiniu from "qiniu";

import nliConfig from "./nli.config.js";

@Injectable()
export class QiniuService {
  constructor() {}

  // 获取上传 token
  async uploadToQiniu() {
    // 定义鉴权对象 mac
    const { bucket, accessKey, secretKey } = nliConfig;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    // 上传凭证 uploadToken
    const options = { scope: bucket };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);

    return uploadToken;
  }

  // 获取私有文件链接
  async getDownloadUrl(key: string) {
    const { accessKey, secretKey } = nliConfig;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();

    const bucketManager = new qiniu.rs.BucketManager(mac, config);
    const privateBucketDomain = "http://tsj.zhoutao123.com";

    // const deadline = parseInt((Date.now() / 1000) as any) + 3600 * 12; // 12小时过期

    const privateDownloadUrl = bucketManager.publicDownloadUrl(
      privateBucketDomain,
      key
    );

    return privateDownloadUrl;
  }

  async deleteFileByKeys(key: string) {
    const { bucket, accessKey, secretKey } = nliConfig;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();

    const bucketManager = new qiniu.rs.BucketManager(mac, config);

    await bucketManager.delete(bucket, key, (err, _, respInfo) => {
      if (err) {
        throw err;
      }
      return respInfo;
    });
  }

  // 获取指定前缀文件列表并连接 profile
  async getFileListByPrefix(prefix: string) {
    const { bucket, accessKey, secretKey } = nliConfig;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();

    const options = { limit: 100, prefix: prefix };

    const bucketManager = new qiniu.rs.BucketManager(mac, config);

    const callback = async (err, resBody, respInfo) => {
      if (err) {
        throw err;
      }
      if (respInfo.statusCode == "200") {
        const keys = resBody.items.map((i) => i.key);
      }
    };

    bucketManager.listPrefix(bucket, options, callback);
  }
}
