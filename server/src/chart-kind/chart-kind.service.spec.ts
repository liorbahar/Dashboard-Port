import { Test, TestingModule } from '@nestjs/testing';
import { ChartKindService } from './chart-kind.service';

describe('ChartKindService', () => {
  let service: ChartKindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChartKindService],
    }).compile();

    service = module.get<ChartKindService>(ChartKindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
