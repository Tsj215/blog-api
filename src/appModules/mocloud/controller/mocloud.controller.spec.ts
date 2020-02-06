import { Test, TestingModule } from "@nestjs/testing";

import { MocloudController } from "./mocloud.controller";

describe("Mocloud Controller", () => {
  let controller: MocloudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MocloudController]
    }).compile();

    controller = module.get<MocloudController>(MocloudController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
