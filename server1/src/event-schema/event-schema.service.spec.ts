import { Test, TestingModule } from '@nestjs/testing';
import { EventSchemaService } from './event-schema.service';

describe('EventSchemaService', () => {
  let service: EventSchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventSchemaService],
    }).compile();

    service = module.get<EventSchemaService>(EventSchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
