import { Test, TestingModule } from '@nestjs/testing';
import { ChartKindController } from './chart-kind.controller';

describe('ChartKindController', () => {
  let controller: ChartKindController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartKindController],
    }).compile();

    controller = module.get<ChartKindController>(ChartKindController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
