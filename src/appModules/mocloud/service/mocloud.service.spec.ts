import { Test, TestingModule } from "@nestjs/testing";

import { MocloudService } from "./mocloud.service";

describe("MocloudService", () => {
  let service: MocloudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MocloudService]
    }).compile();

    service = module.get<MocloudService>(MocloudService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
